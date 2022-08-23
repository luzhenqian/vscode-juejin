import * as vscode from "vscode";
import { Action, CheckInResponse, Draw } from "../../types";
import { getCategories, getPostList, getPost } from "../requests/post";
import {
  categoriesMapping,
  postListMapping,
  postMapping,
} from "../mapping/post";
import { checkIn, draw, lotteryConfig } from "../requests/growth";
import {
  checkInMapping,
  drawMapping,
  lotteryConfigMapping,
} from "../mapping/growth";

export async function reducer(action: Action) {
  switch (action.type) {
    case "GET_CATEGORIES":
      action.payload.panel.webview.postMessage({
        type: "SEND_CATEGORIES",
        payload: categoriesMapping(await getCategories()),
      });
      return;
    case "RELOAD":
      action.payload.reload();
      return;
    case "GET_POST":
      action.payload.panel.webview.postMessage({
        type: "SEND_POST",
        payload: postMapping(await getPost(action.payload.id)),
      });
      return;
    case "GET_INITIAL":
      const {
        payload: { cateName, cursor = 0 },
      } = action;
      const categories = categoriesMapping(await getCategories());
      const cateId = categories.find((c) => c.name === cateName)?.id || "";
      const postList = postListMapping(
        await getPostList({
          cursor,
          cateId,
        })
      );

      const cookie = vscode.workspace
        .getConfiguration()
        .get("juejin.cookie") as string;
      if (cookie) {
        // ! 两者存在依赖关系，必须先签到才可以获得抽奖次数
        const res = await checkIn(cookie);
        if (res !== null) {
          const data = checkInMapping(res);
          vscode.window.showInformationMessage(
            `每日签到成功！获得 ${data.incrPoint} 矿石，累计 ${data.sumPoint} 矿石！`
          );
        }

        const lotteryConfigRes = await lotteryConfig(cookie);
        const { freeCount } = lotteryConfigMapping(lotteryConfigRes);

        if (freeCount > 0) {
          const drawRes = await draw(cookie);
          const drawData = drawMapping(drawRes);
          vscode.window.showInformationMessage(
            `免费抽奖成功！获得 ${drawData.name}！`
          );
        }
      }

      action.payload.panel.webview.postMessage({
        type: "SEND_INITIAL",
        payload: {
          categories,
          postList,
        },
      });
      return;
    case "GET_POST_LIST":
      const data = await getPostList({
        cursor: action.payload.cursor,
        cateId: action.payload.categoryID,
      });
      const dataMapped = postListMapping(data);
      action.payload.panel.webview.postMessage({
        type: "SEND_POST_LIST",
        payload: dataMapped,
      });
      return;
    case "SET_CURRENT_CATEGORY_ID":
      action.payload.panel.webview.postMessage({
        type: "SEND_POST_LIST",
        payload: postListMapping(
          await getPostList({
            cursor: action.payload.cursor,
            cateId: action.payload.categoryID,
          })
        ),
      });
      return;
    case "CHECK_IN":
      // const cookie = vscode.workspace.getConfiguration().get("juejin.cookie");
      // console.log(cookie);
      // debugger;
      // action.payload.panel.webview.postMessage({
      //   type: "SEND_POST_LIST",
      //   payload: postListMapping(
      //     await getPostList({
      //       cursor: action.payload.cursor,
      //       cateId: action.payload.categoryID,
      //     })
      //   ),
      // });
      return;
  }
}
