import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createDispatch } from "../../../flux";
import { Webview } from "vscode";
import { Category, Post } from "../../../types";
import { reducer } from "../../reducers/post";
import "../index.css";
import { List } from "./list";

declare global {
  interface Window {
    acquireVsCodeApi(): Webview;
    vscode: any;
    config: any;
  }
}

window.vscode = window.acquireVsCodeApi();

export const dispatch = createDispatch(reducer);

window.addEventListener("message", ({ data: action }) => {
  dispatch(action);
});

export type IPostContext = {
  categories: Category[];
  setCategories: Function;
  darkMode: boolean;
  setDarkMode: Function;
  postList: Post[];
  setPostList: Function;
  reload: Function;
  currentPostID: string;
  setCurrentPostID: Function;
  postHTML: any;
  setPostHTML: Function;
  currentCategoryID: string;
  setCurrentCategoryID: Function;
  cursor: number;
  setCursor: Function;
  scrollTop: number;
  setScrollTop: Function;
  zenMode: boolean;
  setZenMode: Function;
} | null;

export const PostContext = React.createContext<IPostContext>(null);

function App() {
  const [categories, setCategories] = React.useState([]);
  const [darkMode, setDarkMode] = React.useState(true);
  const [postList, setPostList] = React.useState([]);
  const [currentPostID, setCurrentPostID] = React.useState(null);
  const [postHTML, setPostHTML] = React.useState(null);
  const [currentCategoryID, setCurrentCategoryID] = React.useState("");
  const [cursor, setCursor] = React.useState(0);
  const [scrollTop, setScrollTop] = React.useState(0);
  const [zenMode, setZenMode] = React.useState(false);
  React.useEffect(() => {
    dispatch({
      type: "GET_INITIAL",
      payload: {
        cateName: window.config.defaultCategory || "前端",
        setCategories,
        setPostList,
        setCurrentCategoryID,
      },
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
        currentPostID,
        setCurrentPostID,
        postHTML,
        setPostHTML,
        currentCategoryID,
        setCurrentCategoryID,
        cursor,
        setCursor,
        scrollTop,
        setScrollTop,
        zenMode,
        setZenMode,
      }}
    >
      <List />
    </PostContext.Provider>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);

function reload() {
  dispatch({ type: "RELOAD" });
}
