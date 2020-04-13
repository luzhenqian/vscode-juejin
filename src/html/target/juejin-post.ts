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
    <div id="top"></div>
    <div class="actions">
      <button onclick="goBack()">返回文章列表页</button>
    </div>
    <div id="app"></div>
    <script>
      let vscode = acquireVsCodeApi();
      let rootEl = document.querySelector("#app");
      let postListPageCache = "";
      let _pageId; // 页面 ID ，分为 list 和 postId 两种，用于控制顶部操作区
      let postTitle; // 打开文章后记录文章的id，用于返回时控制滚动条定位到该锚点
      var avatarLarge; // 作者头像，用于填充文章头像
      var username; // 作者昵称

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
            let { username, avatarLarge } = user;
            return \`<div class="post-list-warp" id="\${id}">
                <div class="post-title" onclick="toPost('\${originalUrl}', '\${id}', '\${avatarLarge}', '\${username}')">\${title}</div>
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
            _pageId = val;
          },
        });
      }

      // 初始化
      function init() {
        r();
        initListenMessage();
        window.pageId = "list";
        getPostList();
        scrollListener();
      }

      // 获取文章列表
      function getPostList(type = "POST_INIT") {
        vscode.postMessage({ type });
      }

      // 获取文章信息
      function toPost(url, title, avatarLarge, username) {
        window.avatarLarge = avatarLarge;
        window.username = username;
        postTitle = title;
        vscode.postMessage({ type: "GET_POST", data: url });
      }

      // 渲染文章
      function renderPost(data) {
        // TODO: 切换两种模式 原版阅读模式/vscode编辑器阅读模式
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

        // 从掘金接口获取到的 html 只有 data-src，而不是直接在 background-image 中设置src的。
        // 所以要在这里通过 js 添加图片。
        let nodeList = juejinRootEl.querySelectorAll("div, img");
        nodeList.forEach((node) => {
          let src = node.dataset.src;
          if (src) {
            console.log(node.tagName);
            if (node.tagName === "IMG") {
              node.src = src;
              node.style.visibility = "visible";
            } else {
              node.style.backgroundImage = \`url(\${src})\`;
            }
          }
        });
        let avatarEl = juejinRootEl.querySelector(".avatar");
        avatarEl.style.backgroundImage = \`url(\${window.avatarLarge})\`;
        avatarEl.style.backgroundColor = \`transparent\`;
        // 获取到的 html 没有用户头像和昵称，需要自己填充
        let usernamerEl = juejinRootEl.querySelector(".username");
        usernamerEl.textContent = window.username;

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
        scrollTo("#top");
      }

      // 控制滚动条到某一个位置，原生的 scrollTo 和 scrollBy 在 vscode 中不正常
      // 只能使用 id 和 a 的跳转锚点方案。
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
          console.log("pt:", postTitle);
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
            if (wScrollY + wInnerH >= bScrollH) {
              getPostList("POST_NEXT");
            }
          }
        });
      }
    </script>
  </body>
</html>
`;
