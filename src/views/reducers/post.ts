import { Action } from "../../types";

// TODO: remove global variables
let setCategories = (_: any) => {};
let setPostList = (_: any) => {};
let setPostHTML = (_: any) => {};
let cateName = "";
let setCurrentCategoryID = (_: any) => {};

export async function reducer(action: Action) {
  switch (action.type) {
    case "GET_INITIAL":
      setCategories = action.payload.setCategories;
      setPostList = action.payload.setPostList;
      setCurrentCategoryID = action.payload.setCurrentCategoryID;
      delete action.payload.setCategories;
      delete action.payload.setPostList;
      delete action.payload.setCurrentCategoryID;
      cateName = action.payload.cateName;
      window.vscode.postMessage(action);
      return;
    case "SEND_INITIAL": {
      const { categories, postList } = action.payload;
      setCategories(categories);
      setPostList(postList);
      const currentCategoryID =
        categories.find((c) => c.name === cateName)?.id || "";
      setCurrentCategoryID(currentCategoryID);
      return;
    }
    case "SEND_CATEGORIES":
      setCategories && setCategories(action.payload);
      return;
    case "GET_POST_LIST":
      window.vscode.postMessage(action);
      return;
    case "GET_POST":
      setPostHTML = action.payload.setPostHTML;
      delete action.payload.setPostHTML;
      window.vscode.postMessage(action);
      return;
    case "SEND_POST":
      setPostHTML && setPostHTML(action.payload);
      return;
    case "SEND_POST_LIST":
      setPostList((oldList) => [...oldList, ...action.payload]);
      return;
    case "SET_CURRENT_CATEGORY_ID":
      setCurrentCategoryID(action.payload.categoryID);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setPostList([]);
      setPostHTML([]);
      window.vscode.postMessage({
        type: action.type,
        payload: {
          categoryID: action.payload.categoryID,
          cursor: 0,
        },
      });
      return;
    case "RELOAD":
      window.vscode.postMessage(action);
      return;
  }
}
