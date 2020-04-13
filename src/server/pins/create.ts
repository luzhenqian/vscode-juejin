// TODO: 掘金对每个用户有接口调用次数限制，无法用一个号来发表评论或回复评论。
// 登陆的接口没有返回 token，所以登陆的功能暂时不好做。
let url = 'https://short-msg-ms.juejin.im/v1/create';

let fromData = {
  uid: '5e8f068be51d4547002734d3',
  device_id: 1586431628185,
  token: 'eyJhY2Nlc3NfdG9rZW4iOiJJa0hNTW5rUDlEQmxMbHdnIiwicmVmcmVzaF90b2tlbiI6Im1tZFFta2tFT09lSnRjUDQiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ ==',
  src: 'web',
  content: '随便发一个沸点',
  pictures: '',
  url: '',
  urlTitle: '',
  urlPic: '',
  topicId: ''
}