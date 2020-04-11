import * as moment from "moment";

// 获取相对于当前时间的表现形式
export function timeFromNow(time: string) {
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