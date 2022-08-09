import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createDispatch } from "../../flux";
import { Webview } from "vscode";
import { Category, Post } from "../../types";
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
  postList: Post[];
  setPostList: Function;
  reload: Function;
} | null>(null);

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

function Article({ info, author, tags }: Post) {
  return (
    <article className="flex justify-between items-center border-b mt-2 pb-2 gap-2">
      <div className="flex flex-col flex-1">
        <div className="mb-1 flex items-center gap-2 text-sm">
          <a>
            <img className="h-8 w-8" src={author.avatar} />
          </a>
          <span className="">{author.name}</span>
          <span className="font-light text-gray-600 dark:text-gray-500">
            {info.createdAt}
          </span>
        </div>

        <div className="mb-2 flex flex-col">
          <div className="mb-2 text-xl font-bold cursor-pointer">
            {info.title}
          </div>
          <div className="font-light cursor-pointer line-clamp-2">
            {info.briefContent}
          </div>
        </div>

        <div className="flex justify-between text-xs">
          <div className="flex items-center">
            <div className="flex gap-2 mr-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-lg bg-gray-200 px-1.5 py-0.5 cursor-pointer dark:bg-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <span>{info.viewCount}阅读</span>
              <span>{info.diggCount}点赞</span>
              <span>{info.commentCount}评论</span>
              <span>{info.collectCount}收藏</span>
              <span>{info.hotIndex}热度</span>
            </div>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="cursor-pointer">收藏</span>
            <span className="cursor-pointer">屏蔽</span>
          </div>
        </div>
      </div>

      {info.coverImage && (
        <img
          className="h-16 w-24 object-contain"
          src={info.coverImage}
          alt={info.title}
        />
      )}
    </article>
  );
}

function Articles() {
  const { postList } = React.useContext(PostContext);
  return (
    <main className="flex-1 bg-white px-10 py-2 dark:bg-slate-800">
      {postList.map((post) => (
        <Article key={post.id} {...post} />
      ))}
    </main>
  );
}

function App() {
  const [categories, setCategories] = React.useState([]);
  const [darkMode, setDarkMode] = React.useState(false);
  const [postList, setPostList] = React.useState([]);
  React.useEffect(() => {
    // TODO: one load all
    dispatch({ type: "GET_CATEGORIES", payload: { setCategories } });
    dispatch({
      type: "GET_POST_LIST",
      payload: { cursor: 0, cateID: "", setPostList },
    });
  }, []);

  return (
    <PostContext.Provider
      value={{
        categories,
        setCategories,
        darkMode,
        setDarkMode,
        postList,
        setPostList,
        reload,
      }}
    >
      <div className={`${darkMode && " dark "}`}>
        <div
          className={`flex max-h-screen h-screen flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white`}
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
  root.unmount()
  setTimeout(() => {
    root.render(<App />);
  },2000);
}
