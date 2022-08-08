import * as axios from "axios";
import { timeFromNow } from "../../utils/time";
import { getPinsURL } from "../requests/urls/pins";
import { defaultAvatarLargeURL } from "../requests/urls/common";

let _cursor = "0"; // 获取下一页沸点时用到的参数，为当前页最后一条沸点的 id

export enum GET_PINS_TYPE {
  "INIT" = "INIT",
  "NEXT" = "NEXT",
}

export async function getPins(type: GET_PINS_TYPE) {
  let cursor;
  if (type === GET_PINS_TYPE.NEXT) {
    cursor = _cursor;
  }

  const res = await axios.default.post(getPinsURL, {
    cursor,
    id_type: 4,
    limit: 20,
    sort_type: 300,
  });
  try {
    let { data, cursor } = res.data;
    _cursor = cursor;
    let pinsParse = (data as []).map(
      ({ msg_id, msg_Info, author_user_info, topic }) => {
        console.log(msg_Info, author_user_info);
        let {
          id,
          content, // 内容
          ctime, // 创建时间
          digg_count, // 点赞数
          comment_count, // 评论数
          pic_list, // 图片列表
        } = msg_Info;

        let {
          user_name, // 创建人
          company, // 公司
          job_title, // 工作职位
          avatar_large, // 头像
        } = author_user_info;
        let {
          title, // 主题
        } = topic;
        return {
          id: msg_id,
          avatarLarge: avatar_large || defaultAvatarLargeURL,
          username: user_name,
          company,
          jobTitle: job_title,
          content,
          // 返回的是 11 位时间戳，应该使用 13 位时间戳
          createdAt: timeFromNow(ctime + "000"),
          likeCount: digg_count,
          commentCount: comment_count,
          pictures: pic_list,
          title,
        };
      }
    );
    // console.log("pinsParse:", pinsParse);
    return pinsParse;
  } catch (e) {
    console.log("error:", e);
  }
}

getPins(GET_PINS_TYPE.INIT);
