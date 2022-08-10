import axios from "axios";
import { RawData } from "../../types";
import {
  getPostCategoryConfig,
  getPostConfig,
  getPostListCateConfig,
} from "./configs/post";

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
  getPostConfig.url += id;
  const data = await axios(getPostConfig);
  return extractData(data);
}

function extractData({ status, data }: RawData) {
  if (status === 200) {
    const { err_no } = data;
    if (err_no === 0) {
      return data.data;
    }
  }
  return null;
}
