import { Action } from "../../types";
import { getCategories, getPostList } from "../requests/post";
import { categoriesMapping, postListMapping, postMapping } from "../mapping/post";
import { getPost } from "../post";

export async function reducer(action: Action) {
  switch (action.type) {
    case "GET_CATEGORIES":
      action.payload.panel.webview.postMessage({
        type: "SEND_CATEGORIES",
        payload: categoriesMapping(await getCategories()),
      });
      return;
    case "RELOAD":
      action.payload.reload();
      return;
    case "GET_POST":
      action.payload.panel.webview.postMessage({
        type: "SEND_POST",
        payload: postMapping(await getPost(action.payload.id)),
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
