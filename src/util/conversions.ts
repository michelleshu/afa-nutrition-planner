import { FT_TO_INCHES, INCHES_TO_CM, LBS_TO_KGS } from "../constants";

export const feetAndInchesToCm = (
  feet: number | null,
  inches: number | null
) => {
  if (!feet || !inches) {
    return null;
  }
  return (feet * FT_TO_INCHES + inches) * INCHES_TO_CM;
};

export const feetAndInchesToCmRounded = (
  feet: number | null,
  inches: number | null
) => {
  if (!feet || !inches) {
    return null;
  }
  const totalInches = feet * FT_TO_INCHES + inches;
  return Math.round(totalInches * INCHES_TO_CM * 100) / 100;
};

export const lbsToKg = (weightLbs: number | null) => {
  if (!weightLbs) {
    return null;
  }
  return weightLbs * LBS_TO_KGS;
};

export const lbsToKgRounded = (weightLbs: number | null) => {
  if (!weightLbs) {
    return null;
  }
  return Math.round(weightLbs * LBS_TO_KGS * 100) / 100;
};
