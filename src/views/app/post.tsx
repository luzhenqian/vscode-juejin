import * as React from "react";
import * as ReactDOM from "react-dom";
import { createDispatch } from "../../flux";
// import { reducer } from "../reducers/post";
import { Webview } from "vscode";
import { Category } from "../../types";
import { reducer } from "../reducers/post";
import "./index.css";

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
}>({
  categories: [],
  setCategories: () => {},
});

function Categories() {
  const { categories, setCategories } = React.useContext(PostContext);
  React.useEffect(() => {
    dispatch({ type: "GET_CATEGORIES", payload: { setCategories } });
  }, []);
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
  return (
    <PostContext.Provider
      value={{
        categories,
        setCategories,
      }}
    >
      <Categories />
    </PostContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
