import { Action } from "../../types";

// TODO: remove global variables
let setCategories = null;
export async function reducer(action: Action) {
  switch (action.type) {
    case "GET_CATEGORIES":
      setCategories = action.payload.setCategories;
      console.log(
        "action.payload.setCategories:",
        action.payload.setCategories
      );
      delete action.payload.setCategories;
      window.vscode.postMessage(action);
      return;
    case "SEND_CATEGORIES":
      console.log("{action.payload}", action, setCategories);
      setCategories && setCategories(action.payload);
      return;
  }
}
