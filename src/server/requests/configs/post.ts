import { AxiosRequestConfig } from "axios";
const customAlphabet = (alphabet: string, len: number) => {
  let id = "";
  for (let i = 0; i < len; i++) {
    id += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return id;
};
export const randomID = () => customAlphabet("0123456789", 19);

export const getPostCategoryConfig: AxiosRequestConfig = {
  url: "https://api.juejin.cn/tag_api/v1/query_category_briefs",
  method: "GET",
};

export const getPostListConfig: AxiosRequestConfig = {
  url: "https://api.juejin.cn/recommend_api/v1/article/recommend_all_feed",
  method: "POST",
};

export const getPostListCateConfig: AxiosRequestConfig = {
  url: `https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?aid=2608&uuid=${randomID()}`,
  method: "POST",
};

export const getPostConfig: AxiosRequestConfig = {
  url: "https://juejin.cn/post/",
  method: "GET",
};

export const searchPostConfig: AxiosRequestConfig = {
  url: `https://api.juejin.cn/search_api/v1/search?aid=2608&uuid=${randomID()}&spider=0`,
  method: "POST",
};
