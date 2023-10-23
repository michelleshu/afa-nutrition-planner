import React, { useCallback, useEffect, useState } from "react";
import { FormLabel, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import "./CalorieCalculator.css";
import { BMR_METHOD, GOAL, DEFAULT_TARGET_CALORIE_FACTOR } from "../constants";
import {
  getBMRMifflinStJeor,
  getBMRHarrisBenedict,
  getBMRKatchMcArdle,
  getBMRCunningham,
} from "../util/bmr_estimations";
import { isNumber, toNumber } from "../util/validations";

const CalorieCalculator = ({
  biologicalSex,
  weightKgs,
  heightCms,
  age,
  leanBodyMassKgs,
  goal,
  goalWeightKgs,
  setTargetCalories,
}: {
  biologicalSex: string;
  weightKgs: number | null;
  heightCms: number | null;
  age: number | null;
  leanBodyMassKgs: number | null;
  goal: string;
  goalWeightKgs: number | null;
  setTargetCalories: (targetCalories: number | null) => void;
}) => {
  const [bmrMethod, setBmrMethod] = useState<string>(
    BMR_METHOD.HARRIS_BENEDICT
  );
  const [estimatedBmr, setEstimatedBmr] = useState<number | null>(null);
  const [physicalActivityFactor, setPhysicalActivityFactor] =
    useState<string>("");
  const [tdee, setTdee] = useState<number | null>(null);
  const [targetCalorieFactor, setTargetCalorieFactor] = useState<string>("");

  const updateTargetCalorieFactor = useCallback(
    ({
      tdee,
      goal,
      weightKgs,
      goalWeightKgs,
    }: {
      tdee: number | null;
      goal: string;
      weightKgs: number | null;
      goalWeightKgs: number | null;
    }) => {
      if (
        goal === GOAL.MAINTAIN_WEIGHT &&
        isNumber(tdee) &&
        isNumber(weightKgs)
      ) {
        setTargetCalorieFactor(
          (
            Math.round((toNumber(tdee) * 100) / toNumber(weightKgs)) / 100
          ).toString()
        );
        setTargetCalories(toNumber(tdee));
      } else if (
        (goal === GOAL.LOSE_WEIGHT || goal === GOAL.GAIN_WEIGHT) &&
        isNumber(goalWeightKgs)
      ) {
        setTargetCalorieFactor(DEFAULT_TARGET_CALORIE_FACTOR.toString());
        setTargetCalories(
          toNumber(goalWeightKgs) * DEFAULT_TARGET_CALORIE_FACTOR
        );
      }
    },
    [setTargetCalorieFactor, setTargetCalories]
  );

  const updateTdee = useCallback(
    (bmr: number, paf: number) => {
      const newTdee = bmr * paf;
      setTdee(Math.round(newTdee));
      updateTargetCalorieFactor({
        tdee: newTdee,
        goal,
        weightKgs,
        goalWeightKgs,
      });
    },
    [goal, weightKgs, goalWeightKgs, updateTargetCalorieFactor]
  );

  const clearTdee = useCallback(() => {
    setTdee(null);
    updateTargetCalorieFactor({
      tdee: null,
      goal,
      weightKgs,
      goalWeightKgs,
    });
  }, [goal, weightKgs, goalWeightKgs, updateTargetCalorieFactor]);

  const updateEstimatedBmr = useCallback(
    (bmrEstimationMethod: string) => {
      const biologicalSexValid =
        biologicalSex === "Male" || biologicalSex === "Female";
      if (!(biologicalSexValid && weightKgs && heightCms && age)) {
        return null;
      } else {
        let bmr = null;

        if (bmrEstimationMethod === BMR_METHOD.MIFFLIN_ST_JEOR) {
          bmr = Math.round(
            getBMRMifflinStJeor({
              biologicalSex,
              weightKgs,
              heightCms,
              age,
            })
          );
        } else if (bmrEstimationMethod === BMR_METHOD.HARRIS_BENEDICT) {
          bmr = Math.round(
            getBMRHarrisBenedict({
              biologicalSex,
              weightKgs,
              heightCms,
              age,
            })
          );
        } else if (bmrEstimationMethod === BMR_METHOD.CUNNINGHAM) {
          bmr = Math.round(
            getBMRCunningham({
              biologicalSex,
              weightKgs,
              heightCms,
              leanBodyMassKgs,
            })
          );
        } else if (bmrEstimationMethod === BMR_METHOD.KATCH_MCARDLE) {
          bmr = Math.round(
            getBMRKatchMcArdle({
              biologicalSex,
              weightKgs,
              heightCms,
              leanBodyMassKgs,
            })
          );
        }

        setEstimatedBmr(bmr);
        if (isNumber(bmr) && isNumber(physicalActivityFactor)) {
          updateTdee(toNumber(bmr), toNumber(physicalActivityFactor));
        }
      }
    },
    [
      age,
      biologicalSex,
      heightCms,
      leanBodyMassKgs,
      weightKgs,
      physicalActivityFactor,
      updateTdee,
    ]
  );

  useEffect(() => {
    updateEstimatedBmr(bmrMethod);
  }, [
    biologicalSex,
    weightKgs,
    heightCms,
    age,
    leanBodyMassKgs,
    bmrMethod,
    updateEstimatedBmr,
  ]);

  const handleBmrMethodChange = (event: SelectChangeEvent) => {
    setBmrMethod(event.target.value);
    updateEstimatedBmr(event.target.value);
  };

  const handlePhysicalActivityFactorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhysicalActivityFactor(event.target.value);
    if (isNumber(estimatedBmr) && isNumber(event.target.value)) {
      updateTdee(toNumber(estimatedBmr), toNumber(event.target.value));
    } else {
      clearTdee();
    }
  };

  const handleTargetCalorieFactorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFactor = event.target.value;
    setTargetCalorieFactor(newFactor);

    if (isNumber(newFactor)) {
      setTargetCalories(targetCalories(newFactor));
    }
  };

  const targetCaloriesHeading = () => {
    if (
      (goal === GOAL.LOSE_WEIGHT || goal === GOAL.GAIN_WEIGHT) &&
      isNumber(goalWeightKgs)
    ) {
      const weight = toNumber(goalWeightKgs);
      return (
        <Stack direction="row" alignItems="center" gap={1}>
          <TextField
            id="target-calorie-factor"
            name="target-calorie-factor"
            type="number"
            value={targetCalorieFactor}
            onChange={handleTargetCalorieFactorChange}
            sx={{ width: "120px" }}
          />
          <Typography variant="body1">{`x ${
            Math.round(weight * 100) / 100
          } kg`}</Typography>
        </Stack>
      );
    } else if (isNumber(weightKgs)) {
      const weight = toNumber(weightKgs);
      return (
        <Stack direction="row" alignItems="center" gap={1}>
          <TextField
            id="target-calorie-factor"
            name="target-calorie-factor"
            type="number"
            value={targetCalorieFactor}
            onChange={handleTargetCalorieFactorChange}
            sx={{ width: "120px" }}
          />
          <Typography variant="body1">{`x ${
            Math.round(weight * 100) / 100
          } kg`}</Typography>
        </Stack>
      );
    } else {
      return <div className="TargetCaloriesSpacer"></div>;
    }
  };

  const targetCalories = (factor: string) => {
    if (isNumber(factor)) {
      if (goal === GOAL.MAINTAIN_WEIGHT && isNumber(weightKgs)) {
        return Math.round(toNumber(factor) * toNumber(weightKgs));
      }
      if (
        (goal === GOAL.LOSE_WEIGHT || goal === GOAL.GAIN_WEIGHT) &&
        isNumber(goalWeightKgs)
      ) {
        return Math.round(toNumber(factor) * toNumber(goalWeightKgs));
      }
    }
    return null;
  };

  return (
    <Grid container spacing={4}>
      <Grid xs={4}>
        <FormControl fullWidth>
          <FormLabel id="bmr-method-label">BMR Estimation Method</FormLabel>
          <Select
            labelId="bmr-method-label"
            id="bmrMethod"
            name="bmrMethod"
            value={bmrMethod}
            onChange={handleBmrMethodChange}
          >
            <MenuItem
              key={BMR_METHOD.HARRIS_BENEDICT}
              value={BMR_METHOD.HARRIS_BENEDICT}
            >
              {BMR_METHOD.HARRIS_BENEDICT}
            </MenuItem>
            <MenuItem key={BMR_METHOD.CUNNINGHAM} value={BMR_METHOD.CUNNINGHAM}>
              {BMR_METHOD.CUNNINGHAM}
            </MenuItem>
          </Select>
        </FormControl>
        <div className="HighlightCard GrayHighlightCard">
          <Typography variant="h6" component="h2">
            BMR
          </Typography>
          <Typography variant="h3" component="p">
            {estimatedBmr ? `${estimatedBmr} cal` : ""}
          </Typography>
        </div>
      </Grid>
      <Grid xs={4}>
        <FormLabel>Physical Activity Factor</FormLabel>
        <TextField
          fullWidth
          id="physical-activity-factor"
          name="physical-activity-factor"
          type="number"
          value={physicalActivityFactor}
          onChange={handlePhysicalActivityFactorChange}
        />
        <div className="HighlightCard BlueHighlightCard">
          <Typography variant="h6" component="h2">
            TDEE
          </Typography>
          <Typography variant="h3" component="p">
            {tdee ? `${tdee} cal` : ""}
          </Typography>
        </div>
      </Grid>
      <Grid xs={4}>
        <FormLabel>Target Calories</FormLabel>
        {targetCaloriesHeading()}
        <div className="HighlightCard GreenHighlightCard">
          <Typography variant="h6" component="h2">
            Target Calories
          </Typography>
          <Typography variant="h3" component="p">
            {targetCalories(targetCalorieFactor)
              ? `${targetCalories(targetCalorieFactor)} cal`
              : ""}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default CalorieCalculator;
