import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createDispatch } from "../../flux";
// import { reducer } from "../reducers/post";
import { Webview } from "vscode";
import { Category } from "../../types";
import { reducer } from "../reducers/post";
import "./index.css";
import { Header } from "./header";

declare global {
  interface Window {
    acquireVsCodeApi(): Webview;
    vscode: any;
  }
}

window.vscode = window.acquireVsCodeApi();

export const dispatch = createDispatch(reducer);

window.addEventListener("message", ({ data: action }) => {
  dispatch(action);
});

const PostContext = React.createContext<{
  categories: Category[];
  setCategories: Function;
  darkMode: boolean;
  setDarkMode: Function;
  reload: Function;
}>({
  categories: [],
  setCategories: () => {},
  darkMode: false,
  setDarkMode: () => {},
  reload: () => {},
});

function Categories() {
  const { categories } = React.useContext(PostContext);
  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>{category.name}</div>
      ))}
    </div>
  );
}

function Loading() {
  return <div>Loading...</div>;
}

function Article() {
  return (
    <article className="flex justify-between items-center border-b mt-2 pb-2 gap-2">
      <div className="flex flex-col flex-1">
        <div className="mb-1 flex items-center gap-2 text-sm">
          <a>
            <img
              className="h-8 w-8"
              src="https://miro.medium.com/fit/c/48/48/1*03sCDoeUWtfyReSN91LtAw.jpeg"
            />
          </a>
          <span className="">李小龙</span>
          <span className="font-light text-gray-600 dark:text-gray-500">
            2021年2月1日
          </span>
        </div>

        <div className="mb-1 flex flex-col">
          <div className="mb-2 text-xl font-bold cursor-pointer">
            我遇到了一个有钱的程序员，他给了我 3 条改变人生的建议
          </div>
          <div className="font-light cursor-pointer line-clamp-2">
            永远不要放弃你的工作——在你作为程序员的早期，你的脑海中会有一个一致的感觉，“篱笆另一边的草总是更绿”。永远不要放弃你的工作——在你作为程序员的早期，你的脑海中会有一个一致的感觉，“篱笆另一边的草总是更绿”。永远不要放弃你的工作——在你作为程序员的早期，你的脑海中会有一个一致的感觉，“篱笆另一边的草总是更绿”。永远不要放弃你的工作——在你作为程序员的早期，你的脑海中会有一个一致的感觉，“篱笆另一边的草总是更绿”。永远不要放弃你的工作——在你作为程序员的早期，你的脑海中会有一个一致的感觉，“篱笆另一边的草总是更绿”。永远不要放弃你的工作——在你作为程序员的早期，你的脑海中会有一个一致的感觉，“篱笆另一边的草总是更绿”。
          </div>
        </div>

        <div className="flex justify-between text-xs">
          <div className="flex items-center">
            <div className="flex gap-2 mr-3">
              <span className="inline-flex items-center rounded-lg bg-gray-200 px-1.5 py-0.5 cursor-pointer dark:bg-gray-600">
                前端
              </span>
              <span className="inline-flex items-center rounded-lg bg-gray-200 px-1.5 py-0.5 cursor-pointer dark:bg-gray-600">
                JavaScript
              </span>
            </div>

            <div className="flex gap-2">
              <span>10000人阅读</span>
              <span>200人点赞</span>
              <span>122人评论</span>
            </div>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="cursor-pointer">收藏</span>
            <span className="cursor-pointer">屏蔽</span>
          </div>
        </div>
      </div>

      <img
        className="h-16 w-24 object-contain"
        src="https://miro.medium.com/fit/c/224/224/0*5HWA6yLX2ljJjNq5"
      />
    </article>
  );
}

function Articles() {
  return (
    <main className="flex-1 bg-white px-10 py-2 dark:bg-slate-800">
      <Article />
    </main>
  );
}

function App() {
  const [categories, setCategories] = React.useState([]);
  const [darkMode, setDarkMode] = React.useState(false);
  React.useEffect(() => {
    dispatch({ type: "GET_CATEGORIES", payload: { setCategories } });
  }, []);

  return (
    <PostContext.Provider
      value={{
        categories,
        setCategories,
        darkMode,
        setDarkMode,
        reload,
      }}
    >
      <div className={`${darkMode && " dark "} `}>
        <div
          className={`flex h-screen flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white`}
        >
          <Header context={PostContext} />
          <Articles />
        </div>
      </div>
    </PostContext.Provider>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);

function reload() {
  root.unmount();
  root.render(<App />);
}
