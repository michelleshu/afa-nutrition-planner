import React from "react";
import { FormLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Unstable_Grid2";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";

import { BIOLOGICAL_SEX, GOAL } from "../constants";
import {
  feetAndInchesToCm,
  feetAndInchesToCmRounded,
  lbsToKg,
  lbsToKgRounded,
} from "../util/conversions";
import TDEECalculator from "./TDEECalculator";

const NutritionForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      biologicalSex: null,
      age: null,
      heightFeet: null,
      heightInches: null,
      weightLbs: null,
      leanBodyMassLbs: null,
      goal: "",
      goalWeightLbs: null,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const goalInvolvesWeightChange = () =>
    formik.values.goal === GOAL.LOSE_WEIGHT ||
    formik.values.goal === GOAL.GAIN_WEIGHT;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={4}>
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
                formik.values.heightFeet && formik.values.heightInches
                  ? `${feetAndInchesToCmRounded(
                      formik.values.heightFeet,
                      formik.values.heightInches
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
              formik.values.weightLbs
                ? `${lbsToKgRounded(formik.values.weightLbs)} kg`
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
              formik.values.leanBodyMassLbs
                ? `${lbsToKgRounded(formik.values.leanBodyMassLbs)} kg`
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
              <MenuItem key={""} value={""}></MenuItem>
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
                formik.values.goalWeightLbs
                  ? `${lbsToKgRounded(formik.values.goalWeightLbs)} kg`
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
                formik.values.weightLbs
                  ? `${lbsToKgRounded(formik.values.weightLbs)} kg`
                  : null
              }
            />
          )}
        </Grid>
      </Grid>

      <TDEECalculator
        biologicalSex={formik.values.biologicalSex}
        weightKgs={lbsToKg(formik.values.weightLbs)}
        heightCms={feetAndInchesToCm(
          formik.values.heightFeet,
          formik.values.heightInches
        )}
        age={formik.values.age}
        leanBodyMassKgs={lbsToKg(formik.values.leanBodyMassLbs)}
      />
    </form>
  );
};

export default NutritionForm;
