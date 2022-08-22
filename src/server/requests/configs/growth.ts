import { AxiosRequestConfig } from "axios";

export const checkInConfig: AxiosRequestConfig = {
  url: "https://api.juejin.cn/growth_api/v1/check_in",
  method: "POST",
};

export const drawConfig: AxiosRequestConfig = {
  url: "https://api.juejin.cn/growth_api/v1/lottery/draw",
  method: "POST",
};

export const lotteryConfigConfig: AxiosRequestConfig = {
  url: "https://api.juejin.cn/growth_api/v1/lottery_config/get?aid=2608&uuid=7105256514437449255",
  method: "GET",
};
