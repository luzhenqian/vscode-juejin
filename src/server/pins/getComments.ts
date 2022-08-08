import * as axios from "axios";
import { timeFromNow } from "../../utils/time";
import { getCommentsURL } from "../requests/urls/pins";
import { defaultAvatarLargeURL } from "../requests/urls/common";

/**
 * 获取评论
 * @param pinsId 沸点id
 */
export async function getComments(pinsId: string) {
  console.log(pinsId);

  const res = await axios.default.post(getCommentsURL, {
    client_type: 2608,
    cursor: "0",
    item_id: pinsId,
    item_type: 4,
    limit: 100,
  });
  try {
    let {
      data: { data },
    } = res;
    let commentsParse = (data as []).map((comment) => {
      let { comment_info, user_info } = comment;
      let {
        comment_content, // 评论内容
        ctime, // 创建时间
      } = comment_info;
      let {
        avatar_large, // 头像
        user_name, // 用户名
        job_title, // 工作
        company, // 公司
      } = user_info;

      return {
        createdAt: timeFromNow(ctime + "000"),
        avatarLarge: avatar_large || defaultAvatarLargeURL,
        username: user_name,
        jobTitle: job_title,
        company,
        content: comment_content,
        topComment: undefined,
      };
    });
    console.log("commentsParse:", commentsParse);
    return commentsParse;
  } catch (e) {
    console.log("error:", e);
  }
}
