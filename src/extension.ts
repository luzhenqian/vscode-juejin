import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { getPins, getComments, GET_PINS_TYPE } from "./getData";
import html from "./html/target/juejin-pins";

enum ENV {
  "DEV" = "DEV",
  "PROD" = "PROD"
}
let env = ENV.PROD;

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("juejin.pins", () => {
    // TODO: 在下方消息栏设置按钮
    // var statusBar = vscode.window.createStatusBarItem(
    //   vscode.StatusBarAlignment.Left
    // );
    // statusBar.text = "touch fish";
    // statusBar.show();

    // 获取配置信息
    function getMetaData() {
      let headText = vscode.workspace
        .getConfiguration()
        .get("juejin.pins.head.text", "别看了，我在写代码。");
      let commentBackgroundColor = vscode.workspace
        .getConfiguration()
        .get(
          "juejin.pins.comment.background-color",
          "var(--vscode-badge-background)"
        );
      return { headText, commentBackgroundColor };
    }

    // 获取本地资源的方式，开发时使用
    function getHtmlContent() {
      vscode.window.showInformationMessage("Development environment.");
      let templatePath = path.join(
        context.extensionPath,
        "./src/html/src/juejin-pins.html"
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
      return htmlStr;
    }

    // 设置背景色
    function setCommentBackgroundColor(color: string) {
      // TODO: 没有找到修改配置的 API
      // vscode.workspace
    }

    // 创建webview
    function createWebview() {
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
        panel.webview.html = getHtmlContent();
      } else if (env === ENV.PROD) {
        panel.webview.html = html;
      }
      panel.webview.onDidReceiveMessage(
        async (message) => {
          switch (message.type) {
            case "GET_META_DATA":
              panel.webview.postMessage({
                data: getMetaData(),
                type: "GET_META_DATA"
              });
              break;
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
            case "SET_COMMENT_BACKGROUND_COLOR":
              setCommentBackgroundColor(message.value);
              break;
            case "INFO":
              vscode.window.showInformationMessage(message.text);
              break;
          }
        },
        undefined,
        context.subscriptions
      );
    }

    createWebview();
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
