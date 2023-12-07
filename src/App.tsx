import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import NutritionPlanner from "./nutrition-planner/NutritionPlanner";
import TrainingTables from "./training-tables/TrainingTables";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    "id": `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="Navigation Tabs"
        >
          <Tab label="Nutrition Planner" {...a11yProps(0)}></Tab>
          <Tab label="Training Tables" {...a11yProps(1)}></Tab>
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <NutritionPlanner />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <TrainingTables />
      </TabPanel>
    </Box>
  );
}

export default App;
