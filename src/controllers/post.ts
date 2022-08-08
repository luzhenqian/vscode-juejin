import { getPost, getCategories } from "../server/post";
import { Webview } from "vscode";
import { getPostList } from "../server/requests";

enum ActionsType {
  POST_INIT = "POST_INIT",
  POST_NEXT = "POST_NEXT",
  GET_POST = "GET_POST",
}

export async function postMain(
  {
    type,
    data,
  }: {
    type: ActionsType;
    data: any;
  },
  // sender: any
  webview: Webview
) {
  let resultData = { type, data: await postController[type](data) };
  // TODO: 如果传递 webview.postMessage 会报错
  webview.postMessage(resultData);
}

let postController = {
  async [ActionsType.POST_INIT](data: any) {
    console.log("data:", data);

    return {
      listData: await getPostList("INIT", data),
      categoryList: await getCategories(),
    };
  },
  async [ActionsType.POST_NEXT](data: any) {
    return {
      listData: await getPostList("NEXT", data),
      categoryList: await getCategories(),
    };
  },
  async [ActionsType.GET_POST](data: any) {
    return await getPost(data);
  },
};
