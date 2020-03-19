export default `<!DOCTYPE html>
<html lang="cn-ZH">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>掘金-沸点</title>
    <style>
      body {
        background-color: var(--vscode-editor-background);
        color: var(--vscode-dropdown-foreground);
      }
      .top-warp {
        position: fixed;
        top: 0;
        min-height: 20px;
        width: 100%;
        z-index: 1;
        background-color: var(--vscode-editor-background);
      }
      .top {
        height: 15vh;
        position: relative;
        background-color: var(--vscode-editor-background);
        box-sizing: border-box;
        padding: 20px;
      }
      .actions {
        position: absolute;
        bottom: 20px;
      }
      .contentWarp {
        position: absolute;
        top: 15vh;
        margin: 20px;
      }
      .avatar-large {
        width: 3.75rem;
        height: 3.75rem;
        border-radius: 50%;
      }
      .item {
        margin-bottom: 40px;
      }
      .userInfo {
        display: flex;
        margin-bottom: 8px;
      }
      .userInfoText {
        display: flex;
        flex-direction: column;
        font-size: 12px;
        color: #8a9aa9;
        justify-content: space-evenly;
        margin-left: 20px;
      }
      label {
        color: var(--vscode-dropdown-foreground) !important;
      }
      .picture {
        max-width: 50%;
        margin-top: 5px;
      }
      .refresh-button {
        background-color: var(--vscode-activityBarBadge-background);
        outline: none;
        border: none;
        padding: 4px 10px;
        border-radius: 50px;
        display: inline-block;
      }
      .checkbox {
        display: inline-block;
      }
      .closed::before {
        content: "+";
      }
      .open::before {
        content: "- ";
      }
      .comment {
        margin: 10px 0;
      }
      .comment-warp {
        margin-top: 4px;
        background-color: var(--vscode-badge-background);
        padding: 5px 10px;
        border-radius: 2px;
      }
      .comment-label {
        cursor: pointer;
      }
      .comment-avatar {
        height: 40px;
        width: 40px;
        border-radius: 8px;
      }
      .comment-user {
        margin-left: 10px;
      }
      .comment-user > .userInfoText {
        margin-left: 0;
      }
      .comments {
        margin-left: 1rem;
        margin-top: 1rem;
      }
      .topic {
        border-radius: 8px;
        display: inline-block;
        padding: 2px 8px;
        border: var(--vscode-activityBarBadge-background) 1px solid;
      }
    </style>
  </head>
  <body>
    <div class="top-warp">
      <div class="top">
        <div id="head-text" onclick="debug()"></div>
        <div class="actions">
          <button onclick="renderPrevPins()"><</button>
          <button onclick="getPinsNext()">></button>
          <button class="refresh-button" onclick="refresh()">
            刷新
          </button>
          <div class="checkbox">
            <input
              type="checkbox"
              id="showImage"
              checked
              onchange="showImage(this)"
            />
            <label>显示图片</label>
          </div>
          <div class="checkbox">
            <input
              type="checkbox"
              name="minimalist"
              onchange="minimalistHandle(this)"
            />
            <label>极简模式</label>
          </div>
          <!-- 暂时无法通过此方式修改配置文件 -->
          <!-- <div>
            <span>自定义评论区背景色：</span
            ><input onchange="commentColorHandle(this)" type="color" />
          </div> -->
        </div>
      </div>
    </div>
    <div class="contentWarp" id="pins"></div>

    <script>
      let pinsEl = null;
      let _isShowImage = true;
      let _minimalistStatus = false;
      let commentEl;
      let pageCache = [];
      let pageNumber = 0;
      let vscode = acquireVsCodeApi();
      init({ el: "#pins" });

      // 初始化
      function init(options) {
        const { el } = options;
        pinsEl = document.querySelector(el);
        pinsEl.innerHTML = "加载数据中...请稍后";
        initListenMessage();
        getMetaData();
        getPins();
        // 监听 图片显示隐藏和极简模式
        listenImage();
        listenMinimalist();
      }

      // 初始化信息
      function initMetaData(metaData) {
        const { headText, commentBackgroundColor } = metaData;
        if (commentBackgroundColor) {
          let overrideStyleEl = document.createElement("style");
          overrideStyleEl.textContent = \`.comment-warp{
            background-color: \${commentBackgroundColor};
          }\`;
          document.body.append(overrideStyleEl);
        }
        const headTextEl = document.getElementById("head-text");
        headTextEl.textContent = headText;
      }

      // vscode 发送 消息
      function info(text, options) {
        vscode.postMessage({
          type: "INFO",
          text
        });
      }

      // 刷新
      function refresh() {
        getPins();
        getMetaData();
      }

      // 获取沸点
      function getPins() {
        pageCache = [];
        pageNumber = 0;
        vscode.postMessage({ type: "GET_PINS" });
      }

      // 获取配置信息
      function getMetaData() {
        vscode.postMessage({ type: "GET_META_DATA" });
      }

      // 背景色颜色选取
      function commentColorHandle(target) {
        setCommentBackgroundColor(target.value);
      }

      // 改变背景色
      function setCommentBackgroundColor(value) {
        vscode.postMessage({ type: "SET_COMMENT_BACKGROUND_COLOR", value });
      }

      // 获取沸点 下一页
      function getPinsNext() {
        vscode.postMessage({ type: "GET_PINS_NEXT" });
      }

      // 获取评论
      function getComment(target) {
        const status = target.dataset.status;
        if (status === "open") {
          target.dataset.status = "closed";
          target.classList.remove("open");
          target.classList.add("closed");
          commentEl.innerHTML = "";
        } else if (status === "closed") {
          commentEl = target.nextElementSibling;
          target.dataset.status = "open";
          target.classList.remove("closed");
          target.classList.add("open");
          vscode.postMessage({ type: "GET_COMMENT", id: target.id });
        }
      }

      // 初始化 message 监听
      function initListenMessage() {
        window.addEventListener("message", event => {
          const message = event.data;
          switch (message.type) {
            case "GET_META_DATA":
              initMetaData(message.data);
              break;
            case "GET_PINS":
              renderPins(message.data);
              break;
            case "GET_PINS_NEXT":
              renderNextPins(message.data);
            case "GET_COMMENT":
              renderComments(message.data);
              break;
          }
          imageZoomInAndOut();
        });
      }

      // 渲染下一页的沸点
      function renderNextPins(pins) {
        if (pageNumber > 4) {
          info("消息太过久远，已经埋没在历史的长河中了。");
        } else {
          if (pageCache.length > pageNumber) {
            pinsEl.innerHTML = pageCache[pageNumber + 1];
          } else if (pageCache.length === pageNumber) {
            pageCache.push(pinsEl.innerHTML);
            renderPins(pins);
          } else {
            return;
          }
          // FIXME: 无效
          document.body.scrollTop = 0;
          pageNumber++;
        }
      }

      // 渲染上一页的沸点
      function renderPrevPins(pins) {
        if (pageNumber === 0) {
          info("已经是第1页，您可以尝试刷新。");
        } else {
          let prevHtml = pageCache[pageNumber - 1];
          pageCache.push(pinsEl.innerHTML);
          pageNumber--;
          pinsEl.innerHTML = prevHtml;
        }
      }

      // 渲染沸点
      function renderPins(pins) {
        try {
          pinsEl.innerHTML = "<div class='items'>";
          pins.forEach(pin => {
            let {
              id,
              avatarLarge,
              username,
              company,
              jobTitle,
              content,
              createdAt,
              likeCount,
              commentCount,
              pictures,
              title
            } = pin;
            let jobInfo = "";
            if (jobTitle && company) {
              jobInfo = \`\${jobTitle} @ \${company}\`;
            } else {
              if (jobTitle) jobInfo = jobTitle;
              if (company) jobInfo = company;
            }
            jobInfo += jobInfo ? \` · \${createdAt}\` : \` \${createdAt}\`;
            // 处理内容换行
            content = content.replace(/[\\r\\n]/g, "<br>");
            pinsEl.innerHTML += \`
            <div class='item'>
              <div class='userInfo'>
                <img class="avatar-large" src="\${avatarLarge}">
                <div class="userInfoText">
                  <a class="username">\${username}</a>
                  <span>\${jobInfo}</span>
                </div>
              </div>
              <div class="content">
                <div class="description">
                  <p>\${content}</p>
                </div>
                \${pictures
                  .map(picture => \`<img class="picture" src="\${picture}"/>\`)
                  .join(" ")}
              </div>
              \${title ? \`<div class="topic">\${title}</div>\` : ""}
              \${
                commentCount > 0
                  ? \`
              <div class="comment-warp">
                <span class="comment-label closed" id="\${id}" onclick="getComment(this)" data-status="closed">评论 \${commentCount}条</span>
                <div class="comment-content"></div>
              </div>\`
                  : ""
              }
            </div>\`;
          });
          pinsEl.innerHTML += \`</div>\`;
          isShowImage = _isShowImage;
          minimalistStatus = _minimalistStatus;
        } catch (e) {
          console.log("error:", e);
          pinsEl.innerHTML = \`加载数据失败\`;
        }
      }

      // 渲染评论
      function renderComments(comments) {
        function renderTopComments(topComments) {
          if (!topComments) return "";
          if (Array.isArray(topComments)) {
            return topComments.map(comment => {
              let {
                username,
                avatarLarge,
                jobTitle,
                company,
                createdAt,
                content,
                respUserInfo
              } = comment;
              // 处理内容换行
              content = content.replace(/[\\r\\n]/g, "<br>");
              let jobInfo = "";
              if (jobTitle && company) {
                jobInfo = \`\${jobTitle} @ \${company}\`;
              } else {
                if (jobTitle) jobInfo = jobTitle;
                if (company) jobInfo = company;
              }
              jobInfo += jobInfo ? \` · \${createdAt}\` : \` \${createdAt}\`;
              if (respUserInfo && respUserInfo.username) {
                content = \`回复 <a class="username">\${respUserInfo.username}</a>: \${content}\`;
              }
              return \`
                <div class="comments">
                  <div class="userInfo">
                    <img class="comment-avatar" src="\${avatarLarge}">
                    <div class="comment-user">
                      <a class="username">\${username}</a>
                      <div class="userInfoText">\${jobInfo}</div>
                    </div>
                  </div>
                  <div>\${content}</div>
                </div>\`;
            }).join(\`
            \`);
          }
        }
        function renderComment(comment) {
          if (!comment) return "";
          let {
            createdAt,
            avatarLarge,
            username,
            jobTitle,
            company,
            content,
            topComment
          } = comment;
          // 处理内容换行
          content = content.replace(/[\\r\\n]/g, "<br>");
          let jobInfo = "";
          if (jobTitle && company) {
            jobInfo = \`\${jobTitle} @ \${company}\`;
          } else {
            if (jobTitle) jobInfo = jobTitle;
            if (company) jobInfo = company;
          }
          jobInfo += jobInfo ? \` · \${createdAt}\` : \` \${createdAt}\`;
          return \`
          <div class="comment">
            <div class="userInfo">
              <img class="comment-avatar" src="\${avatarLarge}">
              <div class="comment-user">
                <a class="username">\${username}</a>
                <div class="userInfoText">\${jobInfo}</div>
              </div>
            </div>
            <div>\${content}</div>
            \${renderTopComments(topComment)}
          </div>
          \`;
        }
        if (!commentEl) return;
        commentEl.innerHTML += \`
        <div class="comments">
          \${comments.map(comment => renderComment(comment)).join("")}
        </div>
        \`;
      }

      // 放大缩小图片
      function imageZoomInAndOut() {
        document.querySelectorAll(".picture").forEach(pictureEl => {
          pictureEl.style.cursor = "zoom-in";
          function zoomIn() {
            pictureEl.style["max-width"] = "100%";
            pictureEl.style["width"] = "100%";
            pictureEl.style["cursor"] = "zoom-out";
            pictureEl.onclick = zoomOut;
          }
          function zoomOut() {
            pictureEl.style["max-width"] = "50%";
            pictureEl.style["cursor"] = "zoom-in";
            pictureEl.onclick = zoomIn;
          }
          pictureEl.onclick = zoomIn;
        });
      }

      // 监听图片显示隐藏
      function listenImage() {
        Object.defineProperty(window, "isShowImage", {
          set: show => {
            onShowImage(show);
            _isShowImage = show;
          }
        });
      }

      // 手动触发图片显示/隐藏
      function onShowImage(show) {
        if (show) {
          document.querySelectorAll(".picture").forEach(picture => {
            picture.style["display"] = "inline-block";
          });
        } else {
          document.querySelectorAll(".picture").forEach(picture => {
            picture.style["display"] = "none";
          });
        }
      }

      // 显示/隐藏图片
      function showImage(target) {
        let show = target.checked;
        isShowImage = show;
      }

      // 手动触发隐藏所有图片
      function hideAndShowAllImage(status) {
        if (status) {
          document.body.querySelectorAll("img").forEach(img => {
            img.style.display = "none";
          });
          document.body.querySelectorAll(".userInfoText").forEach(img => {
            img.style["margin-left"] = "0px";
          });
        } else {
          document.body.querySelectorAll("img").forEach(img => {
            img.style.display = "inline-block";
          });
          document.body.querySelectorAll(".userInfoText").forEach(img => {
            img.style["margin-left"] = "20px";
          });
        }
      }

      // 监听图片显示隐藏
      function listenMinimalist() {
        Object.defineProperty(window, "minimalistStatus", {
          set: status => {
            hideAndShowAllImage(status);
            _minimalistStatus = status;
            let showImage = document.getElementById("showImage");
            showImage.checked = !status;
          }
        });
      }

      // 开启/关闭极简模式
      function minimalistHandle(target) {
        let status = target.checked;
        minimalistStatus = status;
      }

      // 测试用
      function debug() {
        console.log(pageNumber, pageCache);
      }
    </script>
  </body>
</html>
`;
