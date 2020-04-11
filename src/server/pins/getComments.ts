import * as axios from "axios";
import { timeFromNow } from "../../utils/time";

export async function getComments(commentId: string) {
  const data = await axios.default.get(
    `https://hot-topic-comment-wrapper-ms.juejin.im/v1/comments/${commentId}?pageNum=1&pageSize=100`,
    {
      headers: {
        "X-Juejin-Src": "Juejin/Web",
        "X-Juejin-Client": "",
        "X-Juejin-Token": "",
        "X-Juejin-Uid": "",
      },
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
        topComment,
      };
    });
    console.log("commentsParse:", commentsParse);
    return commentsParse;
  } catch (e) {
    console.log("error:", e);
  }
}
