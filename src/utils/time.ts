import * as moment from "moment";

/**
 * 获取相对于当前时间的表现形式
 * @param time 13 位 时间戳
 */
export function timeFromNow(time: string): string {
  let d1 = moment(time, "x");
  let currentTime = moment();
  let years = currentTime.diff(d1, "year");
  let months = currentTime.diff(d1, "month");
  let days = currentTime.diff(d1, "day");
  let hours = currentTime.diff(d1, "hour");
  let minutes = currentTime.diff(d1, "minute");
  let seconds = currentTime.diff(d1, "second");

  if (years) return years + "年前";
  if (months) return months + "月前";
  if (days) return days + "天前";
  if (hours) return hours + "小时前";
  if (minutes) return minutes + "分钟前";
  if (seconds) return seconds + "秒前";
  return "";
}
