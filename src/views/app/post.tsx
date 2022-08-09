import * as React from "react";
import * as ReactDOM from "react-dom";
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
}>({
  categories: [],
  setCategories: () => {},
  darkMode: false,
  setDarkMode: () => {},
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

function App() {
  const [categories, setCategories] = React.useState([]);
  const [darkMode, setDarkMode] = React.useState(false);
  React.useEffect(() => {
    dispatch({ type: "GET_CATEGORIES", payload: { setCategories } });
  }, []);
  console.log('darkMode', darkMode);
  return (
    <PostContext.Provider
      value={{
        categories,
        setCategories,
        darkMode,
        setDarkMode,
      }}
    >
      <div
        className={`${
          darkMode && " dark "
        } flex h-screen flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white`}
      >
        <Header context={PostContext} />
        <div className="flex-1 bg-white dark:bg-slate-800"></div>
      </div>
    </PostContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
