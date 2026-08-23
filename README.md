# JWT Env Secret Generator

A lightweight Visual Studio Code extension designed to generate secure, cryptographically random JWT secrets directly into your `.env` file with a single command.

---

## Features

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

1. Open a workspace folder in VS Code.
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS) to open the Command Palette.
3. Type and run: **`JWT Env: Generate Secret in .env`**
4. Select your preferred key size (256-bit, 384-bit, or 512-bit).
5. Select your preferred encoding format.
6. Choose whether to open the `.env` file or copy the secret to your clipboard.

---

## Extension Settings

This extension works out-of-the-box and does not require additional configuration settings.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
