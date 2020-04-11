import * as axios from "axios";
import * as qs from "qs";

export async function common(respUser: string, targetId: string, content: string) {
  let url = 'https://hot-topic-comment-wrapper-ms.juejin.im/v1/comment';
  let data = {
    respUser,
    targetId,
    content
  };
  let formData = qs.stringify(data);
  let result;
  try {
    result = await axios.default.post(url, formData, {
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Connection': 'keep-alive',
        'Content-Length': '79',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Host': 'hot-topic-comment-wrapper-ms.juejin.im',
        'Origin': 'https://juejin.im',
        'Referer': 'https://juejin.im/pins/following',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
        'X-Juejin-Client': '1586431628185',
        'X-Juejin-Src': 'web',
        'X-Juejin-Token': 'eyJhY2Nlc3NfdG9rZW4iOiJJa0hNTW5rUDlEQmxMbHdnIiwicmVmcmVzaF90b2tlbiI6Im1tZFFta2tFT09lSnRjUDQiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==',
        'X-Juejin-Uid': '5e8f068be51d4547002734d3',
      }
    });
    if (result?.status === 200 && result?.statusText === 'OK') {
      return "评论成功";
    }
  } catch (err) {
    return err?.response?.data?.m;
  }
}

common('', '', '');