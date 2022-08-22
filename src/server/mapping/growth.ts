import { CheckInResponse, Draw, LotteryConfig } from "../../types";

export function checkInMapping(raw: any): CheckInResponse {
  const { incr_point, sum_point } = raw;
  return {
    success: true,
    incrPoint: incr_point,
    sumPoint: sum_point,
  };
}

export function lotteryConfigMapping(raw: any): LotteryConfig {
  const { free_count } = raw;
  return {
    freeCount: free_count,
  };
}

export function drawMapping(raw: any): Draw {
  const { lottery_name, lottery_image } = raw;
  return {
    name: lottery_name,
    image: lottery_image,
  };
}
