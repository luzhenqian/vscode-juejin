import { request } from "../../../request";
import { GetPostListParams, SearchPostParams } from "../../../types";

export function searchPost({
  sortType,
  cursor = "0",
  keywords,
}: SearchPostParams) {
  return request({
    type: "SEARCH_POST",
    payload: {
      sortType,
      cursor,
      keywords,
    },
  });
}

export function getPostList({
  sortType,
  cursor = "0",
  categoryID = "",
}: GetPostListParams) {
  return request<{
    cursor: string;
    data: any[];
  }>({
    type: "GET_POST_LIST_V2",
    payload: {
      sortType,
      cursor,
      categoryID,
    },
  });
}
