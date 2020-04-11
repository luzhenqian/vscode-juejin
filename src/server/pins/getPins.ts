import * as axios from "axios";
import { timeFromNow } from "../../utils/time";

let afterId = ""; // 获取下一页沸点时用到的参数，为当前页最后一条沸点的 id

export enum GET_PINS_TYPE {
  "INIT" = "INIT",
  "NEXT" = "NEXT",
}

export async function getPins(type: GET_PINS_TYPE) {
  let _afterId;
  if (type === GET_PINS_TYPE.INIT) {
    _afterId = "";
  } else if (type === GET_PINS_TYPE.NEXT) {
    _afterId = afterId;
  }
  const data = await axios.default.post(
    "https://web-api.juejin.im/query",
    {
      operationName: "",
      query: "",
      variables: { first: 20, after: _afterId, afterPosition: "" },
      extensions: { query: { id: "249431a8e4d85e459f6c29eb808e76d0" } },
    },
    {
      headers: {
        "X-Agent": "Juejin/Web",
      },
    }
  );
  try {
    const pinsList = data.data.data.recommendedActivityFeed.items.edges;
    const { endCursor } = data.data.data.recommendedActivityFeed.items.pageInfo;
    afterId = endCursor;
    const pinsParse = pinsList.map((item: any) => {
      const { actors, targets, id } = item.node;
      let { avatarLarge, username, company, jobTitle } = actors["0"];
      let {
        content,
        createdAt,
        likeCount,
        commentCount,
        topic,
        pictures,
      } = targets["0"];
      createdAt = timeFromNow(createdAt);
      avatarLarge =
        avatarLarge ||
        "https://b-gold-cdn.xitu.io/v3/static/img/default-avatar.e30559a.svg";
      let { title } = topic ? topic : { title: "" };
      return {
        id,
        avatarLarge,
        username,
        company,
        jobTitle,
        content,
        createdAt,
        likeCount,
        commentCount,
        pictures,
        title,
      };
    });
    console.log("pinsParse:", pinsParse);
    return pinsParse;
  } catch (e) {
    console.log("error:", e);
  }
}
