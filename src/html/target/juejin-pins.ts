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
        user-select: none;
      }
      .actions > span {
        cursor: pointer;
        margin: 0 4px;
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
          <span onclick="renderPrevPins()" title="上一页">
            <svg
              t="1584670933631"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4126"
              width="20"
              height="20"
            >
              <path
                d="M538.288 198.624l-11.312-11.312a16 16 0 0 0-22.64 0L187.312 504.336a16 16 0 0 0 0 22.64L504.336 844a16 16 0 0 0 22.64 0l11.312-11.312a16 16 0 0 0 0-22.624l-294.4-294.4 294.4-294.4a16 16 0 0 0 0-22.64z"
                p-id="4127"
                fill="#F27573"
              ></path>
            </svg>
          </span>
          <span onclick="getPinsNext()" title="下一页">
            <svg
              t="1584670962233"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4263"
              width="20"
              height="20"
            >
              <path
                d="M340.688 830.24l11.312 11.328a16 16 0 0 0 22.624 0L685.76 530.448a16 16 0 0 0 0-22.64L374.624 196.688a16 16 0 0 0-22.624 0l-11.312 11.312a16 16 0 0 0 0 22.624l288.496 288.496-288.496 288.512a16 16 0 0 0 0 22.624z"
                p-id="4264"
                fill="#F27573"
              ></path>
            </svg>
          </span>
          <span onclick="refresh()" title="刷新">
            <svg
              t="1584670874792"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3989"
              width="22"
              height="22"
            >
              <path
                d="M258.56 681.36l-12.704 44.288a16 16 0 0 1-7.616 9.584l-24.752 13.712a14.464 14.464 0 0 1-20.928-16.64l38.128-132.96a11.136 11.136 0 0 1 13.76-7.632l132.976 38.128a14.464 14.464 0 0 1 3.04 26.56l-24.768 13.712a16 16 0 0 1-12.16 1.392l-42.016-12.048a264.112 264.112 0 0 0 468.112-41.76 14.288 14.288 0 0 1 3.296-4.912 263.424 263.424 0 0 0 16.768-92.784c0-90.496-45.536-170.368-114.96-217.92a264.112 264.112 0 0 0-393.808 118.8 14.336 14.336 0 0 1-17.968 8.16l-20.256-7.024a12.352 12.352 0 0 1-7.456-16.192A312.112 312.112 0 0 1 525.696 208c66.112 0 128.256 20.752 179.44 56.736a313.12 313.12 0 0 1 108.656 135.312 311.04 311.04 0 0 1 23.904 119.952c0 172.32-139.68 312-312 312v-0.208h-0.832c-110.96 0-210.768-59.296-266.304-150.432z"
                p-id="3990"
                fill="#F27573"
              ></path>
            </svg>
          </span>
          <span id="showImage" onclick="showImageHandle(this)" title="显示图片">
            <svg
              t="1584672422013"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4235"
              width="24"
              height="24"
            >
              <path
                d="M611.232 467.904a35.92 35.92 0 0 1-35.36 29.376 35.888 35.888 0 0 1-35.936-35.84 35.888 35.888 0 0 1 35.904-35.84 105.824 105.824 0 0 0-60.96-19.2c-58.608 0-106.048 47.312-106.048 105.6s47.44 105.6 106.032 105.6 106.032-47.312 106.032-105.6c0-15.744-3.456-30.672-9.664-44.096zM516.64 720c83.456 0 157.856-35.328 217.856-94.864 43.648-43.312 74.784-98.144 74.784-113.136 0-15.504-30.432-70.16-73.536-113.28C676.288 339.264 601.728 304 516.64 304c-84.576 0-158.944 35.968-218.88 96.64C255.136 443.808 224 499.168 224 512c0 12.32 31.856 67.872 75.008 111.2C359.488 683.984 433.696 720 516.64 720z m0 48C299.744 768 176 557.536 176 512s120.064-256 340.64-256c220.592 0 340.64 204.768 340.64 256s-123.744 256-340.64 256z m-1.76-102.4c-85.088 0-154.048-68.768-154.048-153.6s68.96-153.6 154.032-153.6c85.072 0 154.032 68.768 154.032 153.6s-68.96 153.6-154.032 153.6z"
                p-id="4236"
                fill="#F27573"
              ></path>
            </svg>
          </span>
          <span onclick="minimalistHandle(this)" title="极简模式">
            <svg
              t="1584672444016"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4372"
              width="24"
              height="24"
            >
              <path
                d="M800 520C800 365.36 674.64 240 520 240S240 365.36 240 520 365.36 800 520 800 800 674.64 800 520z m48 0C848 701.152 701.152 848 520 848S192 701.152 192 520 338.848 192 520 192 848 338.848 848 520z m-198.928 132.768l9.696 10.112a16 16 0 0 1-2.848 24.512c-36.624 26.112-81.408 40.608-128.528 40.608-46.144 0-90.064-13.92-126.288-39.04a116.464 116.464 0 0 1-1.664-1.184 16 16 0 0 1-2.288-23.968l9.6-10.16a16 16 0 0 1 21.04-1.968l2.56 1.824a171.952 171.952 0 0 0 97.04 29.536 171.872 171.872 0 0 0 100.64-32.08 16 16 0 0 1 21.04 1.808z"
                p-id="4373"
                fill="#F27573"
              ></path>
            </svg>
          </span>
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
        window.addEventListener("message", (event) => {
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
        setAppStatus();
      }

      // 渲染上一页的沸点
      function renderPrevPins(pins) {
        if (pageNumber === 0) {
          info("已经是第1页，您可以尝试刷新。");
        } else {
          let prevHtml = pageCache[pageNumber - 1];
          pageCache.pop();
          pageNumber--;
          pinsEl.innerHTML = prevHtml;
        }
        setAppStatus();
      }

      // 重新设置状态
      function setAppStatus() {
        isShowImage = _isShowImage;
        minimalistStatus = _minimalistStatus;
      }

      // 渲染沸点
      function renderPins(pins) {
        try {
          pinsEl.innerHTML = "<div class='items'>";
          pins.forEach((pin) => {
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
                  .map((picture) => \`<img class="picture" src="\${picture}"/>\`)
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
          setAppStatus();
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
            return topComments.map((comment) => {
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
          \${comments.map((comment) => renderComment(comment)).join("")}
        </div>
        \`;
        setAppStatus();
      }

      // 放大缩小图片
      function imageZoomInAndOut() {
        document.querySelectorAll(".picture").forEach((pictureEl) => {
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
          set: (show) => {
            onShowImage(show);
            _isShowImage = show;
            showImageReact();
          },
          get: () => _isShowImage
        });
      }

      // 手动触发图片显示/隐藏
      function onShowImage(show) {
        if (show) {
          document.querySelectorAll(".picture").forEach((picture) => {
            picture.style["display"] = "inline-block";
          });
        } else {
          document.querySelectorAll(".picture").forEach((picture) => {
            picture.style["display"] = "none";
          });
        }
      }

      // 隐藏所有图片
      function hideAndShowAllImage(status) {
        if (status) {
          document.body.querySelectorAll("img").forEach((img) => {
            img.style.display = "none";
          });
          document.body.querySelectorAll(".userInfoText").forEach((img) => {
            img.style["margin-left"] = "0px";
          });
          document.body.querySelectorAll(".comment-user").forEach((img) => {
            img.style["margin-left"] = "0px";
          });
        } else {
          document.body.querySelectorAll("img").forEach((img) => {
            img.style.display = "inline-block";
          });
          document.body.querySelectorAll(".userInfoText").forEach((img) => {
            img.style["margin-left"] = "20px";
          });
          document.body.querySelectorAll(".comment-user").forEach((img) => {
            img.style["margin-left"] = "10px";
          });
        }
      }

      // 监听极简模式
      function listenMinimalist() {
        Object.defineProperty(window, "minimalistStatus", {
          set: (status) => {
            hideAndShowAllImage(status);
            isShowImage = !status;
            _minimalistStatus = status;
            // let showImage = document.getElementById("showImage");
            // showImage.checked = !status;
          },
          get: () => _minimalistStatus
        });
      }

      // 测试用
      function debug() {
        // console.log(pageNumber, pageCache);
        console.log(_isShowImage);
      }

      // 开启/关闭 显示图片
      function showImageHandle(target) {
        showImageReact(target);
        isShowImage = !_isShowImage;
      }

      // 响应 显示图片 图标
      function showImageReact(target) {
        if (!target) {
          target = document.getElementById("showImage");
        }
        console.log(isShowImage);

        if (isShowImage) {
          target.innerHTML = \`
            <svg
              t="1584672422013"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4235"
              width="24"
              height="24"
            >
              <path
                d="M611.232 467.904a35.92 35.92 0 0 1-35.36 29.376 35.888 35.888 0 0 1-35.936-35.84 35.888 35.888 0 0 1 35.904-35.84 105.824 105.824 0 0 0-60.96-19.2c-58.608 0-106.048 47.312-106.048 105.6s47.44 105.6 106.032 105.6 106.032-47.312 106.032-105.6c0-15.744-3.456-30.672-9.664-44.096zM516.64 720c83.456 0 157.856-35.328 217.856-94.864 43.648-43.312 74.784-98.144 74.784-113.136 0-15.504-30.432-70.16-73.536-113.28C676.288 339.264 601.728 304 516.64 304c-84.576 0-158.944 35.968-218.88 96.64C255.136 443.808 224 499.168 224 512c0 12.32 31.856 67.872 75.008 111.2C359.488 683.984 433.696 720 516.64 720z m0 48C299.744 768 176 557.536 176 512s120.064-256 340.64-256c220.592 0 340.64 204.768 340.64 256s-123.744 256-340.64 256z m-1.76-102.4c-85.088 0-154.048-68.768-154.048-153.6s68.96-153.6 154.032-153.6c85.072 0 154.032 68.768 154.032 153.6s-68.96 153.6-154.032 153.6z"
                p-id="4236"
                fill="#F27573"
              ></path>
            </svg>\`;
        } else {
          target.innerHTML = \`
          <svg t="1584672885192" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="4509"
            width="24"
            height="24"
            fill="#F27573">
            <path d="M497.632 609.504h16a16 16 0 0 1 16 16v48a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-48a16 16 0 0 1 16-16zM237.264 339.008l15.856-2.432a16 16 0 0 1 18.08 12.544l0.832 3.744c25.168 106.816 121.168 184.64 233.6 184.64 113.072 0 209.504-78.72 234-186.432l0.512-2.352a16 16 0 0 1 18.08-12.544l15.84 2.4a16 16 0 0 1 13.28 19.088 148.32 148.32 0 0 1-0.288 1.328c-28.4 130.736-144.768 226.512-281.44 226.512-136.192 0-252.256-95.136-281.12-225.264L224 358.08a16 16 0 0 1 13.248-19.072z m105.44 224.704l13.856 8a16 16 0 0 1 5.856 21.856l-24 41.568a16 16 0 0 1-21.856 5.856l-13.856-8a16 16 0 0 1-5.856-21.856l24-41.568a16 16 0 0 1 21.856-5.856z m-111.28-117.12l8 13.84a16 16 0 0 1-5.856 21.856L192 506.288a16 16 0 0 1-21.856-5.856l-8-13.856a16 16 0 0 1 5.856-21.856l41.568-24a16 16 0 0 1 21.856 5.856z m540.4 13.84l8-13.856a16 16 0 0 1 21.856-5.856l41.568 24a16 16 0 0 1 5.856 21.856l-8 13.856a16 16 0 0 1-21.856 5.856l-41.568-24a16 16 0 0 1-5.856-21.856z m-117.12 111.28l13.856-8a16 16 0 0 1 21.856 5.856l24 41.568a16 16 0 0 1-5.856 21.856l-13.856 8a16 16 0 0 1-21.856-5.856l-24-41.568a16 16 0 0 1 5.856-21.856z" p-id="4510"></path>
          </svg>\`;
        }
      }

      // 开启/关闭 极简模式
      function minimalistHandle(target) {
        minimalistStatus = !_minimalistStatus;
        if (minimalistStatus) {
          target.innerHTML = \`
            <svg t="1584673355924" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="4783"
              width="24"
              height="24"
              fill="#F27573">
              <path d="M384 520a104 104 0 1 0-208 0 104 104 0 0 0 208 0z m48 0a152 152 0 1 1-304 0 152 152 0 0 1 304 0z m432 0a104 104 0 1 0-208 0 104 104 0 0 0 208 0z m48 0a152 152 0 1 1-304 0 152 152 0 0 1 304 0z m-428.864-16h73.728c6.16 0 11.136 4.976 11.136 11.136v25.728a11.136 11.136 0 0 1-11.136 11.136h-73.728a11.136 11.136 0 0 1-11.136-11.136v-25.728c0-6.16 4.976-11.136 11.136-11.136z" p-id="4784"></path>
            </svg>\`;
        } else {
          target.innerHTML = \`
            <svg
              t="1584672444016"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4372"
              width="24"
              height="24"
            >
              <path
                d="M800 520C800 365.36 674.64 240 520 240S240 365.36 240 520 365.36 800 520 800 800 674.64 800 520z m48 0C848 701.152 701.152 848 520 848S192 701.152 192 520 338.848 192 520 192 848 338.848 848 520z m-198.928 132.768l9.696 10.112a16 16 0 0 1-2.848 24.512c-36.624 26.112-81.408 40.608-128.528 40.608-46.144 0-90.064-13.92-126.288-39.04a116.464 116.464 0 0 1-1.664-1.184 16 16 0 0 1-2.288-23.968l9.6-10.16a16 16 0 0 1 21.04-1.968l2.56 1.824a171.952 171.952 0 0 0 97.04 29.536 171.872 171.872 0 0 0 100.64-32.08 16 16 0 0 1 21.04 1.808z"
                p-id="4373"
                fill="#F27573"
              ></path>
            </svg>\`;
        }
      }
    </script>
  </body>
</html>
`;
