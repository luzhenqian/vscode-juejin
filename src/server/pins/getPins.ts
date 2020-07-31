import * as axios from "axios";
import { timeFromNow } from "../../utils/time";
import { getPinsURL } from "../urls/pins";
import { defaultAvatarLargeURL } from "../urls/common";

let _afterId = "0"; // 获取下一页沸点时用到的参数，为当前页最后一条沸点的 id

export enum GET_PINS_TYPE {
  "INIT" = "INIT",
  "NEXT" = "NEXT",
}

export async function getPins(type: GET_PINS_TYPE) {
  let afterId;
  if (type === GET_PINS_TYPE.NEXT) {
    afterId = _afterId;
  }

  const res = await axios.default.post(getPinsURL, {
    cursor: afterId,
    id_type: 4,
    limit: 20,
    sort_type: 300,
  });
  try {
    let { data, cursor } = res.data;
    _afterId = cursor;
    let pinsParse = (data as []).map(
      ({ msg_Info, author_user_info, topic }) => {
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
          id,
          avatarLarge: avatar_large || defaultAvatarLargeURL,
          username: user_name,
          company,
          jobTitle: job_title,
          content,
          createdAt: timeFromNow(ctime),
          likeCount: digg_count,
          commentCount: comment_count,
          pictures: pic_list,
          title,
        };
      }
    );
    // console.log("pinsParse:", pinsParse);
    return pinsParse;
    // const pinsList = data.data.data.recommendedActivityFeed.items.edges;
    // const { endCursor } = data.data.data.recommendedActivityFeed.items.pageInfo;
    // afterId = endCursor;
    // const pinsParse = pinsList.map((item: any) => {
    //   const { actors, targets, id } = item.node;
    //   let { avatarLarge, username, company, jobTitle } = actors["0"];
    //   let {
    //     content,
    //     createdAt,
    //     likeCount,
    //     commentCount,
    //     topic,
    //     pictures,
    //   } = targets["0"];
    //   createdAt = timeFromNow(createdAt);
    //   avatarLarge =
    //     avatarLarge ||
    //     "https://b-gold-cdn.xitu.io/v3/static/img/default-avatar.e30559a.svg";
    //   let { title } = topic ? topic : { title: "" };
    // return {
    //   id,
    //   avatarLarge,
    //   username,
    //   company,
    //   jobTitle,
    //   content,
    //   createdAt,
    //   likeCount,
    //   commentCount,
    //   pictures,
    //   title,
    // };
    // });
    // console.log("pinsParse:", pinsParse);
    // return pinsParse;
  } catch (e) {
    console.log("error:", e);
  }
}

getPins(GET_PINS_TYPE.INIT);
