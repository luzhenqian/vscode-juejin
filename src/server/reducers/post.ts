import { Action } from "../../types";
import { getCategories, getPostList, getPost } from "../requests/post";
import {
  categoriesMapping,
  postListMapping,
  postMapping,
} from "../mapping/post";

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
    case "GET_INITIAL":
      const {
        payload: { cateName, cursor = 0 },
      } = action;
      const categories = categoriesMapping(await getCategories());
      const cateId = categories.find((c) => c.name === cateName)?.id || "";
      const postList = postListMapping(
        await getPostList({
          cursor,
          cateId,
        })
      );
      action.payload.panel.webview.postMessage({
        type: "SEND_INITIAL",
        payload: {
          categories,
          postList,
        },
      });
      return;
    case "GET_POST_LIST":
      const data = await getPostList({
        cursor: action.payload.cursor,
        cateId: action.payload.categoryID,
      });
      const dataMapped = postListMapping(data);
      action.payload.panel.webview.postMessage({
        type: "SEND_POST_LIST",
        payload: dataMapped,
      });
      return;
    case "SET_CURRENT_CATEGORY_ID":
      action.payload.panel.webview.postMessage({
        type: "SEND_POST_LIST",
        payload: postListMapping(
          await getPostList({
            cursor: action.payload.cursor,
            cateId: action.payload.categoryID,
          })
        ),
      });
      return;
  }
}
