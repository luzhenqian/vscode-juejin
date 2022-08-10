import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createDispatch } from "../../../flux";
import { Webview } from "vscode";
import { Category, Post } from "../../../types";
import { reducer } from "../../reducers/post";
import { MemoryRouter } from "react-router-dom";
import "../index.css";
import { Router } from "./router";

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

export const PostContext = React.createContext<{
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
} | null>(null);

function App() {
  const [categories, setCategories] = React.useState([]);
  const [darkMode, setDarkMode] = React.useState(true);
  const [postList, setPostList] = React.useState([]);
  const [currentPostID, setCurrentPostID] = React.useState(null);
  const [postHTML, setPostHTML] = React.useState(null);
  const [currentCategoryID, setCurrentCategoryID] = React.useState(
    window.config.defaultCategory
  );

  React.useEffect(() => {
    // TODO: one load all
    // dispatch({ type: "GET_CATEGORIES", payload: { setCategories } });
    dispatch({
      type: "GET_INITIAL",
      payload: {
        cateName: currentCategoryID,
        setCategories,
        setPostList,
        setCurrentCategoryID,
      },
    });
    // dispatch({
    //   type: "GET_POST_LIST",
    //   payload: { cursor: 0, cateID: "", setPostList },
    // });
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
      }}
    >
      <MemoryRouter initialEntries={["/"]}>
        <Router />
      </MemoryRouter>
    </PostContext.Provider>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);

function reload() {
  dispatch({ type: "RELOAD" });
}
