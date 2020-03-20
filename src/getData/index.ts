import * as axios from "axios";
import * as moment from "moment";

// 获取相对于当前时间的表现形式
function timeFromNow(time: string) {
  let oldTime = moment(time).format("x");
  let now = moment(moment.now()).format("x");
  let dura = +now - +oldTime;
  let tempTime = moment.duration(dura);
  let ty = tempTime.years();
  let tM = tempTime.months();
  let td = tempTime.days();
  let th = tempTime.hours();
  let tm = tempTime.minutes();
  let ts = tempTime.seconds();
  if (ty) return ty + "年前";
  if (tM) return tM + "月前";
  if (td) return td + "天前";
  if (th) return th + "小时前";
  if (tm) return tm + "分钟前";
  if (ts) return ts + "秒前";
}

let afterId = ""; // 获取下一页沸点时用到的参数，为当前页最后一条沸点的 id

export enum GET_PINS_TYPE {
  "INIT" = "INIT",
  "NEXT" = "NEXT"
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
      extensions: { query: { id: "249431a8e4d85e459f6c29eb808e76d0" } }
    },
    {
      headers: {
        "X-Agent": "Juejin/Web"
      }
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
        pictures
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
        title
      };
    });
    console.log("pinsParse:", pinsParse);
    return pinsParse;
  } catch (e) {
    console.log("error:", e);
  }
}

export async function getComments(commentId: string) {
  const data = await axios.default.get(
    `https://hot-topic-comment-wrapper-ms.juejin.im/v1/comments/${commentId}?pageNum=1&pageSize=100`,
    {
      headers: {
        "X-Juejin-Src": "Juejin/Web",
        "X-Juejin-Client": "",
        "X-Juejin-Token": "",
        "X-Juejin-Uid": ""
      }
    }
  );
  try {
    const { comments } = data.data.d;
    console.log("comments:", comments);
    const commentsParse = comments.map((comment: any) => {
      let { createdAt, userInfo, content, topComment } = comment;
      createdAt = timeFromNow(createdAt);
      let { avatarLarge, username, jobTitle, company } = userInfo;
      function formatData(dataList: any[] | undefined) {
        if (Array.isArray(dataList) && dataList.length > 0) {
          dataList.forEach((data) => {
            let { createdAt, userInfo, content, topComment } = data;
            let { avatarLarge, username, jobTitle, company } = userInfo;
            data.avatarLarge = avatarLarge;
            data.username = username;
            data.jobTitle = jobTitle;
            data.company = company;
            data.createdAt = timeFromNow(data.createdAt);
            data.topComment ? formatData(data.topComment) : void 0;
          });
        }
      }
      formatData(topComment);
      return {
        createdAt,
        avatarLarge,
        username,
        jobTitle,
        company,
        content,
        topComment
      };
    });
    console.log("commentsParse:", commentsParse);
    return commentsParse;
  } catch (e) {
    console.log("error:", e);
  }
}
