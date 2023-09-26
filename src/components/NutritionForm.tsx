import React, { useState } from "react";
import { FormLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Unstable_Grid2";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";

import { lbsToKgRounded } from "../util/conversions";

const NutritionForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
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
    goal === "Lose weight" || goal === "Gain weight";

  const [goal, setGoal] = useState("");
  const handleGoalChange = (event: SelectChangeEvent) => {
    setGoal(event.target.value as string);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={4}>
        <Grid xs={6}>
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
        <Grid xs={6}>
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
              id="goal-select"
              value={goal}
              onChange={handleGoalChange}
            >
              <MenuItem value={""}></MenuItem>
              <MenuItem value="Lose weight">Lose weight</MenuItem>
              <MenuItem value="Gain weight">Gain weight</MenuItem>
              <MenuItem value="Maintain weight">Maintain weight</MenuItem>
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
    </form>
  );
};

export default NutritionForm;
