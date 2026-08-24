import * as vscode from "vscode";
import * as crypto from "crypto";

async function writeSecretToEnv(bytes: number, type: "hex" | "base64url" | "complex") {
  let jwtSecret = "";

  if (type === "hex") {
    jwtSecret = crypto.randomBytes(bytes).toString("hex");
  } else if (type === "base64url") {
    jwtSecret = crypto.randomBytes(bytes).toString("base64url");
  } else if (type === "complex") {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{};:,.<>?";
    jwtSecret = Array.from(crypto.randomFillSync(new Uint32Array(bytes)))
      .map((val) => chars[val % chars.length])
      .join("");
  }

  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    vscode.window.showErrorMessage("Please open a workspace folder first.");
    return;
  }

  const envUri = vscode.Uri.joinPath(workspaceFolders[0].uri, ".env");
  const keyName = "JWT_SECRET";
  const newLine = `${keyName}=${jwtSecret}`;

  try {
    const openEnv = vscode.workspace.textDocuments.find(
      (doc) => doc.uri.toString() === envUri.toString(),
    );
    if (openEnv && openEnv.isDirty) {
      await openEnv.save();
    }

    let envContent = "";
    try {
      const fileData = await vscode.workspace.fs.readFile(envUri);
      envContent = new TextDecoder().decode(fileData);
    } catch {}

    if (envContent) {
      const regex = new RegExp(`^${keyName}=.*$`, "m");
      if (regex.test(envContent)) {
        envContent = envContent.replace(regex, newLine);
      } else {
        envContent += envContent.endsWith("\n") ? newLine : `\n${newLine}`;
      }
    } else {
      envContent = newLine;
    }

    await vscode.workspace.fs.writeFile(
      envUri,
      new TextEncoder().encode(envContent),
    );

    const action = await vscode.window.showInformationMessage(
      `${keyName} updated successfully in .env file!`,
      "Open .env",
      "Copy to Clipboard",
    );

    if (action === "Open .env") {
      const doc = await vscode.workspace.openTextDocument(envUri);
      await vscode.window.showTextDocument(doc);
    } else if (action === "Copy to Clipboard") {
      await vscode.env.clipboard.writeText(jwtSecret);
      vscode.window.showInformationMessage(
        "JWT secret copied to clipboard!",
      );
    }
  } catch (err) {
    vscode.window.showErrorMessage(
      `Failed to update .env file: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}

export function activate(context: vscode.ExtensionContext) {
  let customDisposable = vscode.commands.registerCommand(
    "jwt-env.generateJwtSecret",
    async () => {
      const bitPick = await vscode.window.showQuickPick(
        [
          { label: "256-bit (Recommended)", bytes: 32 },
          { label: "384-bit", bytes: 48 },
          { label: "512-bit", bytes: 64 },
        ],
        { placeHolder: "Select key size" },
      );

      if (!bitPick) { return; };

      const charsetPick = await vscode.window.showQuickPick(
        [
          { label: "Alphanumeric (Hexadecimal)", type: "hex" },
          {
            label: "URL-Safe Special Characters (Base64URL)",
            type: "base64url",
          },
          {
            label: "Extended Special Characters (ASCII Symbols)",
            type: "complex",
          },
        ],
        { placeHolder: "Select encoding format" },
      );

      if (!charsetPick) { return; };

      await writeSecretToEnv(bitPick.bytes, charsetPick.type as "hex" | "base64url" | "complex");
    }
  );

  let quickDisposable = vscode.commands.registerCommand(
    "jwt-env.generateQuickJwtSecret",
    async () => {
      await writeSecretToEnv(32, "hex");
    }
  );

  context.subscriptions.push(customDisposable, quickDisposable);
}

export function deactivate() {}