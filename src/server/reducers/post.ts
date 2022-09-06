import { Action, ActionType, Dispatch, Draw, Reducer } from "../../types";
import {
  getCategories,
  getPostList,
  getPost,
  searchPost,
} from "../requests/post";
import {
  categoriesMapping,
  postListMapping,
  postMapping,
  searchPostListMapping,
} from "../mapping/post";

const processing = new Map<
  ActionType,
  (action: Action, dispatch: Dispatch) => void
>();

processing.set("GET_POST_LIST", async (action: Action, dispatch: Dispatch) => {
  const { cursor, data } = await getPostList({
    sortType: action.payload.sortType,
    cursor: action.payload.cursor,
    cateId: action.payload.categoryID,
  });
  const dataMapped = postListMapping(data);
  action.payload.panel.webview.postMessage({
    type: "SEND_POST_LIST",
    payload: {
      cursor,
      data: dataMapped,
    },
  });
});
processing.set(
  "GET_POST_LIST_V2",
  async (action: Action, dispatch: Dispatch) => {
    const { cursor, data } = await getPostList({
      sortType: action.payload.sortType,
      cursor: action.payload.cursor,
      cateId: action.payload.categoryID,
    });
    const dataMapped = postListMapping(data);
    action.payload.panel.webview.postMessage({
      type: "GET_POST_LIST_V2",
      payload: {
        cursor,
        data: dataMapped,
      },
    });
  }
);

export const reducer: Reducer = async (action: Action, dispatch: Dispatch) => {
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
        (
          await getPostList({
            sortType: action.payload.sortType,
            cursor,
            cateId,
          })
        ).data
      );

      setTimeout(() => dispatch({ type: "CHECK_IN" }), 0);

      action.payload.panel.webview.postMessage({
        type: "SEND_INITIAL",
        payload: {
          categories,
          postList,
        },
      });

      return;
    case "SET_CURRENT_CATEGORY_ID":
      action.payload.panel.webview.postMessage({
        type: "SEND_POST_LIST",
        payload: postListMapping(
          (
            await getPostList({
              sortType: action.payload.sortType,
              cursor: action.payload.cursor,
              cateId: action.payload.categoryID,
            })
          ).data
        ),
      });
      return;
    case "SEARCH_POST":
      action.payload.panel.webview.postMessage({
        type: "SEARCH_POST",
        payload: searchPostListMapping(await searchPost(action.payload)),
      });
      return;
    default:
      if (processing.has(action.type)) {
        processing.get(action.type)!(action, dispatch);
      }
  }
};
