(function (global) {
  const utils = {
    isElement(target) {
      return (
        typeof target === "object" &&
        typeof target.nodeName === "string" &&
        target instanceof HTMLElement
      );
    },
  };

  let styleEl = document.createElement("style");
  styleEl.textContent = ``;

  class Loading {
    constructor() {
      this.loadingWarpEl = window.document.createElement("div");
      this.loadingWarpEl.style.backgroundColor =
        "var(--vscode-editor-background)";
      this.loadingWarpEl.style.position = "fixed";
      this.loadingWarpEl.style.top = "0";
      this.loadingWarpEl.style.left = "0";
      this.loadingWarpEl.style.bottom = "0";
      this.loadingWarpEl.style.right = "0";
      this.loadingWarpEl.style.zIndex = "10000";
      this.loadingWarpEl.style.display = "flex";
      this.loadingWarpEl.id = "__CP_LOADING__";
      let loadingEl = window.document.createElement("div");
      loadingEl.style.animation = "rotate 1.8s linear infinite";
      loadingEl.innerHTML =
        '<svg t="1586931554977" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1510" width="100" height="100"><path d="M755.0464 862.72a34.7648 34.7648 0 0 1-12.8512 48.0256 34.6624 34.6624 0 0 1-47.7696-12.8512 34.7648 34.7648 0 0 1 12.288-48.0256 35.4816 35.4816 0 0 1 48.3328 12.8z m-207.3088 74.9056c0 19.1488-15.8208 35.1744-35.6864 35.1744a35.2768 35.2768 0 0 1-35.1744-35.1744v-24.6272a35.4816 35.4816 0 0 1 70.8608 0v24.6272z m-216.9856-39.7312a35.072 35.072 0 0 1-48.3328 13.0048 34.8672 34.8672 0 0 1-13.0048-48.2816l26.112-45.7728a36.1472 36.1472 0 0 1 48.7936-13.056 35.328 35.328 0 0 1 12.5952 48.3328l-26.1632 45.7728zM162.304 755.712a35.5328 35.5328 0 0 1-48.3328-13.056 35.1744 35.1744 0 0 1 12.5952-48.2816l70.3488-40.7552a35.584 35.584 0 0 1 48.2816 13.0048 35.84 35.84 0 0 1-13.056 48.3328l-69.888 40.7552zM87.3984 547.84a35.1232 35.1232 0 0 1-35.1744-35.1744c0-19.6096 15.5648-35.4304 35.1744-35.4304h109.568c19.5584 0 35.1232 15.872 35.1232 35.1744a35.1744 35.1744 0 0 1-35.1744 35.4304h-109.568z m39.2192-217.3952a34.4576 34.4576 0 0 1-12.5952-48.0256 35.0208 35.0208 0 0 1 48.2816-13.0048l119.0912 69.12a35.2256 35.2256 0 0 1 13.056 47.7696 35.4816 35.4816 0 0 1-48.2304 13.056L126.6688 330.4448z m142.7456-168.3456l82.944 143.9744a35.2256 35.2256 0 1 0 61.0816-35.4304L330.0352 126.976a35.1232 35.1232 0 0 0-60.7232 35.1744z m207.5648-74.3936a35.84 35.84 0 0 1 35.1744-35.4304c19.6096 0 35.6864 15.9232 35.6864 35.4304v165.888a35.84 35.84 0 0 1-35.6864 35.6864 35.328 35.328 0 0 1-35.1744-35.7376V87.7056z m217.0368 39.2192a35.4304 35.4304 0 0 1 48.2816-13.056 34.816 34.816 0 0 1 13.056 48.3328L672.2048 306.176a35.4304 35.4304 0 0 1-48.2816 13.056 35.9424 35.9424 0 0 1-12.8512-48.5888l82.944-143.7184z m168.8576 142.4896l-144.128 83.0976a35.4816 35.4816 0 0 0-13.056 48.2816 36.2496 36.2496 0 0 0 48.2816 12.8512l144.2816-83.0976a34.9184 34.9184 0 0 0 12.5952-48.0256 34.6624 34.6624 0 0 0-47.9744-13.1072z m74.1376 207.872c19.7632 0 35.4304 15.7696 35.1744 35.3792a34.9184 34.9184 0 0 1-35.1744 35.1744h-166.0416a35.5328 35.5328 0 0 1-35.2256-35.4304c0-19.3536 16.0768-35.1744 35.2256-35.1744h166.0416z" fill="#F27573" p-id="1511"></path></svg>';
      loadingEl.style.margin = "auto";
      loadingEl.style.textAlign = "center";
      this.loadingWarpEl.append(loadingEl);
      this.load = false;
    }
    show() {
      if (!this.load) {
        styleEl.textContent += `
          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `;
        this.load = true;
      }
      if (!window.document.body.querySelector("#__CP_LOADING__")) {
        window.document.body.append(this.loadingWarpEl);
      } else {
        this.loadingWarpEl.style.display = "flex";
      }
    }
    hide() {
      setTimeout(() => {
        if (window.document.body.querySelector("#__CP_LOADING__")) {
          this.loadingWarpEl.style.display = "none";
        }
      }, 400);
    }
  }

  class GoTop {
    constructor() {
      this.goTopEl = document.createElement("a");
      this.goTopEl.setAttribute("id", "__GO_TOP__");
      this.goTopEl.setAttribute("role", "button");
      this.goTopEl.setAttribute("aria-label", "go top");
      this.goTopEl.setAttribute("href", "#");
      this.goTopEl.setAttribute("title", "#");
      this.iconEl = document.createElement("span");
      this.iconEl.classList.add("icon");
      this.goTopEl.appendChild(this.iconEl);
      this.load = this.load.bind(this);
    }
    load() {
      this.addStyle();
      document.body.append(this.goTopEl);
    }
    addStyle() {
      styleEl.textContent += `
        #__GO_TOP__ {
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
        #__GO_TOP__:hover {
          background-color: #007acc;
          box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
        }
        #__GO_TOP__ span.icon::before {
          content: "";
          display: block;
          background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxNiAxNiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTYgMTY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRkZGRkZGO30KCS5zdDF7ZmlsbDpub25lO30KPC9zdHlsZT4KPHRpdGxlPnVwY2hldnJvbjwvdGl0bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04LDUuMWwtNy4zLDcuM0wwLDExLjZsOC04bDgsOGwtMC43LDAuN0w4LDUuMXoiLz4KPHJlY3QgY2xhc3M9InN0MSIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2Ii8+Cjwvc3ZnPgo=");
          width: 16px;
          height: 16px;
        }`;
    }
  }

  class CachePage {
    constructor({ el, initialPageKey = "init" }) {
      if (!utils.isElement(el)) {
        throw Error("el 不是一个 DOM 对象");
      }
      this.el = el;
      let fragment = document.createDocumentFragment();
      let currentNodes = this.el.childNodes;
      for (let i = 0; i < currentNodes.length; i++) {
        fragment.append(currentNodes[i]);
      }
      this.pages = [{ pageKey: initialPageKey, fragment }];
      this.pageDN = this.pageDN.bind(this);
      this.pageUP = this.pageUP.bind(this);
      this.currentPage = undefined;
      Object.defineProperty(this, "currentPage", {
        get() {
          return this.pages[this.pages.length - 1];
        },
      });
    }
    // 下一页
    pageDN(pageKey, newChild) {
      let fragment = document.createDocumentFragment();
      let currentNodes = this.el.childNodes;
      for (let i = 0; i < currentNodes.length; i++) {
        fragment.append(currentNodes[i]);
      }
      this.pages.push({ pageKey, fragment });
      console.log(this.currentPage.fragment);
      if (utils.isElement(newChild)) {
        this.el.append(newChild);
      } else if (typeof newChild === "string") {
        this.el.innerHTML = newChild;
      }
    }
    // 上一页
    pageUP() {
      if (this.pages.length > 1) {
        this.pages.pop();
        let lastPage = this.currentPage;
        let { fragment } = lastPage;
        this.el.innerHTML = "";
        this.el.append(fragment);
      } else if (this.pages.length === 1) {
      }
    }
  }

  document.head.appendChild(styleEl);

  global["CP"] = {
    loading: new Loading(),
    goTop: new GoTop(),
    cachePage: ({ el, initialPageKey }) =>
      new CachePage({ el, initialPageKey }),
  };
})(window);
