# JWT Env Secret Generator

A lightweight Visual Studio Code extension designed to generate secure, cryptographically random JWT secrets directly into your `.env` file—either with customizable options or instantly via a keyboard shortcut.

---

## Features

- **Instant Quick Generation**: Instantly generate and insert a recommended 256-bit Hex secret using a simple keyboard shortcut (`Ctrl+Alt+J` / `Cmd+Alt+J`).
- **Multiple Security Standards**: Choose between 256-bit (recommended), 384-bit, or 512-bit key sizes.
- **Flexible Encoding Formats**:
  - **Alphanumeric (Hexadecimal)**: Clean and universally supported hex strings.
  - **URL-Safe (Base64URL)**: Standard Base64URL encoding suitable for Web APIs.
  - **Extended Special Characters**: Complex ASCII symbol mix generated with high entropy and unbiased character distribution.
- **Automated `.env` Management**:
  - Automatically creates a `.env` file if one does not exist in your root workspace.
  - Updates the existing `JWT_SECRET` key without overwriting other environment variables.
  - Automatically saves unsaved changes before writing to disk.
- **Quick Actions**: Instantly open the updated `.env` file or copy the generated secret directly to your clipboard.

---

## How to Use

### Option 1: Quick Shortcut (Recommended)
1. Open your project workspace in VS Code.
2. Press **`Ctrl+Alt+J`** (Windows/Linux) or **`Cmd+Alt+J`** (macOS).
3. The extension will automatically write or update `JWT_SECRET` in your `.env` file using a **256-bit Hex** secret!

---

### Option 2: Custom Setup (Interactive)
1. Open a workspace folder in VS Code.
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS) to open the Command Palette.
3. Type and run: **`JWTenv: Generate Jwt Secret in .env (Custom)`**
4. Select your preferred key size (256-bit, 384-bit, or 512-bit).
5. Select your preferred encoding format (Hex, Base64URL, or Complex ASCII).
6. Choose whether to open the `.env` file or copy the secret to your clipboard.

---

## Keybindings

| Command | Keybinding (Win/Linux) | Keybinding (macOS) | Description |
| :--- | :--- | :--- | :--- |
| **JWTenv: Quick** | `Ctrl + Alt + J` | `Cmd + Alt + J` | Generates a 256-bit Hex secret directly into `.env` |

---

## Extension Settings

This extension works out-of-the-box and does not require additional configuration settings.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.