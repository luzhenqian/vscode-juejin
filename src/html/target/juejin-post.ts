export default `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>掘金-文章</title>
    <style>
      .actions {
        padding: 10px 20px;
        position: sticky;
        top: 0;
        z-index: 1000;
      }
      .post-list-warp {
        padding: 20px;
        border-bottom: 1px solid var(--vscode-breadcrumb-foreground);
        transition: all 0.5s ease-out;
      }
      .post-list-warp:hover {
        background: var(--vscode-activityBar-background);
      }
      .post-title {
        font-weight: 800;
        padding-bottom: 10px;
        color: var(--vscode-activityBar-activeBorder);
      }
      .post-title:hover {
        color: pink;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div class="actions">
      <button onclick="goBack()">返回文章列表页</button>
    </div>
    <div id="app"></div>
    <script>
      let vscode = acquireVsCodeApi();
      let rootEl = document.querySelector("#app");
      let postListPageCache = "";
      let _pageId;

      Object.defineProperty(window, "pageId", {
        get: () => _pageId,
        set: (val) => {
          if (val === "list") {
            document
              .querySelector(".actions")
              .querySelector("button").style.display = "none";
          } else {
            document
              .querySelector(".actions")
              .querySelector("button").style.display = "block";
          }
        },
      });

      // 渲染组件
      function renderPostList(postList) {
        rootEl.innerHTML = \`\${postList
          .map((post) => {
            let {
              title,
              originalUrl,
              time,
              user,
              tags,
              category,
              likeCount,
            } = post;
            let { username } = user;
            return \`<div class="post-list-warp">
                <div class="post-title" onclick="toPost('\${originalUrl}')">\${title}</div>
                <div>
                  <span>\${username} · \${time} · \${tags
              .map((tag) => tag.title)
              .join("/")}</span>
                </div>
                </div>\`;
          })
          .join("")}\`;
      }

      // 初始化 message 监听
      function initListenMessage() {
        window.addEventListener("message", (event) => {
          const message = event.data;
          switch (message.type) {
            case "POST_INIT":
              renderPostList(message.data);
              break;
            case "GET_POST":
              renderPost(message.data);
              break;
          }
        });
      }

      initListenMessage();
      init();

      function init() {
        pageId = "list";
        vscode.postMessage({ type: "POST_INIT" });
      }

      // 获取文章信息
      function toPost(url) {
        vscode.postMessage({ type: "GET_POST", data: url });
      }

      // 渲染文章
      function renderPost(data) {
        postListPageCache = rootEl.innerHTML;
        // 覆盖样式
        let overrideStyle = document.createElement("style");
        overrideStyle.textContent = \`
        <style>
          .main-area[data-v-7407bc26] {
            background-color: var(--vscode-editor-background) !important;
          }
          article {
            margin-bottom: 0 !important;
          }
          h1, h2, h3, h4, h5, h6{
            color: var(--vscode-editor-foreground) !important;
          }
        </style>\`;
        // 过滤掉无用的元素，只保留 meta、style、link、script和 id 为 juejin 的元素中的 article 元素
        let tempEl = document.createElement("div");
        tempEl.innerHTML = data;
        let meta = tempEl.querySelectorAll("meta");
        let style = tempEl.querySelectorAll("style");
        let script = tempEl.querySelectorAll("script");
        let link = tempEl.querySelectorAll("link");
        let juejinRootEl = tempEl.querySelector("#juejin");
        juejinRootEl = juejinRootEl.querySelector("article");
        rootEl.innerHTML = "";
        rootEl.append(
          ...meta,
          ...style,
          ...link,
          juejinRootEl,
          ...script,
          overrideStyle
        );
        pageId = "post";
      }

      function goBack() {
        pageId = "list";
        if (postListPageCache) {
          rootEl.innerHTML = postListPageCache;
        } else {
          init();
        }
      }
    </script>
  </body>
</html>
`;
