type DAILY_PORTION_TEMPLATE = {
  vegetableServings: number;
  fruitServings: number;
  grainServings: number;
  leanProteinServings: number;
  dairyServings: number;
  fatServings: number;
};

const TEMPLATE_1200_CAL: DAILY_PORTION_TEMPLATE = {
  vegetableServings: 6,
  fruitServings: 2,
  grainServings: 3,
  leanProteinServings: 2,
  dairyServings: 2,
  fatServings: 4,
};

const TEMPLATE_1600_CAL: DAILY_PORTION_TEMPLATE = {
  vegetableServings: 6,
  fruitServings: 2,
  grainServings: 5,
  leanProteinServings: 3,
  dairyServings: 2,
  fatServings: 6,
};

const TEMPLATE_2000_CAL: DAILY_PORTION_TEMPLATE = {
  vegetableServings: 6,
  fruitServings: 3,
  grainServings: 7,
  leanProteinServings: 3,
  dairyServings: 3,
  fatServings: 8,
};

const TEMPLATE_2400_CAL: DAILY_PORTION_TEMPLATE = {
  vegetableServings: 6,
  fruitServings: 4,
  grainServings: 8,
  leanProteinServings: 4,
  dairyServings: 3,
  fatServings: 10,
};

const TEMPLATE_2800_CAL: DAILY_PORTION_TEMPLATE = {
  vegetableServings: 6,
  fruitServings: 4,
  grainServings: 10,
  leanProteinServings: 5,
  dairyServings: 3,
  fatServings: 12,
};

const TEMPLATE_3200_CAL: DAILY_PORTION_TEMPLATE = {
  vegetableServings: 6,
  fruitServings: 5,
  grainServings: 11,
  leanProteinServings: 6,
  dairyServings: 3,
  fatServings: 14,
};

const getDailyPortionTemplate = (targetCalories: number) => {
  if (targetCalories < 1400) {
    return TEMPLATE_1200_CAL;
  } else if (targetCalories >= 1400 && targetCalories < 1800) {
    return TEMPLATE_1600_CAL;
  } else if (targetCalories >= 1800 && targetCalories < 2200) {
    return TEMPLATE_2000_CAL;
  } else if (targetCalories >= 2200 && targetCalories < 2600) {
    return TEMPLATE_2400_CAL;
  } else if (targetCalories >= 2600 && targetCalories < 3000) {
    return TEMPLATE_2800_CAL;
  } else {
    return TEMPLATE_3200_CAL;
  }
};

export { getDailyPortionTemplate };
