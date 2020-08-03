import * as axios from "axios";
import { timeFromNow } from "../../utils/time";
import {
  getPostListCateURL,
  getPostCategoryURL,
  getPostContentURL,
} from "../urls/post";

let endCursor = "";

export enum GET_POST_LIST_TYPE {
  "INIT" = "INIT",
  "NEXT" = "NEXT",
}

// 获取文章列表
export async function getPostList(
  type: string = GET_POST_LIST_TYPE.INIT,
  variables: any = {}
) {
  let category;
  let { defaultCategory } = variables;
  if (type === GET_POST_LIST_TYPE.INIT && defaultCategory) {
    (await getCategories()).forEach(
      (_category: { category_name: string; category_id: string }) => {
        if (_category.category_name === defaultCategory) {
          category = _category.category_id;
        }
      }
    );
  } else {
    category = variables.category;
  }

  let cursor =
    type === GET_POST_LIST_TYPE.INIT
      ? "0"
      : type === GET_POST_LIST_TYPE.NEXT
      ? endCursor
      : "0";
  console.log("id:", category);

  let result = await axios.default.post(
    getPostListCateURL,
    {
      cursor,
      id_type: 2,
      limit: 20,
      sort_type: 200,
      cate_id: category,
    }
    // {
    //   operationName: "",
    //   query: "",
    //   variables: { first: 20, after, order: "POPULAR", ...variables },
    //   extensions: { query: { id: "653b587c5c7c8a00ddf67fc66f989d42" } },
    // },
    // { headers: { "X-Agent": "Juejin/Web" } }
  );
  try {
    let { data } = result.data;
    let postList = (data as [])
      .filter((post: any) => {
        if (
          post !== undefined &&
          post.article_id !== undefined &&
          post.article_info !== undefined
        )
          return true;
        return false;
      })
      .map(({ article_id, article_info, author_user_info, category, tags }) => {
        if (!article_info) return undefined;
        let { title, digg_count, ctime } = article_info;
        let { user_name } = author_user_info;
        return {
          id: article_id,
          title,
          originalUrl: article_id,
          user: { username: user_name },
          tags,
          category,
          likeCount: digg_count,
          time: timeFromNow(ctime + "000"),
        };
      });
    console.log("postlist parser:", postList);
    return { category, postList };
    // const postList = result?.data?.data?.articleFeed?.items?.edges;
    // endCursor = result?.data?.data?.articleFeed?.items?.pageInfo?.endCursor;
    // const postListParser = postList.map((post: any) => {
    //   let {
    //     id,
    //     title,
    //     originalUrl,
    //     createdAt,
    //     user,
    //     tags,
    //     category,
    //     likeCount,
    //   } = post?.node;
    //   let time = timeFromNow(createdAt);
    //   return {
    //     id,
    //     title,
    //     originalUrl,
    //     user,
    //     tags,
    //     category,
    //     likeCount,
    //     time,
    //   };
    // });
    // console.log("postlist parser:", postListParser);
    // return { category, postList: postListParser };
  } catch (e) {
    console.log("err:", e);
    return [];
  }
}

// 获取文章内容
// 因为掘金禁止了 iframe，只能通过接口获取
export async function getPost(url: string) {
  // let temp = url.split("/");
  // let postId = temp[temp.length - 1];
  // let detailData = await getDetailData(postId);
  let result = await axios.default.get(getPostContentURL + url);
  try {
    return { html: result?.data, detailData: {} };
  } catch (err) {
    return "文章加载出错：" + err.toString();
  }
}

//获取分类
export async function getCategories() {
  let result = await axios.default.get(getPostCategoryURL);
  try {
    (result?.data?.data as []).forEach((d: any) => {
      let { category_name, category_id } = d;
      d.name = category_name;
      d.id = category_id;
    });
    return result?.data?.data;
  } catch (err) {
    return "分类加载出错：" + err.toString();
  }
}

// 获取文章详细信息
export async function getDetailData(postId: string) {
  let result = await axios.default.get(
    "https://post-storage-api-ms.juejin.im/v1/getDetailData",
    {
      params: {
        uid: "",
        device_id: 0,
        token: "",
        src: "web",
        type: "entry",
        postId,
      },
    }
  );
  let { d } = result?.data;
  let { user } = d;
  return { user };
}
