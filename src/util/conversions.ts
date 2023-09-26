import { LBS_TO_KGS } from "../constants";

export const lbsToKgRounded = (weightLbs: number) => {
  return Math.round(weightLbs * LBS_TO_KGS * 100) / 100;
};
