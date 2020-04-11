import * as Axios from "axios";
import { timeFromNow } from "../../utils/time";

let endCursor = "";

export enum GET_POST_LIST_TYPE {
  "INIT" = "INIT",
  "NEXT" = "NEXT",
}
export async function getPostList(type = GET_POST_LIST_TYPE.INIT) {
  let url = "https://web-api.juejin.im/query";
  let after = type === GET_POST_LIST_TYPE.INIT ?
    "" : type === GET_POST_LIST_TYPE.NEXT ?
      endCursor : "";
  let result = await Axios.default.post(
    url,
    {
      operationName: "",
      query: "",
      variables: { first: 20, after, order: "POPULAR", },
      extensions: { query: { id: "21207e9ddb1de777adeaca7a2fb38030" } },
    },
    { headers: { "X-Agent": "Juejin/Web" } }
  );
  try {
    const postList = result?.data?.data?.articleFeed?.items?.edges;
    endCursor = result?.data?.data?.articleFeed?.items?.pageInfo?.endCursor;
    const postListParser = postList.map((post: any) => {
      let {
        id,
        title,
        originalUrl,
        createdAt,
        user,
        tags,
        category,
        likeCount,
      } = post?.node;
      let time = timeFromNow(createdAt);
      return {
        id,
        title,
        originalUrl,
        user,
        tags,
        category,
        likeCount,
        time,
      };
    });
    console.log("postlist parser:", postListParser);
    return postListParser;
  } catch (e) {
    console.log("err:", e);
    return [];
  }
}

export async function getPost(url: string) {
  let result = await Axios.default.get(url);
  try {
    return result?.data;
  } catch (err) {
    return "文章加载出错：" + err.toString();
  }
}