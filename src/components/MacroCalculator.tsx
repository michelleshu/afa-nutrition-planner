import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {
  RedMacroSlider,
  YellowMacroSlider,
  GreenMacroSlider,
} from "./MacroSlider";
const MacroCalculator = ({
  targetCalories,
  bodyWeightKgs,
}: {
  targetCalories: number;
  bodyWeightKgs: number;
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
  }, [initialProteinGrams]);
  useEffect(() => {
    setCarbGrams(initialCarbGrams);
  }, [initialCarbGrams]);
  useEffect(() => {
    setFatGrams(initialFatGrams);
  }, [initialFatGrams]);

  const handleProteinGramsChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    if (typeof newValue === "number") {
      setProteinGrams(newValue);
    }
  };

  const handleCarbGramsChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setCarbGrams(newValue);
    }
  };

  const handleFatGramsChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setFatGrams(newValue);
    }
  };

  const totalCalories = () => proteinGrams * 4 + carbGrams * 4 + fatGrams * 9;

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
        <Typography variant="h6" component="h2" sx={{ color: "#d63031" }}>
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
      <Grid container xs={2} alignItems="center" justifyContent="flex-end">
        <Typography variant="body1">{proteinGrams * 4} cal</Typography>
      </Grid>
      <Grid container xs={2} alignItems="center" justifyContent="flex-end">
        <Typography variant="body1">
          {Math.round((proteinGrams * 10) / bodyWeightKgs) / 10} g/kg BW
        </Typography>
      </Grid>
      <Grid container xs={2} alignItems="center" justifyContent="flex-end">
        <Typography variant="body1">
          {Math.round((proteinGrams * 400) / totalCalories())}%
        </Typography>
      </Grid>

      <Grid xs={2}>
        <Typography variant="h6" component="h2" sx={{ color: "#fba403" }}>
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
      <Grid container xs={2} alignItems="center" justifyContent="flex-end">
        <Typography variant="body1">{carbGrams * 4} cal</Typography>
      </Grid>
      <Grid container xs={2} alignItems="center" justifyContent="flex-end">
        <Typography variant="body1">
          {Math.round((carbGrams * 10) / bodyWeightKgs) / 10} g/kg BW
        </Typography>
      </Grid>
      <Grid container xs={2} alignItems="center" justifyContent="flex-end">
        <Typography variant="body1">
          {Math.round((carbGrams * 400) / totalCalories())}%
        </Typography>
      </Grid>

      <Grid xs={2}>
        <Typography variant="h6" component="h2" sx={{ color: "#00b894" }}>
          Fats
        </Typography>
      </Grid>
      <Grid xs={4}>
        <GreenMacroSlider
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
      <Grid container xs={2} alignItems="center" justifyContent="flex-end">
        <Typography variant="body1">{fatGrams * 9} cal</Typography>
      </Grid>
      <Grid container xs={2} alignItems="center" justifyContent="flex-end">
        <Typography variant="body1">
          {Math.round((fatGrams * 10) / bodyWeightKgs) / 10} g/kg BW
        </Typography>
      </Grid>
      <Grid container xs={2} alignItems="center" justifyContent="flex-end">
        <Typography variant="body1">
          {Math.round((fatGrams * 900) / totalCalories())}%
        </Typography>
      </Grid>

      <Grid xs={6}></Grid>
      <Grid
        container
        xs={2}
        justifyContent="flex-end"
        sx={{ borderColor: "#2d3436", borderTop: 2, paddingY: 4 }}
      >
        <Typography variant="body1">{totalCalories()} cal</Typography>
      </Grid>
      <Grid xs={2}></Grid>
      <Grid xs={2}></Grid>
    </Grid>
  );
};

export default MacroCalculator;
