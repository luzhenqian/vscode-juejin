import * as vscode from "vscode";
import * as path from "path";
import { PageName } from "../types";
import { viewConfig } from "./viewconfig";
import { createDispatch, combineReducers } from "../flux";
import { reducer as postReducer } from "../server/reducers/post";
import { reducer as growthReducer } from "../server/reducers/growth";
import { Source } from "./source";

function getConfiguration() {
  let defaultCategory =
    vscode.workspace.getConfiguration().get("juejin.post.default-category") ||
    ""; // 增加未配置分类时设置前端为默认分类
  return { defaultCategory };
}

export default class ViewLoader {
  private readonly _panel: vscode.WebviewPanel | undefined;
  private readonly _extensionPath: string;

  constructor(extensionPath: string, pageName: PageName) {
    this._extensionPath = extensionPath;

    this._panel = vscode.window.createWebviewPanel(
      viewConfig[pageName].title,
      viewConfig[pageName].title,
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode.Uri.file(path.join(extensionPath, "views")),
          vscode.Uri.file(path.join(extensionPath, "assets")),
        ],
      }
    );

    this._panel.iconPath = vscode.Uri.file(
      path.resolve(extensionPath, "./icon/icon.png")
    );

    const config = getConfiguration();
    this._panel.webview.html = this.getWebviewContent(pageName, {
      ...config,
      path: vscode.Uri.file(path.join(this._extensionPath)),
    });

    const dispatch = createDispatch(
      combineReducers(postReducer, growthReducer)
    );
    const panel = this._panel;

    this._panel.webview.onDidReceiveMessage((message) => {
      dispatch({
        type: message.type,
        payload: {
          panel,
          reload: () => {
            panel.webview.html = "";
            panel.webview.html = this.getWebviewContent(pageName, config);
          },
          ...message.payload,
        },
      });

      // TODO: open url in browser
      // vscode.env.openExternal(vscode.Uri.parse("https://www.stackoverflow.com/"));
    });
  }

  private getWebviewContent(pageName: PageName, config: any): string {
    const source = new Source(this._extensionPath);
    // Local path to main script run in the webview
    const reactAppPathOnDisk = vscode.Uri.file(
      path.join(this._extensionPath, "views", `${pageName}.js`)
    );
    const reactAppUri = reactAppPathOnDisk.with({ scheme: "vscode-resource" });
    // const tailwindCSS = vscode.Uri.file(
    //   path.join(this._extensionPath, "assets/theme", `tailwind.css`)
    // ).with({ scheme: "vscode-resource" });
    // FIXME: load font failed
    const albbphFontWoff2Uri = vscode.Uri.file(
      path.join(
        this._extensionPath,
        "assets/fonts",
        `1kmN4KTZntIkHlzBckQA9.woff2`
      )
    ).with({ scheme: "vscode-resource" });

    const albbphFontWoffUri = vscode.Uri.file(
      path.join(
        this._extensionPath,
        "assets/fonts",
        `1kmN4KTZntIkHlzBckQA9.woff`
      )
    ).with({ scheme: "vscode-resource" });

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>掘金</title>
        <script>
          window.acquireVsCodeApi = acquireVsCodeApi;
          window.config = ${JSON.stringify({
            ...config,
            themes: source.themes,
            codeThemes: source.codeThemes,
            images: source.images,
          })};
        </script>
    </head>
    <body>
        <div id="root"></div>
        <script src="${reactAppUri}"></script>
    </body>
    </html>`;
  }
}

// <style>
// @font-face {
// font-family: "albbph2.0";
// font-weight: 250;src: url(${albbphFontWoff2Uri}) format("woff2"),
// url(${albbphFontWoffUri}) format("woff");
// font-display: swap;
// </style>

// <meta http-equiv="Content-Security-Policy"
// content="default-src 'none';
//          img-src https:;
//          script-src 'unsafe-eval' 'unsafe-inline' vscode-resource:;
//          style-src vscode-resource: 'unsafe-inline';
//          font-src ">
