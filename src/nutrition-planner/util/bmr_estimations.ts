export const getBMRMifflinStJeor = ({
  biologicalSex,
  weightKgs,
  heightCms,
  age,
}: {
  biologicalSex: "Male" | "Female";
  weightKgs: number;
  heightCms: number;
  age: number;
}) => {
  if (biologicalSex === "Male") {
    return 10 * weightKgs + 6.25 * heightCms - 5 * age + 5;
  } else {
    return 10 * weightKgs + 6.25 * heightCms - 5 * age - 161;
  }
};

export const getBMRHarrisBenedict = ({
  biologicalSex,
  weightKgs,
  heightCms,
  age,
}: {
  biologicalSex: "Male" | "Female";
  weightKgs: number;
  heightCms: number;
  age: number;
}) => {
  if (biologicalSex === "Male") {
    return 88.362 + 13.397 * weightKgs + 4.799 * heightCms - 5.677 * age;
  } else {
    return 447.593 + 9.247 * weightKgs + 3.098 * heightCms - 4.33 * age;
  }
};

export const getBMRCunningham = ({
  leanBodyMassKgs,
  biologicalSex,
  weightKgs,
  heightCms,
}: {
  leanBodyMassKgs: number | null;
  biologicalSex: "Male" | "Female";
  weightKgs: number;
  heightCms: number;
}) => {
  // If LBM not provided, use Boer estimation to estimate LBM.
  const effectiveLeanBodyMassKgs = leanBodyMassKgs
    ? leanBodyMassKgs
    : biologicalSex === "Male"
    ? 0.407 * weightKgs + 0.267 * heightCms - 19.2
    : 0.252 * weightKgs + 0.473 * heightCms - 48.3;

  return 500 + 22 * effectiveLeanBodyMassKgs;
};

export const getBMRKatchMcArdle = ({
  leanBodyMassKgs,
  biologicalSex,
  weightKgs,
  heightCms,
}: {
  leanBodyMassKgs: number | null;
  biologicalSex: "Male" | "Female";
  weightKgs: number;
  heightCms: number;
}) => {
  // If LBM not provided, use Boer estimation to estimate LBM.
  const effectiveLeanBodyMassKgs = leanBodyMassKgs
    ? leanBodyMassKgs
    : biologicalSex === "Male"
    ? 0.407 * weightKgs + 0.267 * heightCms - 19.2
    : 0.252 * weightKgs + 0.473 * heightCms - 48.3;

  return 370 + 21.6 * effectiveLeanBodyMassKgs;
};
