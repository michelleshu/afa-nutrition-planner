import React, { useEffect, useState } from "react";
import { FormLabel, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { BMR_METHOD } from "../constants";
import {
  getBMRMifflinStJeor,
  getBMRHarrisBenedict,
  getBMRKatchMcArdle,
} from "../util/bmr_estimations";

const TDEECalculator = ({
  biologicalSex,
  weightKgs,
  heightCms,
  age,
  leanBodyMassKgs,
}: {
  biologicalSex: "Male" | "Female" | null;
  weightKgs: number | null;
  heightCms: number | null;
  age: number | null;
  leanBodyMassKgs: number | null;
}) => {
  const [bmrMethod, setBmrMethod] = useState<string>(
    BMR_METHOD.MIFFLIN_ST_JEOR
  );
  const [estimatedBmr, setEstimatedBmr] = useState<number | null>(null);

  const computeEstimatedBmr = () => {
    if (!(biologicalSex && weightKgs && heightCms && age)) {
      return null;
    } else {
      switch (bmrMethod) {
        case BMR_METHOD.MIFFLIN_ST_JEOR:
          return getBMRMifflinStJeor({
            biologicalSex,
            weightKgs,
            heightCms,
            age,
          });
        case BMR_METHOD.HARRIS_BENEDICT:
          return getBMRHarrisBenedict({
            biologicalSex,
            weightKgs,
            heightCms,
            age,
          });
        case BMR_METHOD.KATCH_MCARDLE:
          return getBMRKatchMcArdle({
            leanBodyMassKgs,
            biologicalSex,
            weightKgs,
            heightCms,
          });
        default:
          return null;
      }
    }
  };

  useEffect(() => {
    setEstimatedBmr(computeEstimatedBmr());
  }, [biologicalSex, weightKgs, heightCms, age, leanBodyMassKgs]);

  const handleBmrMethodChange = (event: SelectChangeEvent) => {
    setBmrMethod(event.target.value);
    computeEstimatedBmr();
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
              key={BMR_METHOD.MIFFLIN_ST_JEOR}
              value={BMR_METHOD.MIFFLIN_ST_JEOR}
            >
              {BMR_METHOD.MIFFLIN_ST_JEOR}
            </MenuItem>
            <MenuItem
              key={BMR_METHOD.HARRIS_BENEDICT}
              value={BMR_METHOD.HARRIS_BENEDICT}
            >
              {BMR_METHOD.HARRIS_BENEDICT}
            </MenuItem>
            <MenuItem
              key={BMR_METHOD.KATCH_MCARDLE}
              value={BMR_METHOD.KATCH_MCARDLE}
            >
              {BMR_METHOD.KATCH_MCARDLE}
            </MenuItem>
          </Select>
        </FormControl>
        <div>
          <Typography variant="h6" component="h2">
            Estimated BMR
          </Typography>{" "}
          <Typography variant="h6" component="h2">
            Estimated BMR
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default TDEECalculator;
