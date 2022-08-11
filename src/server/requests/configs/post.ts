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
  headers: {
    Cookie: `__tea_cookie_tokens_2608=%257B%2522web_id%2522%253A%25227105256514437449254%2522%252C%2522user_unique_id%2522%253A%25227105256514437449254%2522%252C%2522timestamp%2522%253A1654321460904%257D; _ga=GA1.2.267896738.1654321462; n_mh=KOldm-vQpKMD8ttTmMpvbcRKDxVNrWgjuVa3OkPV2k8; sid_guard=bb55a50d921b475f4cf44d0abf14ee74%7C1654321481%7C31536000%7CSun%2C+04-Jun-2023+05%3A44%3A41+GMT; uid_tt=0a9778666333874d5c730db9dacef386; uid_tt_ss=0a9778666333874d5c730db9dacef386; sid_tt=bb55a50d921b475f4cf44d0abf14ee74; sessionid=bb55a50d921b475f4cf44d0abf14ee74; sessionid_ss=bb55a50d921b475f4cf44d0abf14ee74; sid_ucp_v1=1.0.0-KGQzYmY5MDM0OGM5NDJiODE5NzNmY2U2OTFlYTRjZTEzMWIyZjBjOGQKFwinvvC__fWBARDJ4uuUBhiwFDgCQO8HGgJsZiIgYmI1NWE1MGQ5MjFiNDc1ZjRjZjQ0ZDBhYmYxNGVlNzQ; ssid_ucp_v1=1.0.0-KGQzYmY5MDM0OGM5NDJiODE5NzNmY2U2OTFlYTRjZTEzMWIyZjBjOGQKFwinvvC__fWBARDJ4uuUBhiwFDgCQO8HGgJsZiIgYmI1NWE1MGQ5MjFiNDc1ZjRjZjQ0ZDBhYmYxNGVlNzQ; _gid=GA1.2.1919095233.1659091146; MONITOR_WEB_ID=3e8af40a-c8c8-4956-9794-8d1db9afc67b; passport_csrf_token=144628768afa4ccd092f2246ac26ad88; passport_csrf_token_default=144628768afa4ccd092f2246ac26ad88; _tea_utm_cache_2608={%22utm_source%22:%22web5%22%2C%22utm_medium%22:%22feed%22%2C%22utm_campaign%22:%22ranklistmonthly%22}; _tea_utm_cache_1229=undefined`,
  },
};

export const getPostConfig: AxiosRequestConfig = {
  url: "https://juejin.cn/post/",
  method: "GET",
};
