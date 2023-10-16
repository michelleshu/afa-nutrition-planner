import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { LIGHT_GRAY, BLUE, GREEN, RED, YELLOW } from "../colors";
import {
  BlueMacroSlider,
  RedMacroSlider,
  YellowMacroSlider,
} from "./MacroSlider";

const CALORIE_TARGET_TOLERANCE = 50;

const MacroCalculator = ({
  targetCalories,
  bodyWeightKgs,
  updateProteinGrams,
  updateCarbGrams,
  updateFatGrams,
}: {
  targetCalories: number;
  bodyWeightKgs: number;
  updateProteinGrams: (proteinGrams: number) => void;
  updateFatGrams: (proteinGrams: number) => void;
  updateCarbGrams: (proteinGrams: number) => void;
}) => {
  const minimumProteinGrams = Math.round(0.8 * bodyWeightKgs);
  const maximumProteinGrams = Math.round(2.4 * bodyWeightKgs);
  const minimumFatGrams = Math.round((targetCalories * 0.2) / 9);
  const maximumFatGrams = Math.round((targetCalories * 0.6) / 9);
  const minimumCarbGrams = Math.round((targetCalories * 0.2) / 4);
  const maximumCarbGrams = Math.round(
    (targetCalories - minimumFatGrams * 9 - minimumProteinGrams * 4) / 4
  );

  const initialProteinGrams = Math.round(1.6 * bodyWeightKgs);
  const initialFatGrams = Math.round((targetCalories * 0.3) / 9);
  const initialCarbGrams = Math.round(
    (targetCalories - initialProteinGrams * 4 - initialFatGrams * 9) / 4
  );

  const [proteinGrams, setProteinGrams] = useState(initialProteinGrams);
  const [carbGrams, setCarbGrams] = useState(initialCarbGrams);
  const [fatGrams, setFatGrams] = useState(initialFatGrams);

  useEffect(() => {
    setProteinGrams(initialProteinGrams);
    updateProteinGrams(initialProteinGrams);
  }, [initialProteinGrams]);
  useEffect(() => {
    setCarbGrams(initialCarbGrams);
    updateCarbGrams(initialCarbGrams);
  }, [initialCarbGrams]);
  useEffect(() => {
    setFatGrams(initialFatGrams);
    updateFatGrams(initialFatGrams);
  }, [initialFatGrams]);

  const handleProteinGramsChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    if (typeof newValue === "number") {
      setProteinGrams(newValue);
      updateProteinGrams(newValue);
    }
  };

  const handleCarbGramsChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setCarbGrams(newValue);
      updateCarbGrams(newValue);
    }
  };

  const handleFatGramsChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setFatGrams(newValue);
      updateFatGrams(newValue);
    }
  };

  const totalCalories = () => proteinGrams * 4 + carbGrams * 4 + fatGrams * 9;
  const totalCaloriesColor = () => {
    if (
      Math.abs(totalCalories() - targetCalories) <= CALORIE_TARGET_TOLERANCE
    ) {
      return GREEN;
    } else {
      return RED;
    }
  };

  const macroSliderValueLabelFormat = (value: number) => `${value} g`;

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      columnSpacing={4}
      rowSpacing={2}
    >
      <Grid xs={2}>
        <Typography variant="h6" component="h2" sx={{ color: RED }}>
          Protein
        </Typography>
      </Grid>
      <Grid xs={4}>
        <RedMacroSlider
          aria-label="Protein Slider"
          min={minimumProteinGrams}
          max={maximumProteinGrams}
          value={proteinGrams}
          valueLabelDisplay="on"
          valueLabelFormat={macroSliderValueLabelFormat}
          onChange={handleProteinGramsChange}
          sx={{ marginTop: 4, marginBottom: 3 }}
        />
      </Grid>
      <Grid xs={2}>
        <Typography variant="body1" sx={{ textAlign: "right" }}>
          {proteinGrams * 4} cal
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography variant="body1" sx={{ textAlign: "right" }}>
          {Math.round((proteinGrams * 10) / bodyWeightKgs) / 10} g/kg BW
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ color: RED, fontWeight: "bold", textAlign: "right" }}
        >
          {Math.round((proteinGrams * 400) / totalCalories())}%
        </Typography>
      </Grid>

      <Grid xs={2}>
        <Typography variant="h6" component="h2" sx={{ color: YELLOW }}>
          Carbs
        </Typography>
      </Grid>
      <Grid xs={4}>
        <YellowMacroSlider
          aria-label="Carbohydrate Slider"
          min={minimumCarbGrams}
          max={maximumCarbGrams}
          value={carbGrams}
          valueLabelDisplay="on"
          valueLabelFormat={macroSliderValueLabelFormat}
          onChange={handleCarbGramsChange}
          sx={{ marginTop: 4, marginBottom: 3 }}
        />
      </Grid>
      <Grid xs={2}>
        <Typography variant="body1" sx={{ textAlign: "right" }}>
          {carbGrams * 4} cal
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography variant="body1" sx={{ textAlign: "right" }}>
          {Math.round((carbGrams * 10) / bodyWeightKgs) / 10} g/kg BW
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ color: YELLOW, fontWeight: "bold", textAlign: "right" }}
        >
          {Math.round((carbGrams * 400) / totalCalories())}%
        </Typography>
      </Grid>

      <Grid xs={2}>
        <Typography variant="h6" component="h2" sx={{ color: BLUE }}>
          Fats
        </Typography>
      </Grid>
      <Grid xs={4}>
        <BlueMacroSlider
          aria-label="Fats Slider"
          min={minimumFatGrams}
          max={maximumFatGrams}
          value={fatGrams}
          valueLabelDisplay="on"
          valueLabelFormat={macroSliderValueLabelFormat}
          onChange={handleFatGramsChange}
          sx={{ marginTop: 4, marginBottom: 3 }}
        />
      </Grid>
      <Grid xs={2}>
        <Typography variant="body1" sx={{ textAlign: "right" }}>
          {fatGrams * 9} cal
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography variant="body1" sx={{ textAlign: "right" }}>
          {Math.round((fatGrams * 10) / bodyWeightKgs) / 10} g/kg BW
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ color: BLUE, fontWeight: "bold", textAlign: "right" }}
        >
          {Math.round((fatGrams * 900) / totalCalories())}%
        </Typography>
      </Grid>

      <Grid xs={6}></Grid>
      <Grid
        xs={2}
        sx={{
          "--Grid-borderWidth": "1px",
          "borderTop": "var(--Grid-borderWidth) solid",
          "borderColor": "divider",
          "paddingY": 4,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: totalCaloriesColor(),
            fontWeight: "bold",
            textAlign: "right",
          }}
        >
          {totalCalories()} cal
        </Typography>
      </Grid>
      <Grid
        xs={4}
        sx={{
          "--Grid-borderWidth": "1px",
          "borderTop": "var(--Grid-borderWidth) solid",
          "borderColor": "divider",
          "paddingY": 4,
        }}
      >
        <Typography variant="body1">
          (Target: {Math.round(targetCalories)} cal)
        </Typography>
      </Grid>
      <Grid xs={2}></Grid>
      <Grid xs={2}></Grid>
    </Grid>
  );
};

export default MacroCalculator;
