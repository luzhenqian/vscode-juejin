import { Action } from "../../types";
import { getCategories, getPostList } from "../requests/post";
import { categoriesMapping, postListMapping } from "../mapping/post";

export async function reducer(action: Action) {
  switch (action.type) {
    case "GET_CATEGORIES":
      action.payload.panel.webview.postMessage({
        type: "SEND_CATEGORIES",
        payload: categoriesMapping(await getCategories()),
      });
      return;
    case "GET_POST_LIST":
      action.payload.panel.webview.postMessage({
        type: "SEND_POST_LIST",
        payload: postListMapping(
          await getPostList({
            cursor: action.payload.cursor,
            cateId: action.payload.cateId,
          })
        ),
      });
      return;
  }
}
