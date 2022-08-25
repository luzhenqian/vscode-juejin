import { request } from "../../../request";
import { SearchPostParams } from "../../../types";

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
