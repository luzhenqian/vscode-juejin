import axios from "axios";
import { RawData } from "../../types";
import { getPostCategoryConfig, getPostListConfig } from "./configs/post";

export async function getCategories() {
  return extractData(await axios(getPostCategoryConfig));
}

export type GetPostListParams = {
  cursor: number;
  cateId: string;
};
export async function getPostList(params: GetPostListParams) {
  getPostListConfig.data = {
    id_type: 2,
    client_type: 2608,
    sort_type: 200,
    cursor: params.cursor + "",
    limit: 20,
    cate_id: params.cateId,
  };

  return extractData(await axios(getPostListConfig));
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
