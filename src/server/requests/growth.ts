import { extractData } from "../utils/extract";
import {
  checkInConfig,
  drawConfig,
  lotteryConfigConfig,
} from "./configs/growth";
const axios = require("axios");

export async function checkIn(cookie: string) {
  const data = await axios({
    ...checkInConfig,
    headers: {
      Cookie: cookie,
    },
  });
  return extractData(data);
}

export async function lotteryConfig(cookie: string) {
  const data = await axios({
    ...lotteryConfigConfig,
    headers: {
      Cookie: cookie,
    },
  });
  return extractData(data);
}

export async function draw(cookie: string) {
  const res = await axios({
    ...drawConfig,
    headers: {
      Cookie: cookie,
    },
  });
  return extractData(res);
}
