import * as React from "react";
import { IPostContext } from "../../post";
import { Button } from "./Button";
import { Item } from "./Item";
import { AddUserGroup } from "./AddUserGroup";
import { Categories } from "./Categories";

const styleEl = document.createElement("style");
styleEl.innerText = `img {display:none !important;}`;

export function Header({ context }: { context: React.Context<IPostContext> }) {
  const {
    darkMode,
    setDarkMode,
    reload,
    categories,
    currentPostID,
    setCurrentPostID,
    setPostHTML,
    scrollTop,
    zenMode,
    setZenMode,
  } = React.useContext(context);

  React.useEffect(() => {
    if (zenMode) {
      document.head.appendChild(styleEl);
    } else {
      if (document.head.contains(styleEl)) {
        document.head.removeChild(styleEl);
      }
    }
  }, [zenMode]);
  return (
    <header className="h-14 gap2 flex items-center justify-between border-b border-gray-200 p-3 text-gray-500 dark:border-gray-800 dark:bg-gray-900 fixed z-10 top-0 left-[20px] right-[20px] bg-white">
      {currentPostID ? (
        <Button>
          <Item
            onClick={() => {
              setCurrentPostID(null);
              setPostHTML("");
              console.log("get y: ", scrollTop);

              setTimeout(() => {
                window.scrollBy({
                  top: scrollTop,
                  left: 0,
                });
              }, 0);
            }}
          >
            关闭
          </Item>
        </Button>
      ) : (
        <span />
      )}

      <div className="relative flex items-center">
        <Button>
          <Item onClick={() => reload()}>刷新</Item>
          <AddUserGroup />
          <Categories
            hide={() => {
              setCurrentPostID("");
              setPostHTML("");
            }}
            categories={categories}
          />
          <Item>
            <a href="https://github.com/luzhenqian/vscode-juejin">源码</a>
          </Item>
          {/* <Item>收藏</Item> */}
          {/* <Item>阅读设置</Item> */}
          {/* <Item>屏蔽</Item> */}
          {/* <Item>分享</Item> */}
        </Button>

        <div className="hidden w-px h-6 mx-6 bg-gray-200 dark:bg-gray-700 sm:block lg:mx-4"></div>

        <Button>
          <Item
            onClick={() => {
              setZenMode(!zenMode);
            }}
          >
            禅模式
          </Item>
          <Item onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "浅色模式" : "暗色模式"}
          </Item>
        </Button>
      </div>
    </header>
  );
}
