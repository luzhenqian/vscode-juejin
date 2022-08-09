import { Action } from "../../types";

// TODO: remove global variables
let setCategories = null;
let setPostList = null;
export async function reducer(action: Action) {
  switch (action.type) {
    case "GET_CATEGORIES":
      setCategories = action.payload.setCategories;
      delete action.payload.setCategories;
      window.vscode.postMessage(action);
      return;
    case "SEND_CATEGORIES":
      setCategories && setCategories(action.payload);
      return;
    case "GET_POST_LIST":
      setPostList = action.payload.setPostList;
      delete action.payload.setPostList;
      window.vscode.postMessage(action);
      return;
    case "SEND_POST_LIST":
      setPostList && setPostList(action.payload);
      return;
  }
}
