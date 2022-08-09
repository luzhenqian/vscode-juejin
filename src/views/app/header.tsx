import * as React from "react";

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

export function Header({ context }) {
  const { darkMode, setDarkMode } = React.useContext(context);
  return (
    <header className="min-h-10 gap2 flex items-center justify-end border-b border-gray-200 p-3 text-gray-500 dark:border-gray-800 dark:bg-gray-900">
      <div className="dark:shadow-highlight/4 inline-flex gap-2 rounded-md p-2 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-800 dark:text-gray-400 dark:ring-0">
        <Item>刷新</Item>
        <Item>分类</Item>
        <Item>收藏</Item>
        <Item>阅读设置</Item>
        <Item>屏蔽</Item>
        <Item>分享</Item>
      </div>

      <div className="mx-6 hidden h-6 w-px bg-gray-200 dark:bg-gray-700 sm:block lg:mx-4"></div>

      <div className="inline-flex gap-2 rounded-md p-2 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-800 dark:ring-0">
        <Item>禅模式</Item>
        <Item>纯净模式</Item>
        <Item onClick={() => setDarkMode(!darkMode)}>主题</Item>
      </div>
    </header>
  );
}
