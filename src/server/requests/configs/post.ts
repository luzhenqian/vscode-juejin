import { AxiosRequestConfig } from "axios";

export const getPostCategoryConfig: AxiosRequestConfig = {
  url: "https://api.juejin.cn/tag_api/v1/query_category_briefs",
  method: "GET",
};
