import * as vscode from "vscode";
import * as path from "path";

export class Source {
  private _extensionPath: string;
  codeThemes: {};
  themes: {};
  images: { cursor: string; };
  constructor(extensionPath: string) {
    this._extensionPath = extensionPath;
    this.themes = {
      tailwind: this.getPath("assets/theme/tailwind.css"),
      tailwindDark: this.getPath("assets/theme/tailwind-dark.css"),
    };
    this.codeThemes = {
      github: this.getPath("assets/code-theme", `github.css`),
      githubDarkDimmed: this.getPath(
        "assets/code-theme",
        `github-dark-dimmed.css`
      ),
    };
    this.images = {
      cursor: this.getPath("assets/images/cursor.svg"),
    };
  }

  getPath(...absolutePath: string[]) {
    return vscode.Uri.file(path.join(this._extensionPath, ...absolutePath))
      .with({ scheme: "vscode-resource" })
      .toString();
  }
}
