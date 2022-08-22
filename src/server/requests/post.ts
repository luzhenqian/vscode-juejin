import { extractData } from "../utils/extract";
import {
  getPostCategoryConfig,
  getPostConfig,
  getPostListCateConfig,
} from "./configs/post";
const axios = require("axios");

export async function getCategories() {
  return extractData(await axios(getPostCategoryConfig));
}

export type GetPostListParams = {
  cursor: number;
  cateId: string;
};

export async function getPostList(params: GetPostListParams) {
  getPostListCateConfig.data = {
    id_type: 2,
    client_type: 2608,
    sort_type: 200,
    cursor: params.cursor + "",
    limit: 20,
    cate_id: params.cateId,
  };
  const data = await axios(getPostListCateConfig);
  return extractData(data);
}

export async function getPost(id: string) {
  const config = { ...getPostConfig, url: getPostConfig.url + id };
  const res = await axios(config);
  const { status, data } = res;
  if (status === 200) {
    return data;
  }
  return "";
}

