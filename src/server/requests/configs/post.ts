import { AxiosRequestConfig } from "axios";

export const getPostCategoryConfig: AxiosRequestConfig = {
  url: "https://api.juejin.cn/tag_api/v1/query_category_briefs",
  method: "GET",
};

export const getPostListConfig: AxiosRequestConfig = {
  url: "https://api.juejin.cn/recommend_api/v1/article/recommend_all_feed",
  method: "POST",
};

export const getPostListCateConfig: AxiosRequestConfig = {
  url: "https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed",
  method: "POST",
};


export const getPostConfig: AxiosRequestConfig = {
  url: "https://juejin.cn/post/",
  method: "GET",
};
