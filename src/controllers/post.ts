import { getPostList, getPost } from "../server/post";
import { Webview } from "vscode";

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
  async [ActionsType.POST_INIT]() {
    return await getPostList();
  },
  async [ActionsType.POST_NEXT](data: any) {
    return await getPostList(data);
  },
  async [ActionsType.GET_POST](data: any) {
    return await getPost(data);
  },
};
