import { Action } from "../../types";
import { getCategories } from "../requests/post";
import { categoriesMapping } from "../mapping/post";

export async function reducer(action: Action) {
  switch (action.type) {
    case "GET_CATEGORIES":
      action.payload.panel.webview.postMessage({
        type: "SEND_CATEGORIES",
        payload: categoriesMapping(await getCategories()),
      });
      return;
  }
}
