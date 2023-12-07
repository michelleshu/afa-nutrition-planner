import { FT_TO_INCHES, INCHES_TO_CM, LBS_TO_KGS } from "../constants";

export const feetAndInchesToCm = (feet: number, inches: number) => {
  return (feet * FT_TO_INCHES + inches) * INCHES_TO_CM;
};

export const feetAndInchesToCmRounded = (feet: number, inches: number) => {
  const totalInches = feet * FT_TO_INCHES + inches;
  return Math.round(totalInches * INCHES_TO_CM * 100) / 100;
};

export const lbsToKg = (weightLbs: number) => {
  return weightLbs * LBS_TO_KGS;
};

export const lbsToKgRounded = (weightLbs: number) => {
  return Math.round(weightLbs * LBS_TO_KGS * 100) / 100;
};
