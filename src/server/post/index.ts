import * as axios from "axios";
import { timeFromNow } from "../../utils/time";

let endCursor = "";

export enum GET_POST_LIST_TYPE {
  "INIT" = "INIT",
  "NEXT" = "NEXT",
}

// 获取文章列表
export async function getPostList(type = GET_POST_LIST_TYPE.INIT, variables: any = {}) {
  let url = "https://web-api.juejin.im/query";
  let after = type === GET_POST_LIST_TYPE.INIT ?
    "" : type === GET_POST_LIST_TYPE.NEXT ?
      endCursor : "";

  let result = await axios.default.post(
    url,
    {
      operationName: "",
      query: "",
      variables: { first: 20, after, order: "POPULAR", ...variables },
      extensions: { query: { id: "653b587c5c7c8a00ddf67fc66f989d42" } },
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

// 获取文章内容
// 因为掘金禁止了 iframe，只能通过接口获取
export async function getPost(url: string) {
  let temp = url.split('/');
  let postId = temp[temp.length - 1];
  let detailData = await getDetailData(postId);
  let result = await axios.default.get(url);
  try {
    return { html: result?.data, detailData };
  } catch (err) {
    return "文章加载出错：" + err.toString();
  }
}

//获取分类
export async function getCategories() {
  let result = await axios.default.get('https://gold-tag-ms.juejin.im/v1/categories', {
    headers: {
      'X-Juejin-Src': 'web'
    }
  });
  try {
    return result?.data?.d;
  } catch (err) {
    return "文章加载出错：" + err.toString();
  }
}

// 获取文章详细信息
export async function getDetailData(postId: string) {
  let result = await axios.default
    .get('https://post-storage-api-ms.juejin.im/v1/getDetailData', {
      params: {
        uid: '',
        device_id: 0,
        token: '',
        src: 'web',
        type: 'entry',
        postId
      }
    });
  let { d } = result?.data;
  let { user } = d;
  return { user };
}