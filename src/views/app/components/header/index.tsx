import * as React from "react";
import { IPostContext } from "../../post";
import { Button } from "./Button";
import { Item } from "./Item";
import { AddUserGroup } from "./AddUserGroup";
import { Categories } from "./Categories";
import { Sort } from "./Sort";
import { ChatMode } from "./ChatMode";
import { SearchButton } from "../Search/Button";

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
    chatMode,
    setChatMode,
    currentCategoryID,
    setCurrentCategoryID,
    currentSort,
    setCurrentSort,
    setPostList,
    setCursor,
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
    <header className="h-14 gap2 flex items-center justify-between border-b border-gray-200 p-3 text-gray-500 dark:border-gray-800 dark:bg-gray-900 fixed z-50 top-0 left-[20px] right-[20px] bg-white">
      {currentPostID ? (
        <Button>
          <Item
            onClick={() => {
              setCurrentPostID(null);
              setPostHTML("");

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
        {currentPostID ? null : <SearchButton className="mr-3" />}
        <Button>
          <Item onClick={() => reload()}>刷新</Item>
          <AddUserGroup />
          <Sort
            categoryID={currentCategoryID}
            hide={() => {
              setCurrentPostID("");
              setPostHTML("");
            }}
            sortType={currentSort}
            setCurrentSort={setCurrentSort}
            setPostList={setPostList}
            setCursor={setCursor}
          />
          <Categories
            hide={() => {
              setCurrentPostID("");
              setPostHTML("");
            }}
            sortType={currentSort}
            categoryID={currentCategoryID}
            categories={categories}
            setCurrentCategoryID={setCurrentCategoryID}
            setCursor={setCursor}
            setPostList={setPostList}
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
          <ChatMode
            darkMode={darkMode}
            chatMode={chatMode}
            setChatMode={setChatMode}
          />
          <Item
            onClick={() => {
              setZenMode(!zenMode);
            }}
            className={`
            ${zenMode ? "font-bold" : ""}
            ${zenMode ? (darkMode ? "text-gray-300" : "text-gray-800") : ""}
            `}
          >
            禅模式
          </Item>
          <Item
            onClick={() => setDarkMode(!darkMode)}
            className={`
            ${darkMode ? "text-gray-300" : "text-gray-800"}
            `}
          >
            {darkMode ? "浅色模式" : "暗色模式"}
          </Item>
        </Button>
      </div>
    </header>
  );
}
