import axios from "axios";
import { GET_POST_LIST_TYPE } from "../../types";
import { postListAll } from "./urls/post";

let endCursor = "";

export async function getPostList(
  type: GET_POST_LIST_TYPE = "INIT",
  variables: any = {}
) {
  // let category;
  // let { defaultCategory } = variables;
  // if (type === "INIT" && defaultCategory) {
  //   (await getCategories()).forEach(
  //     (_category: { category_name: string; category_id: string }) => {
  //       if (_category.category_name === defaultCategory) {
  //         category = _category.category_id;
  //       }
  //     }
  //   );
  // } else {
  //   category = variables.category;
  // }

  let cursor = type === "INIT" ? "0" : type === "NEXT" ? endCursor : "0";
  // console.log("category:", category);

  const data = {
    cursor,
    id_type: 2,
    limit: 20,
    sort_type: 200,
    // cate_id: category,
  };

  axios({
    ...postListAll,
    data,
  }).then((res) => postListAll.handler(res.data));
}
