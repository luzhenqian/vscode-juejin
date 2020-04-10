import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { getPins, getComments, GET_PINS_TYPE } from "./getData";
import pinsHtml from "./html/target/juejin-pins";
import postHtml from "./html/target/juejin-post";
import { getPost, getPostList } from "./server/post";

enum ENV {
  "DEV" = "DEV",
  "PROD" = "PROD",
}

let env = ENV.DEV;

export function activate(context: vscode.ExtensionContext) {
  let pins = vscode.commands.registerCommand("juejin.pins", () => {
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

    // 设置背景色
    function setCommentBackgroundColor(color: string) {
      // TODO: 没有找到修改配置的 API
      // vscode.workspace
    }

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
      if (env === ENV.DEV) {
        panel.webview.html = getHtmlContent(
          context,
          "./src/html/src/juejin-pins.html"
        );
      } else if (env === ENV.PROD) {
        panel.webview.html = pinsHtml;
      }
      panel.webview.onDidReceiveMessage(
        async (message) => {
          switch (message.type) {
            case "GET_META_DATA":
              panel.webview.postMessage({
                data: getMetaData(),
                type: "GET_META_DATA",
              });
              break;
            case "GET_PINS":
              panel.webview.postMessage({
                data: await getPins(GET_PINS_TYPE.INIT),
                type: "GET_PINS",
              });
              break;
            case "GET_PINS_NEXT":
              panel.webview.postMessage({
                data: await getPins(GET_PINS_TYPE.NEXT),
                type: "GET_PINS_NEXT",
              });
              break;
            case "GET_COMMENT":
              panel.webview.postMessage({
                data: await getComments(message.id),
                type: "GET_COMMENT",
              });
              break;
            case "SET_COMMENT_BACKGROUND_COLOR":
              setCommentBackgroundColor(message.value);
              break;
            case "INFO":
              vscode.window.showInformationMessage(message.text);
              break;
            case "SCROLL_TO_DOWN":
              // vscode.window.showErrorMessage('下来了。');
              // vscode.commands.executeCommand('editorScroll', { to: 'down', by: "page", revealCursor: true, });
              break;
          }
        },
        undefined,
        context.subscriptions
      );
    }
    createPinsWebview();
  });
  let post = vscode.commands.registerCommand("juejin.post", () => {
    // 创建webview
    function createPostWebview() {
      const panel = vscode.window.createWebviewPanel(
        "juejin-post",
        "掘金-文章",
        vscode.ViewColumn.Two,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
        }
      );
      panel.iconPath = vscode.Uri.file(
        path.resolve(context.extensionPath, "./icon/icon.png")
      );
      if (env === ENV.DEV) {
        panel.webview.html = getHtmlContent(
          context,
          "./src/html/src/juejin-post.html"
        );
      } else if (env === ENV.PROD) {
        panel.webview.html = postHtml;
      }
      panel.webview.onDidReceiveMessage(
        async (message) => {
          switch (message.type) {
            case "POST_INIT":
              panel.webview.postMessage({
                data: await getPostList(),
                type: "POST_INIT",
              });
              break;
            case "GET_POST":
              panel.webview.postMessage({
                data: await getPost(message.data),
                type: "GET_POST",
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
    }
    createPostWebview();
  });
  context.subscriptions.splice(context.subscriptions.length, 0, post, pins);
}

export function deactivate() { }

// 获取本地资源的方式，开发时使用
function getHtmlContent(context: vscode.ExtensionContext, paths: string) {
  vscode.window.showInformationMessage("Development environment.");
  let templatePath = path.join(context.extensionPath, paths);
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
