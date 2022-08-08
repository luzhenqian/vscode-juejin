import axios from "axios";
import { RawData } from "../../types";
import { getPostCategoryConfig } from "./configs/post";

export async function getCategories() {
  return extractData(await axios(getPostCategoryConfig));
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
