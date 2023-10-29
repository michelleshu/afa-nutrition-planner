import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";

import { BLUE, GREEN, ORANGE, PURPLE, RED, YELLOW } from "../colors";
import {
  VEGETABLE_SERVING,
  FRUIT_SERVING,
  GRAIN_SERVING,
  LEAN_PROTEIN_SERVING,
  DAIRY_SERVING,
  FAT_SERVING,
  MACRO_TOLERANCE,
  CALORIE_TOLERANCE,
} from "../constants";
import { getDailyPortionTemplate } from "../util/daily_portion_templates";
import { toNumberOrNull } from "../util/validations";

const DailyPortionsCalculator = ({
  proteinGrams,
  carbGrams,
  fatGrams,
  updateFruitServings,
  updateGrainServings,
  updateProteinServings,
  updateFatServings,
  updateDairyServings,
}: {
  proteinGrams: number;
  carbGrams: number;
  fatGrams: number;
  updateFruitServings: (servings: number | null) => void;
  updateGrainServings: (servings: number | null) => void;
  updateProteinServings: (servings: number | null) => void;
  updateFatServings: (servings: number | null) => void;
  updateDairyServings: (servings: number | null) => void;
}) => {
  const targetCalories = proteinGrams * 4 + carbGrams * 4 + fatGrams * 9;
  const dailyPortionTemplate = getDailyPortionTemplate(targetCalories);

  const [vegetableServings, setVegetableServings] = useState(
    dailyPortionTemplate.vegetableServings
  );
  const [fruitServings, setFruitServings] = useState(
    dailyPortionTemplate.fruitServings
  );
  const [grainServings, setGrainServings] = useState(
    dailyPortionTemplate.grainServings
  );
  const [leanProteinServings, setLeanProteinServings] = useState(
    dailyPortionTemplate.leanProteinServings
  );
  const [fatServings, setFatServings] = useState(
    dailyPortionTemplate.fatServings
  );
  const [dairyServings, setDairyServings] = useState(
    dailyPortionTemplate.dairyServings
  );

  useEffect(() => {
    setVegetableServings(dailyPortionTemplate.vegetableServings);
    setFruitServings(dailyPortionTemplate.fruitServings);
    setGrainServings(dailyPortionTemplate.grainServings);
    setLeanProteinServings(dailyPortionTemplate.leanProteinServings);
    setFatServings(dailyPortionTemplate.fatServings);
    setDairyServings(dailyPortionTemplate.dairyServings);

    updateFruitServings(dailyPortionTemplate.fruitServings);
    updateGrainServings(dailyPortionTemplate.grainServings);
    updateProteinServings(dailyPortionTemplate.leanProteinServings);
    updateFatServings(dailyPortionTemplate.fatServings);
    updateDairyServings(dailyPortionTemplate.dairyServings);
  }, [dailyPortionTemplate]);

  const totalProteinGrams = () =>
    VEGETABLE_SERVING.proteinGrams * vegetableServings +
    FRUIT_SERVING.proteinGrams * fruitServings +
    GRAIN_SERVING.proteinGrams * grainServings +
    LEAN_PROTEIN_SERVING.proteinGrams * leanProteinServings +
    FAT_SERVING.proteinGrams * fatServings +
    DAIRY_SERVING.proteinGrams * dairyServings;

  const totalCarbGrams = () =>
    VEGETABLE_SERVING.carbGrams * vegetableServings +
    FRUIT_SERVING.carbGrams * fruitServings +
    GRAIN_SERVING.carbGrams * grainServings +
    LEAN_PROTEIN_SERVING.carbGrams * leanProteinServings +
    FAT_SERVING.carbGrams * fatServings +
    DAIRY_SERVING.carbGrams * dairyServings;

  const totalFatGrams = () =>
    VEGETABLE_SERVING.fatGrams * vegetableServings +
    FRUIT_SERVING.fatGrams * fruitServings +
    GRAIN_SERVING.fatGrams * grainServings +
    LEAN_PROTEIN_SERVING.fatGrams * leanProteinServings +
    FAT_SERVING.fatGrams * fatServings +
    DAIRY_SERVING.fatGrams * dairyServings;

  const totalCalories = () =>
    VEGETABLE_SERVING.calories * vegetableServings +
    FRUIT_SERVING.calories * fruitServings +
    GRAIN_SERVING.calories * grainServings +
    LEAN_PROTEIN_SERVING.calories * leanProteinServings +
    FAT_SERVING.calories * fatServings +
    DAIRY_SERVING.calories * dairyServings;

  const handleVegetableServingsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = toNumberOrNull(event.target.value);
    if (typeof value === "number") {
      setVegetableServings(value);
    }
  };

  const handleFruitServingsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = toNumberOrNull(event.target.value);
    if (typeof value === "number") {
      setFruitServings(value);
      updateFruitServings(value);
    }
  };

  const handleGrainServingsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = toNumberOrNull(event.target.value);
    if (typeof value === "number") {
      setGrainServings(value);
      updateGrainServings(value);
    }
  };

  const handleLeanProteinServingsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = toNumberOrNull(event.target.value);
    if (typeof value === "number") {
      setLeanProteinServings(value);
      updateProteinServings(value);
    }
  };

  const handleFatServingsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = toNumberOrNull(event.target.value);
    if (typeof value === "number") {
      setFatServings(value);
      updateFatServings(value);
    }
  };

  const handleDairyServingsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = toNumberOrNull(event.target.value);
    if (typeof value === "number") {
      setDairyServings(value);
      updateDairyServings(value);
    }
  };

  return (
    <Grid
      container
      alignItems="flex-end"
      justifyContent="space-between"
      spacing={4}
      sx={{
        "margin": "30px auto",
        "--Grid-borderWidth": "1px",
        "borderTop": "var(--Grid-borderWidth) solid",
        "borderColor": "divider",
        "& > div": {
          "borderRight": "var(--Grid-borderWidth) solid",
          "borderBottom": "var(--Grid-borderWidth) solid",
          "borderColor": "divider",
          "&:nth-of-type(6n)": {
            borderRight: "none",
          },
        },
      }}
    >
      <Grid xs={2} sx={{ height: 64 }}></Grid>
      <Grid xs={2}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: "normal", textAlign: "right" }}
        >
          Servings
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: "normal", textAlign: "right" }}
        >
          Protein (g)
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: "normal", textAlign: "right" }}
        >
          Carbs (g)
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: "normal", textAlign: "right" }}
        >
          Fats (g)
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ borderRight: "none", fontWeight: "normal", textAlign: "right" }}
        >
          Calories
        </Typography>
      </Grid>

      <Grid xs={2}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ color: GREEN, height: "56px", lineHeight: "56px" }}
        >
          Vegetables
        </Typography>
      </Grid>
      <Grid xs={2}>
        <TextField
          id="vegetableServings"
          name="vegetableServings"
          type="number"
          value={vegetableServings}
          onChange={handleVegetableServingsChange}
          sx={{ float: "right", width: "80px" }}
        />
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {VEGETABLE_SERVING.proteinGrams * vegetableServings}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {VEGETABLE_SERVING.carbGrams * vegetableServings}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {VEGETABLE_SERVING.fatGrams * vegetableServings}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {VEGETABLE_SERVING.calories * vegetableServings}
        </Typography>
      </Grid>

      <Grid xs={2}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ color: BLUE, height: "56px", lineHeight: "56px" }}
        >
          Fruits
        </Typography>
      </Grid>
      <Grid xs={2}>
        <TextField
          id="fruitServings"
          name="fruitServings"
          type="number"
          value={fruitServings}
          onChange={handleFruitServingsChange}
          sx={{ float: "right", width: "80px" }}
        />
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {FRUIT_SERVING.proteinGrams * fruitServings}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {FRUIT_SERVING.carbGrams * fruitServings}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {FRUIT_SERVING.fatGrams * fruitServings}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {FRUIT_SERVING.calories * fruitServings}
        </Typography>
      </Grid>

      <Grid xs={2}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ color: YELLOW, height: "56px", lineHeight: "56px" }}
        >
          Grains
        </Typography>
      </Grid>
      <Grid xs={2}>
        <TextField
          id="grainServings"
          name="grainServings"
          type="number"
          value={grainServings}
          onChange={handleGrainServingsChange}
          sx={{ float: "right", width: "80px" }}
        />
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {GRAIN_SERVING.proteinGrams * grainServings}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {GRAIN_SERVING.carbGrams * grainServings}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {GRAIN_SERVING.fatGrams * grainServings}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {GRAIN_SERVING.calories * grainServings}
        </Typography>
      </Grid>

      <Grid xs={2}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ color: RED, height: "56px", lineHeight: "56px" }}
        >
          Lean Protein
        </Typography>
      </Grid>
      <Grid xs={2}>
        <TextField
          id="leanProteinServings"
          name="leanProteinServings"
          type="number"
          value={leanProteinServings}
          onChange={handleLeanProteinServingsChange}
          sx={{ float: "right", width: "80px" }}
        />
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {LEAN_PROTEIN_SERVING.proteinGrams * leanProteinServings}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {LEAN_PROTEIN_SERVING.carbGrams * leanProteinServings}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {LEAN_PROTEIN_SERVING.fatGrams * leanProteinServings}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {LEAN_PROTEIN_SERVING.calories * leanProteinServings}
        </Typography>
      </Grid>

      <Grid xs={2}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ color: ORANGE, height: "56px", lineHeight: "56px" }}
        >
          Fats
        </Typography>
      </Grid>
      <Grid xs={2}>
        <TextField
          id="fatServings"
          name="fatServings"
          type="number"
          value={fatServings}
          onChange={handleFatServingsChange}
          sx={{ float: "right", width: "80px" }}
        />
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {FAT_SERVING.proteinGrams * fatServings}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {FAT_SERVING.carbGrams * fatServings}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {FAT_SERVING.fatGrams * fatServings}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {FAT_SERVING.calories * fatServings}
        </Typography>
      </Grid>

      <Grid xs={2}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ color: PURPLE, height: "56px", lineHeight: "56px" }}
        >
          Dairy
        </Typography>
      </Grid>
      <Grid xs={2}>
        <TextField
          id="dairyServings"
          name="dairyServings"
          type="number"
          value={dairyServings}
          onChange={handleDairyServingsChange}
          sx={{ float: "right", width: "80px" }}
        />
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {DAIRY_SERVING.proteinGrams * dairyServings}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {DAIRY_SERVING.carbGrams * dairyServings}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {DAIRY_SERVING.fatGrams * dairyServings}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "56px", lineHeight: "56px", textAlign: "right" }}
        >
          {DAIRY_SERVING.calories * dairyServings}
        </Typography>
      </Grid>

      <Grid xs={2} height={64}></Grid>
      <Grid xs={2}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ height: "32px", lineHeight: "32px" }}
        >
          Totals
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{
            color:
              Math.abs(totalProteinGrams() - proteinGrams) <= MACRO_TOLERANCE
                ? GREEN
                : RED,
            fontWeight: "bold",
            height: "32px",
            lineHeight: "32px",
            textAlign: "right",
          }}
        >
          {totalProteinGrams()}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{
            color:
              Math.abs(totalCarbGrams() - carbGrams) <= MACRO_TOLERANCE
                ? GREEN
                : RED,
            fontWeight: "bold",
            height: "32px",
            lineHeight: "32px",
            textAlign: "right",
          }}
        >
          {totalCarbGrams()}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{
            color:
              Math.abs(totalFatGrams() - fatGrams) <= MACRO_TOLERANCE
                ? GREEN
                : RED,
            fontWeight: "bold",
            height: "32px",
            lineHeight: "32px",
            textAlign: "right",
          }}
        >
          {totalFatGrams()}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{
            color:
              Math.abs(totalCalories() - targetCalories) <= CALORIE_TOLERANCE
                ? GREEN
                : RED,
            fontWeight: "bold",
            height: "32px",
            lineHeight: "32px",
            textAlign: "right",
          }}
        >
          {totalCalories()}
        </Typography>
      </Grid>

      <Grid xs={2} height={64}></Grid>
      <Grid xs={2}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ height: "32px", lineHeight: "32px" }}
        >
          Targets
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "32px", lineHeight: "32px", textAlign: "right" }}
        >
          {proteinGrams}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "32px", lineHeight: "32px", textAlign: "right" }}
        >
          {carbGrams}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "32px", lineHeight: "32px", textAlign: "right" }}
        >
          {fatGrams}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography
          variant="body1"
          sx={{ height: "32px", lineHeight: "32px", textAlign: "right" }}
        >
          {targetCalories}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DailyPortionsCalculator;
