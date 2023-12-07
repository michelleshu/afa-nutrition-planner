import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import "./App.css";
import { AFA_DARK_BLUE } from "./nutrition-planner/colors";
import NutritionForm from "./nutrition-planner/components/NutritionForm";
import HorizontalLogo from "./images/AFA-horizontal-logo.png";
import { Typography } from "@mui/material";

function App() {
  return (
    <Box
      className="nutrition-planner"
      sx={{
        flexGrow: 1,
        margin: "60px auto",
        width: "900px",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="36px"
        spacing={4}
      >
        <Typography variant="h2" component="h1" sx={{ color: AFA_DARK_BLUE }}>
          Nutrition Planner
        </Typography>
        <img
          className="HorizontalLogo"
          src={HorizontalLogo}
          alt="Air Force Academy Logo"
        />
      </Stack>

      <NutritionForm />
    </Box>
  );
}

export default App;
