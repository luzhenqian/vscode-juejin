import { RawData } from "../../types";

export function extractData({ status, data }: RawData) {
  if (status === 200) {
    const { err_no } = data;
    if (err_no === 0) {
      return data.data;
    }
  }
  return null;
}