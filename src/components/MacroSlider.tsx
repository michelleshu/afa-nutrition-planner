import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

const MacroSlider = (color: string) =>
  styled(Slider)({
    "color": color,
    "height": 8,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      "height": 18,
      "width": 18,
      "backgroundColor": "#FFFFFF",
      "border": "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      "lineHeight": 1.2,
      "fontSize": 14,
      "background": "unset",
      "padding": 0,
      "width": 48,
      "height": 48,
      "borderRadius": "50% 50% 50% 0",
      "backgroundColor": color,
      "transformOrigin": "bottom left",
      "transform": "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&:before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
  });

const RedMacroSlider = MacroSlider("#d63031");
const YellowMacroSlider = MacroSlider("#fba403");
const GreenMacroSlider = MacroSlider("#00b894");

export { RedMacroSlider, YellowMacroSlider, GreenMacroSlider };
