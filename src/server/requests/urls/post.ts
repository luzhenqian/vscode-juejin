import { AxiosRequestConfig } from "axios";

export const getPostListAllURL =
  "https://api.juejin.cn/recommend_api/v1/article/recommend_all_feed"; // 获取全部文章列表

export const getPostListCateURL =
  "https://apinew.juejin.im/recommend_api/v1/article/recommend_cate_feed"; // 获取分类文章列表

export const getPostCategoryURL =
  "https://api.juejin.cn/tag_api/v1/query_category_briefs"; // 获取文章分类

export const getPostContentURL = "https://juejin.im/post/"; // 获取文章内容

export const postListAll: AxiosRequestConfig & { handler: Function } = {
  url: "https://api.juejin.cn/recommend_api/v1/article/recommend_all_feed",
  method: "POST",
  handler: (response: any) => {
    console.log("response", response);
  },
};
