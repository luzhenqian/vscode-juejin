import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { getPins, getComments, GET_PINS_TYPE } from "./getData";
import html from "./html";

enum ENV {
  "DEV" = "DEV",
  "PROD" = "PROD"
}
let env = ENV.PROD;

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("juejin.pins", () => {
    const panel = vscode.window.createWebviewPanel(
      "juejin-pins",
      "掘金-沸点",
      vscode.ViewColumn.Two,
      {
        enableScripts: true,
        retainContextWhenHidden: true
      }
    );

    if (env === ENV.DEV) {
      vscode.window.showInformationMessage("current env is dev");
      let templatePath = path.join(
        context.extensionPath,
        "./src/juejin-pins.html"
      );
      let htmlStr = fs.readFileSync(templatePath, "utf-8");
      const dirPath = path.dirname(templatePath);
      htmlStr = htmlStr.replace(
        // /(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g,
        // 本地库放在 dist 目录下，用于和在线导入区分
        /(<link.+?href="\.\/dist|<script.+?src="\.\/dist|<img.+?src="\.\/dist)(.+?)"/g,
        (m, $1, $2) => {
          $1 = $1.replace("./dist", "");
          $2 = "./dist" + $2;
          return (
            $1 +
            vscode.Uri.file(path.resolve(dirPath, $2))
              .with({ scheme: "vscode-resource" })
              .toString() +
            '"'
          );
        }
      );
      panel.webview.html = htmlStr;
    } else if (env === ENV.PROD) {
      panel.webview.html = html;
    }

    panel.webview.onDidReceiveMessage(
      async (message) => {
        switch (message.type) {
          case "GET_PINS":
            panel.webview.postMessage({
              data: await getPins(GET_PINS_TYPE.INIT),
              type: "GET_PINS"
            });
            break;
          case "GET_PINS_NEXT":
            panel.webview.postMessage({
              data: await getPins(GET_PINS_TYPE.NEXT),
              type: "GET_PINS_NEXT"
            });
            break;
          case "GET_COMMENT":
            panel.webview.postMessage({
              data: await getComments(message.id),
              type: "GET_COMMENT"
            });
            break;
          case "INFO":
            vscode.window.showInformationMessage(message.text);
            break;
        }
      },
      undefined,
      context.subscriptions
    );
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
