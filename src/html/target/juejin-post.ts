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
        display: flex;
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
      #scroll-to-top {
        position: fixed;
        width: 40px;
        height: 40px;
        right: 25px;
        bottom: 25px;
        background-color: #444444;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
        outline: none;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
      #scroll-to-top:hover {
        background-color: #007acc;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
      }
      #scroll-to-top span.icon::before {
        content: "";
        display: block;
        background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxNiAxNiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTYgMTY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRkZGRkZGO30KCS5zdDF7ZmlsbDpub25lO30KPC9zdHlsZT4KPHRpdGxlPnVwY2hldnJvbjwvdGl0bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04LDUuMWwtNy4zLDcuM0wwLDExLjZsOC04bDgsOGwtMC43LDAuN0w4LDUuMXoiLz4KPHJlY3QgY2xhc3M9InN0MSIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2Ii8+Cjwvc3ZnPgo=");
        width: 16px;
        height: 16px;
      }
    </style>
  </head>
  <body>
    <a
      id="scroll-to-top"
      role="button"
      aria-label="scroll to top"
      href="#"
      title="#"
      ><span class="icon"></span
    ></a>
    <div class="actions">
      <button onclick="goBack()">返回文章列表页</button>
      <button onclick="changeReadMode()">切换阅读模式</button>
    </div>
    <div id="app">文章加载中</div>
    <script>
      let vscode = acquireVsCodeApi();
      let rootEl = document.querySelector("#app");
      let postListPageCache = "";
      let _pageId; // 页面 ID ，分为 list 和 postId 两种，用于控制顶部操作区
      let _readMode; // 阅读模式
      let postTitle; // 打开文章后记录文章的id，用于返回时控制滚动条定位到该锚点
      let isFetching = false; // 是否正在获取文章列表

      init();

      // 渲染文章列表
      function renderPostList(postList) {
        rootEl.innerHTML += \`\${postList
          .map((post) => {
            let {
              id,
              title,
              originalUrl,
              time,
              user,
              tags,
              category,
              likeCount,
            } = post;
            let { username } = user;
            return \`<div class="post-list-warp" id="\${id}">
                <div class="post-title" onclick="toPost('\${originalUrl}', '\${id}')">\${title}</div>
                <div>
                  <span>\${username} · \${time} · \${tags
              .map((tag) => tag.title)
              .join("/")}</span>
                </div>
                </div>\`;
          })
          .join("")}\`;
        isFetching = false;
      }

      // 初始化 message 监听
      function initListenMessage() {
        window.addEventListener("message", (event) => {
          const message = event.data;
          switch (message.type) {
            case "POST_INIT":
            case "POST_NEXT":
              renderPostList(message.data);
              break;
            case "GET_POST":
              renderPost(message.data);
              break;
          }
        });
      }

      // 启用变量代理
      function r() {
        let lightReadModeStyleEl = document.createElement("style");
        lightReadModeStyleEl.textContent = \`
          article {
            background: #fff;
            color: #000;
          }
        \`;
        Object.defineProperties(window, {
          pageId: {
            get: () => _pageId,
            set: (val) => {
              if (val === "list") {
                document
                  .querySelector(".actions")
                  .querySelectorAll("button")
                  .forEach((button) => (button.style.display = "none"));
              } else {
                document
                  .querySelector(".actions")
                  .querySelectorAll("button")
                  .forEach((button) => (button.style.display = "inline-block"));
              }
              _pageId = val;
            },
          },
          readMode: {
            get: () => _readMode,
            set: (val) => {
              if (val === "light") {
                rootEl.append(lightReadModeStyleEl);
              } else if (val === "dark") {
                rootEl.removeChild(lightReadModeStyleEl);
              }
              _readMode = val;
            },
          },
        });
      }

      // 初始化
      function init() {
        r();
        initListenMessage();
        window.pageId = "list";
        rootEl.innerHTML = "";
        getPostList();
        scrollListener();
      }

      // 获取文章列表
      function getPostList(type = "POST_INIT") {
        isFetching = true;
        vscode.postMessage({ type });
      }

      // 获取文章信息
      function toPost(url, title) {
        postTitle = title;
        vscode.postMessage({ type: "GET_POST", data: url });
      }

      // 渲染文章
      function renderPost(data) {
        let { html, detailData } = data;
        _readMode = "dark";
        postListPageCache = rootEl.innerHTML;
        // 覆盖样式
        let overrideStyle = document.createElement("style");
        overrideStyle.textContent = \`
          .main-area[data-v-7407bc26] {
            background-color: var(--vscode-editor-background) !important;
          }
          article {
            margin-bottom: 0 !important;
          }
          h1, h2, h3, h4, h5, h6{
            color: var(--vscode-editor-foreground) !important;
          }\`;
        // 过滤掉无用的元素，只保留 meta、style、link、script和 id 为 juejin 的元素中的 article 元素
        let tempEl = document.createElement("div");
        tempEl.innerHTML = html;
        let meta = tempEl.querySelectorAll("meta");
        let style = tempEl.querySelectorAll("style");
        let script = tempEl.querySelectorAll("script");
        let link = tempEl.querySelectorAll("link");
        let juejinRootEl = tempEl.querySelector("#juejin");
        juejinRootEl = juejinRootEl.querySelector("article");
        window.overrideStyle = overrideStyle;

        // 从掘金接口获取到的 html 只有 data-src，而不是直接在 background-image 中设置src的。
        // 所以要在这里通过 js 添加图片。
        let nodeList = juejinRootEl.querySelectorAll("div, img");
        nodeList.forEach((node) => {
          let src = node.dataset.src;
          if (src) {
            if (node.tagName === "IMG") {
              node.src = src;
              node.style.visibility = "visible";
            } else {
              node.style.backgroundImage = \`url(\${src})\`;
            }
          }
        });
        // 获取到的 html 没有用户头像和昵称，需要自己填充
        let { avatarLarge, username } = detailData.user || {};
        let avatarEl = juejinRootEl.querySelector(".avatar");
        avatarEl.style.backgroundImage = \`url(\${avatarLarge})\`;
        avatarEl.style.backgroundColor = \`transparent\`;
        let usernamerEl = juejinRootEl.querySelector(".username");
        usernamerEl.textContent = username;

        rootEl.innerHTML = "";
        rootEl.append(
          ...meta,
          ...style,
          ...link,
          juejinRootEl,
          ...script,
          overrideStyle
        );
        goTop();
        window.pageId = "post";
      }

      // 回到顶部
      function goTop() {
        scrollTo("#");
      }

      // 控制滚动条到某一个位置，原生的 scrollTo 和 scrollBy 在 vscode 中不正常
      // 参照 vscode 扩展介绍页的 markdown goTop 按钮，使用 id 和 a 的跳转锚点方案。
      function scrollTo(elId) {
        let topEl = document.createElement("a");
        topEl.href = elId;
        topEl.click();
      }

      // 从文章页回到列表页
      function goBack() {
        pageId = "list";
        if (postListPageCache) {
          rootEl.innerHTML = postListPageCache;
          scrollTo(\`#\${postTitle}\`);
        } else {
          init();
        }
      }

      // 监听滚动条是否已经到达底部
      function scrollListener() {
        window.addEventListener("scroll", (x) => {
          if (pageId === "list") {
            let wScrollY = window.scrollY; // 滚动条位置
            let wInnerH = window.innerHeight; // 设备窗口的高度
            let bScrollH = document.body.scrollHeight; //  滚动条的总高度
            if (wScrollY + wInnerH >= bScrollH - 20 && !isFetching) {
              getPostList("POST_NEXT");
            }
          }
        });
      }

      // 切换阅读模式
      function changeReadMode() {
        if (readMode === "dark") {
          readMode = "light";
        } else if (readMode === "light") {
          readMode = "dark";
        }
      }
    </script>
  </body>
</html>
`;
