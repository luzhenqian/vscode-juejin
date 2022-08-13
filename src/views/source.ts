import * as vscode from "vscode";
import * as path from "path";

export class Source {
  private _extensionPath: string;
  codeThemes: {};
  themes: {};
  constructor(extensionPath: string) {
    this._extensionPath = extensionPath;
    this.themes = {
      tailwind: this.getPath("assets/theme", `tailwind.css`),
    };
    this.codeThemes = {
      github: this.getPath("assets/code-theme", `github.css`),
      githubDarkDimmed: this.getPath(
        "assets/code-theme",
        `github-dark-dimmed.css`
      ),
    };
  }

  getPath(...absolutePath: string[]) {
    return vscode.Uri.file(path.join(this._extensionPath, ...absolutePath))
      .with({ scheme: "vscode-resource" })
      .toString();
  }
}
