import React, { useState } from "react";
import { FormLabel, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Unstable_Grid2";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";

import "./NutritionForm.css";
import { BIOLOGICAL_SEX, GOAL } from "../constants";
import {
  feetAndInchesToCm,
  feetAndInchesToCmRounded,
  lbsToKg,
  lbsToKgRounded,
} from "../util/conversions";
import { isNumber, toNumber } from "../util/validations";
import CalorieCalculator from "./CalorieCalculator";
import MacroCalculator from "./MacroCalculator";

const NutritionForm = () => {
  const [targetCalories, setTargetCalories] = useState<number | null>(null);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      biologicalSex: "",
      age: "",
      heightFeet: "",
      heightInches: "",
      weightLbs: "",
      leanBodyMassLbs: "",
      goal: GOAL.MAINTAIN_WEIGHT,
      goalWeightLbs: "",
    },
    onSubmit: (values) => {},
  });

  const goalInvolvesWeightChange = () =>
    formik.values.goal === GOAL.LOSE_WEIGHT ||
    formik.values.goal === GOAL.GAIN_WEIGHT;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container columnSpacing={4} rowSpacing={2}>
        <Grid xs={4}>
          <FormLabel>First Name</FormLabel>
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid xs={5}>
          <FormLabel>Last Name</FormLabel>
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid xs={3}>
          <FormControl fullWidth>
            <FormLabel id="biological-sex-label">Biological Sex</FormLabel>
            <Select
              labelId="biological-sex-label"
              id="biologicalSex"
              name="biologicalSex"
              value={formik.values.biologicalSex}
              onChange={formik.handleChange}
            >
              <MenuItem key={""} value={""}></MenuItem>
              <MenuItem key={BIOLOGICAL_SEX.MALE} value={BIOLOGICAL_SEX.MALE}>
                {BIOLOGICAL_SEX.MALE}
              </MenuItem>
              <MenuItem
                key={BIOLOGICAL_SEX.FEMALE}
                value={BIOLOGICAL_SEX.FEMALE}
              >
                {BIOLOGICAL_SEX.FEMALE}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={2}>
          <FormLabel>Age</FormLabel>
          <TextField
            fullWidth
            id="age"
            name="age"
            type="number"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid xs={4}>
          <FormLabel>Height</FormLabel>
          <FormGroup sx={{ flexDirection: "row", flexWrap: "nowrap" }}>
            <TextField
              fullWidth
              id="heightFeet"
              name="heightFeet"
              type="number"
              value={formik.values.heightFeet}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ marginRight: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">ft</InputAdornment>
                ),
              }}
              helperText={
                isNumber(formik.values.heightFeet) &&
                isNumber(formik.values.heightInches)
                  ? `${feetAndInchesToCmRounded(
                      toNumber(formik.values.heightFeet),
                      toNumber(formik.values.heightInches)
                    )} cm`
                  : null
              }
            />
            <TextField
              fullWidth
              id="heightInches"
              name="heightInches"
              type="number"
              value={formik.values.heightInches}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">in</InputAdornment>
                ),
              }}
            />
          </FormGroup>
        </Grid>
        <Grid xs={3}>
          <FormLabel>Weight</FormLabel>
          <TextField
            fullWidth
            id="weightLbs"
            name="weightLbs"
            type="number"
            value={formik.values.weightLbs}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
            }}
            helperText={
              isNumber(formik.values.weightLbs)
                ? `${lbsToKgRounded(toNumber(formik.values.weightLbs))} kg`
                : null
            }
          />
        </Grid>
        <Grid xs={3}>
          <FormLabel>LBM (optional)</FormLabel>
          <TextField
            fullWidth
            id="leanBodyMassLbs"
            name="leanBodyMassLbs"
            type="number"
            value={formik.values.leanBodyMassLbs}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
            }}
            helperText={
              isNumber(formik.values.leanBodyMassLbs)
                ? `${lbsToKgRounded(
                    toNumber(formik.values.leanBodyMassLbs)
                  )} kg`
                : null
            }
          />
        </Grid>
        <Grid xs={9}>
          <FormControl fullWidth>
            <FormLabel id="goal-label">Goal</FormLabel>
            <Select
              labelId="goal-label"
              id="goal"
              name="goal"
              value={formik.values.goal}
              onChange={formik.handleChange}
            >
              <MenuItem key={GOAL.LOSE_WEIGHT} value={GOAL.LOSE_WEIGHT}>
                {GOAL.LOSE_WEIGHT}
              </MenuItem>
              <MenuItem key={GOAL.GAIN_WEIGHT} value={GOAL.GAIN_WEIGHT}>
                {GOAL.GAIN_WEIGHT}
              </MenuItem>
              <MenuItem key={GOAL.MAINTAIN_WEIGHT} value={GOAL.MAINTAIN_WEIGHT}>
                {GOAL.MAINTAIN_WEIGHT}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={3}>
          <FormLabel>Goal Weight</FormLabel>
          {goalInvolvesWeightChange() ? (
            <TextField
              fullWidth
              id="goalWeightLbs"
              name="goalWeightLbs"
              type="number"
              value={formik.values.goalWeightLbs}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">lbs</InputAdornment>
                ),
              }}
              helperText={
                isNumber(formik.values.goalWeightLbs)
                  ? `${lbsToKgRounded(
                      toNumber(formik.values.goalWeightLbs)
                    )} kg`
                  : null
              }
            />
          ) : (
            <TextField
              fullWidth
              disabled
              id="disabledGoalWeight"
              type="number"
              value={formik.values.weightLbs}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">lbs</InputAdornment>
                ),
              }}
              helperText={
                isNumber(formik.values.weightLbs)
                  ? `${lbsToKgRounded(toNumber(formik.values.weightLbs))} kg`
                  : null
              }
            />
          )}
        </Grid>
      </Grid>

      <Divider light sx={{ margin: "24px 0" }} />

      <Typography variant="h5" component="h1" sx={{ marginBottom: 2 }}>
        Calories
      </Typography>

      <CalorieCalculator
        biologicalSex={formik.values.biologicalSex}
        weightKgs={
          isNumber(formik.values.weightLbs)
            ? lbsToKg(toNumber(formik.values.weightLbs))
            : null
        }
        heightCms={
          isNumber(formik.values.heightFeet) &&
          isNumber(formik.values.weightLbs)
            ? feetAndInchesToCm(
                toNumber(formik.values.heightFeet),
                toNumber(formik.values.heightInches)
              )
            : null
        }
        age={isNumber(formik.values.age) ? toNumber(formik.values.age) : null}
        leanBodyMassKgs={
          isNumber(formik.values.leanBodyMassLbs)
            ? lbsToKg(toNumber(formik.values.leanBodyMassLbs))
            : null
        }
        goal={formik.values.goal}
        goalWeightKgs={
          isNumber(formik.values.goalWeightLbs)
            ? lbsToKg(toNumber(formik.values.goalWeightLbs))
            : null
        }
        setTargetCalories={setTargetCalories}
      />
      {isNumber(targetCalories) && isNumber(formik.values.weightLbs) ? (
        <>
          <Divider light sx={{ margin: "24px 0" }} />

          <Typography variant="h5" component="h1" sx={{ marginBottom: 2 }}>
            Macronutrients
          </Typography>

          <MacroCalculator
            targetCalories={toNumber(targetCalories)}
            bodyWeightKgs={lbsToKg(toNumber(formik.values.weightLbs))}
          ></MacroCalculator>
        </>
      ) : null}
    </form>
  );
};

export default NutritionForm;
