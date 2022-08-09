import * as React from "react";
import { PostContext } from "../post";

function Item({ onClick = () => {}, children }) {
  return (
    <div
      className="hover:text-gray-800 dark:hover:text-gray-300 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function Button({ children }) {
  return (
    <div className="inline-flex gap-2 rounded-md p-2 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-800 dark:text-gray-400 dark:ring-0 dark:shadow-highlight/4">
      {children}
    </div>
  );
}

export function Header({ context }) {
  const { darkMode, setDarkMode, reload } = React.useContext(context);
  const { currentPostID, setCurrentPostID, setPostHTML } =
    React.useContext(PostContext);

  return (
    <header className="h-14 gap2 flex items-center justify-between border-b border-gray-200 p-3 text-gray-500 dark:border-gray-800 dark:bg-gray-900 fixed z-10 top-0 left-[20px] right-[20px] bg-white">
      {currentPostID ? (
        <Button>
          <Item
            onClick={() => {
              setCurrentPostID(null);
              setPostHTML("");
            }}
          >
            关闭
          </Item>
        </Button>
      ) : (
        <span />
      )}

      <div className="flex items-center">
        <Button>
          <Item onClick={reload}>刷新</Item>
          <Item>入群</Item>
          <Item>分类</Item>
          <Item>收藏</Item>
          <Item>阅读设置</Item>
          <Item>屏蔽</Item>
          <Item>分享</Item>
        </Button>

        <div className="mx-6 hidden h-6 w-px bg-gray-200 dark:bg-gray-700 sm:block lg:mx-4"></div>

        <Button>
          <Item>禅模式</Item>
          <Item onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "浅色模式" : "暗色模式"}
          </Item>
        </Button>
      </div>
    </header>
  );
}
