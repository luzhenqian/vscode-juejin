import * as vscode from "vscode";
import * as path from "path";
import ViewLoader from "./setup/ViewLoader";

export function activate(context: vscode.ExtensionContext) {
  let pins = vscode.commands.registerCommand("juejin.pins", () => {
    // 创建webview
    function createPinsWebview() {
      const panel = vscode.window.createWebviewPanel(
        "juejin-pins",
        "掘金-沸点",
        vscode.ViewColumn.Two,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
        }
      );
      panel.iconPath = vscode.Uri.file(
        path.resolve(context.extensionPath, "./icon/icon.png")
      );
      panel.webview.html = "<div>功能正在开发中</div>";
    }
    createPinsWebview();
  });

  let post = vscode.commands.registerCommand("juejin.post", () => {
    new ViewLoader(context.extensionPath, "post");
    context.subscriptions.splice(context.subscriptions.length, 0, post, pins);
  });
}

export function deactivate() {}
