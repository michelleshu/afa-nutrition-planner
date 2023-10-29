import moment from "moment";
import {
  HIGHLIGHT_BOX_HEIGHT,
  HIGHLIGHT_BOX_WIDTH,
  HIGHLIGHT_BOX_VERTICAL_MARGIN,
  HORIZONTAL_MARGIN,
  PAGE_WIDTH,
  GOAL_BOX_HEIGHT,
  PORTION_IMAGE_HEIGHT,
  PORTION_IMAGE_WIDTH,
  SERVING_INFO_X,
  SERVING_LINE_MARGIN,
  NOTES_BOX_HEIGHT,
  MACRONUTRIENT_CELL_WIDTH,
  SERVINGS_CELL_WIDTH,
} from "./pdf_constants";
import {
  PDFFont,
  PDFImage,
  PDFPage,
  TextAlignment,
  layoutMultilineText,
  rgb,
} from "pdf-lib";

import {
  VEGETABLE_SERVING,
  FRUIT_SERVING,
  GRAIN_SERVING,
  LEAN_PROTEIN_SERVING,
  DAIRY_SERVING,
  FAT_SERVING,
} from "../constants";
import { lbsToKg } from "../util/conversions";

export const getFilePrefix = (cadetName: string) => {
  const nameNoSpaces = cadetName.replace(/\s/g, "");
  const formattedMonth = moment().format("MMMYYYY");
  return `${nameNoSpaces}_${formattedMonth}`;
};

export const drawDividerLine = ({ y, page }: { y: number; page: PDFPage }) => {
  page.drawLine({
    start: { x: HORIZONTAL_MARGIN, y },
    end: { x: PAGE_WIDTH - HORIZONTAL_MARGIN, y },
    thickness: 1,
    color: rgb(0.9, 0.9, 0.9),
  });
};

export const generateHeader = ({
  left,
  right,
  top,
  page,
  helvetica,
  helveticaBold,
  logo,
  cadetName,
}: {
  left: number;
  right: number;
  top: number;
  page: PDFPage;
  helvetica: PDFFont;
  helveticaBold: PDFFont;
  logo: PDFImage;
  cadetName: string;
}) => {
  const titleFontSize = 16;
  const subtitleFontSize = 12;
  const lineGap = 8;
  const titlePrefix = "Nutrition Report for ";
  const logoHeight = 36;
  const logoWidth = 140;

  const titlePrefixWidth = helvetica.widthOfTextAtSize(
    titlePrefix,
    titleFontSize
  );
  const titleHeight = helvetica.heightAtSize(titleFontSize, {
    descender: true,
  });

  const datePrefix = "Prepared on ";

  const datePrefixWidth = helvetica.widthOfTextAtSize(
    datePrefix,
    subtitleFontSize
  );
  const dateHeight = helvetica.heightAtSize(subtitleFontSize, {
    descender: true,
  });

  const formattedDate = moment().format("MMM D, YYYY");

  page.drawText(titlePrefix, {
    x: left,
    y: top - titleHeight,
    size: titleFontSize,
    font: helvetica,
  });

  page.drawText(cadetName, {
    x: left + titlePrefixWidth,
    y: top - titleHeight,
    size: titleFontSize,
    font: helveticaBold,
  });

  page.drawText(datePrefix, {
    x: left,
    y: top - titleHeight - lineGap - dateHeight,
    size: subtitleFontSize,
    font: helvetica,
  });

  page.drawText(formattedDate, {
    x: left + datePrefixWidth,
    y: top - titleHeight - lineGap - dateHeight,
    size: subtitleFontSize,
    font: helvetica,
  });

  page.drawImage(logo, {
    x: right - logoWidth,
    y: top - logoHeight,
    height: logoHeight,
    width: logoWidth,
  });

  return Math.max(logoHeight, titleHeight + lineGap + dateHeight);
};

export const generateHighlightBox = ({
  top,
  left,
  label,
  value,
  subtext,
  page,
  helvetica,
  helveticaBold,
}: {
  top: number;
  left: number;
  label: string;
  value: string;
  subtext?: string;
  page: PDFPage;
  helvetica: PDFFont;
  helveticaBold: PDFFont;
}) => {
  const boxColor = rgb(0.9, 0.9, 0.9);

  const labelSize = 12;
  const labelHeight = helvetica.heightAtSize(labelSize);
  const labelWidth = helvetica.widthOfTextAtSize(label, labelSize);
  const labelX = Math.round(left + HIGHLIGHT_BOX_WIDTH / 2 - labelWidth / 2);

  const boxY =
    top - labelHeight - HIGHLIGHT_BOX_VERTICAL_MARGIN - HIGHLIGHT_BOX_HEIGHT;

  const valueSize = 18;
  const valueHeight = helveticaBold.heightAtSize(18);
  const valueWidth = helveticaBold.widthOfTextAtSize(value, valueSize);
  const valueX = Math.round(left + HIGHLIGHT_BOX_WIDTH / 2 - valueWidth / 2);
  const valueY = Math.round(boxY + HIGHLIGHT_BOX_HEIGHT / 2 - valueHeight / 2);

  const subtextSize = 12;
  const subtextHeight = helvetica.heightAtSize(subtextSize);

  page.drawText(label, {
    x: labelX,
    y: top - labelHeight,
    size: labelSize,
    font: helvetica,
  });

  page.drawRectangle({
    x: left,
    y: boxY,
    width: HIGHLIGHT_BOX_WIDTH,
    height: HIGHLIGHT_BOX_HEIGHT,
    color: boxColor,
  });

  page.drawText(value, {
    x: valueX,
    y: valueY,
    size: valueSize,
    font: helveticaBold,
  });

  if (subtext) {
    const subtextWidth = helvetica.widthOfTextAtSize(subtext, subtextSize);
    const subtextX = Math.round(
      left + HIGHLIGHT_BOX_WIDTH / 2 - subtextWidth / 2
    );

    page.drawText(subtext, {
      x: subtextX,
      y: boxY - HIGHLIGHT_BOX_VERTICAL_MARGIN - subtextHeight,
      size: subtextSize,
      font: helvetica,
    });
  }

  let height =
    labelHeight + HIGHLIGHT_BOX_VERTICAL_MARGIN + HIGHLIGHT_BOX_HEIGHT;

  if (subtext) {
    height += HIGHLIGHT_BOX_VERTICAL_MARGIN + subtextHeight;
  }

  return height;
};

export const generateGoalsBox = ({
  top,
  left,
  goalText,
  page,
  helvetica,
  helveticaBold,
}: {
  top: number;
  left: number;
  goalText: string;
  page: PDFPage;
  helvetica: PDFFont;
  helveticaBold: PDFFont;
}) => {
  const goalLabelSize = 12;
  const goalLabelHeight = helveticaBold.heightAtSize(goalLabelSize);

  const goalBoxWidth = PAGE_WIDTH - 2 * HORIZONTAL_MARGIN;
  const goalBoxHeight = GOAL_BOX_HEIGHT;
  const goalBoxMargin = 8;
  const goalBoxPadding = 10;
  const goalBoxBorderWidth = 1;
  const goalTextSize = 14;
  const goalTextLineWidth = goalBoxWidth - 2 * goalBoxPadding;
  const goalTextHeight = goalBoxHeight - 2 * goalBoxPadding;

  const goalTextX = left + goalBoxBorderWidth + goalBoxPadding;
  const goalTextY =
    top - goalLabelHeight - goalBoxMargin - goalBoxHeight + goalBoxPadding;

  const { lines } = layoutMultilineText(goalText, {
    alignment: TextAlignment.Left,
    font: helvetica,
    fontSize: goalTextSize,
    bounds: {
      x: goalTextX,
      y: goalTextY,
      width: goalTextLineWidth,
      height: goalTextHeight,
    },
  });

  page.drawText("Goals", {
    x: left,
    y: top - goalLabelHeight,
    size: goalLabelSize,
    font: helveticaBold,
  });

  page.drawRectangle({
    x: left,
    y:
      top -
      goalLabelHeight -
      goalBoxMargin -
      goalBoxBorderWidth -
      goalBoxHeight,
    width: goalBoxWidth,
    height: goalBoxHeight,
    borderColor: rgb(0.9, 0.9, 0.9),
    borderWidth: 1,
  });

  for (const line of lines.slice(0, 4)) {
    page.drawText(line.text, {
      x: line.x,
      y: line.y,
      size: goalTextSize,
      font: helvetica,
    });
  }

  return (
    goalLabelHeight + goalBoxMargin + goalBoxHeight + 2 * goalBoxBorderWidth
  );
};

export const generateDietitianNotesBox = ({
  top,
  left,
  notesText,
  page,
  helvetica,
  helveticaBold,
}: {
  top: number;
  left: number;
  notesText: string;
  page: PDFPage;
  helvetica: PDFFont;
  helveticaBold: PDFFont;
}) => {
  const notesLabelSize = 12;
  const notesLabelHeight = helveticaBold.heightAtSize(notesLabelSize);

  const notesBoxWidth = PAGE_WIDTH - 2 * HORIZONTAL_MARGIN;
  const notesBoxHeight = NOTES_BOX_HEIGHT;
  const notesBoxMargin = 8;
  const notesBoxPadding = 10;
  const notesBoxBorderWidth = 1;
  const notesTextSize = 14;
  const notesTextLineWidth = notesBoxWidth - 2 * notesBoxPadding;
  const notesTextHeight = notesBoxHeight - 2 * notesBoxPadding;

  const goalTextX = left + notesBoxBorderWidth + notesBoxPadding;
  const goalTextY =
    top - notesLabelHeight - notesBoxMargin - notesBoxHeight + notesBoxPadding;

  const { lines } = layoutMultilineText(notesText, {
    alignment: TextAlignment.Left,
    font: helvetica,
    fontSize: notesTextSize,
    bounds: {
      x: goalTextX,
      y: goalTextY,
      width: notesTextLineWidth,
      height: notesTextHeight,
    },
  });

  page.drawText("Dietitian Notes", {
    x: left,
    y: top - notesLabelHeight,
    size: notesLabelSize,
    font: helveticaBold,
  });

  page.drawRectangle({
    x: left,
    y:
      top -
      notesLabelHeight -
      notesBoxMargin -
      notesBoxBorderWidth -
      notesBoxHeight,
    width: notesBoxWidth,
    height: notesBoxHeight,
    borderColor: rgb(0.9, 0.9, 0.9),
    borderWidth: 1,
  });

  for (const line of lines.slice(0, 6)) {
    page.drawText(line.text, {
      x: line.x,
      y: line.y,
      size: notesTextSize,
      font: helvetica,
    });
  }

  return (
    notesLabelHeight + notesBoxMargin + notesBoxHeight + 2 * notesBoxBorderWidth
  );
};

export const generatePortionSection = ({
  top,
  left,
  title,
  image,
  numberOfPortions,
  portionDescription,
  portionSubtitle,
  servingDescription,
  servingExamples,
  page,
  helvetica,
  helveticaBold,
}: {
  top: number;
  left: number;
  title: string;
  image: PDFImage;
  numberOfPortions: string;
  portionDescription: string[];
  portionSubtitle: string;
  servingDescription: string;
  servingExamples: string[];
  page: PDFPage;
  helvetica: PDFFont;
  helveticaBold: PDFFont;
}) => {
  const titleFontSize = 18;
  const titleHeight = helveticaBold.heightAtSize(titleFontSize, {
    descender: true,
  });

  const imageMargin = 8;

  const portionFontSize = 18;
  const portionLineHeight = helveticaBold.heightAtSize(portionFontSize, {
    descender: true,
  });
  const portionTopPadding = 18;
  const portionBottomPadding = 8;

  const servingFontSize = 12;
  const servingLineHeight = helveticaBold.heightAtSize(servingFontSize, {
    descender: true,
  });

  page.drawText(title, {
    x: left,
    y: top - titleHeight,
    size: titleFontSize,
    font: helveticaBold,
  });

  page.drawImage(image, {
    x: left,
    y: top - titleHeight - imageMargin - PORTION_IMAGE_HEIGHT,
    width: PORTION_IMAGE_WIDTH,
    height: PORTION_IMAGE_HEIGHT,
  });

  let portionYCursor =
    top - titleHeight - imageMargin - portionTopPadding - portionLineHeight;

  page.drawText(numberOfPortions, {
    x: left + PORTION_IMAGE_WIDTH + imageMargin,
    y: portionYCursor,
    size: portionFontSize,
    font: helveticaBold,
  });

  portionYCursor -= portionLineHeight + SERVING_LINE_MARGIN;

  for (const line of portionDescription) {
    page.drawText(line, {
      x: left + PORTION_IMAGE_WIDTH + imageMargin,
      y: portionYCursor,
      size: portionFontSize,
      font: helvetica,
    });
    portionYCursor -= portionLineHeight + SERVING_LINE_MARGIN;
  }

  portionYCursor -= portionBottomPadding;

  page.drawText(portionSubtitle, {
    x: left + PORTION_IMAGE_WIDTH + imageMargin,
    y: portionYCursor,
    size: 12,
    font: helvetica,
  });

  let servingYCursor =
    top - titleHeight - imageMargin - portionTopPadding - servingLineHeight;

  page.drawText(servingDescription, {
    x: SERVING_INFO_X,
    y: servingYCursor,
    size: 12,
    font: helveticaBold,
  });

  servingYCursor -= servingLineHeight + 2 * SERVING_LINE_MARGIN;

  for (const line of servingExamples) {
    page.drawText(line, {
      x: SERVING_INFO_X,
      y: servingYCursor,
      size: 12,
      font: helvetica,
    });

    servingYCursor -= servingLineHeight + SERVING_LINE_MARGIN;
  }

  return top - Math.min(portionYCursor, servingYCursor);
};

const centerInMacronutrientCell = ({
  left,
  top,
  text,
  font,
  page,
}: {
  left: number;
  top: number;
  text: string;
  font: PDFFont;
  page: PDFPage;
}) => {
  const textWidth = font.widthOfTextAtSize(text, 14);
  const x = left + MACRONUTRIENT_CELL_WIDTH / 2 - textWidth / 2;

  page.drawText(text, {
    x,
    y: top,
    font,
    size: 14,
  });
};

const generateMacronutrientRow = ({
  top,
  page,
  macronutrientName,
  macronutrientGrams,
  macronutrientCalories,
  macronutrientBWRatio,
  macronutrientPercentage,
  helvetica,
  helveticaBold,
}: {
  top: number;
  page: PDFPage;
  macronutrientName: string;
  macronutrientGrams: number;
  macronutrientCalories: number;
  macronutrientBWRatio: number;
  macronutrientPercentage: number;
  helvetica: PDFFont;
  helveticaBold: PDFFont;
}) => {
  const gridWidth = PAGE_WIDTH - 2 * HORIZONTAL_MARGIN;
  const cellStartX =
    HORIZONTAL_MARGIN + (gridWidth - 4 * MACRONUTRIENT_CELL_WIDTH);

  page.drawText(macronutrientName, {
    x: HORIZONTAL_MARGIN,
    y: top,
    size: 14,
    font: helveticaBold,
  });

  let xCursor = cellStartX;

  centerInMacronutrientCell({
    left: xCursor,
    top: top,
    text: `${macronutrientGrams} g`,
    font: helveticaBold,
    page,
  });

  xCursor += MACRONUTRIENT_CELL_WIDTH;

  centerInMacronutrientCell({
    left: xCursor,
    top: top,
    text: `${macronutrientCalories} cal`,
    font: helvetica,
    page,
  });

  xCursor += MACRONUTRIENT_CELL_WIDTH;

  centerInMacronutrientCell({
    left: xCursor,
    top: top,
    text: `${macronutrientBWRatio} g/kg BW`,
    font: helvetica,
    page,
  });

  xCursor += MACRONUTRIENT_CELL_WIDTH;

  centerInMacronutrientCell({
    left: xCursor,
    top: top,
    text: `${macronutrientPercentage}%`,
    font: helvetica,
    page,
  });
};

export const generateMacronutrientGrid = ({
  top,
  page,
  weightLbs,
  proteinGrams,
  carbGrams,
  fatGrams,
  helvetica,
  helveticaBold,
}: {
  top: number;
  page: PDFPage;
  weightLbs: number;
  proteinGrams: number;
  carbGrams: number;
  fatGrams: number;
  helvetica: PDFFont;
  helveticaBold: PDFFont;
}) => {
  const proteinCalories = 4 * proteinGrams;
  const carbCalories = 4 * carbGrams;
  const fatCalories = 9 * fatGrams;
  const totalCalories = proteinCalories + carbCalories + fatCalories;

  const bodyWeightKgs = lbsToKg(weightLbs);
  const proteinBWRatio = Math.round((proteinGrams * 10) / bodyWeightKgs) / 10;
  const carbBWRatio = Math.round((carbGrams * 10) / bodyWeightKgs) / 10;
  const fatBWRatio = Math.round((fatGrams * 10) / bodyWeightKgs) / 10;

  const proteinPercentage = Math.round((proteinCalories * 100) / totalCalories);
  const carbPercentage = Math.round((carbCalories * 100) / totalCalories);
  const fatPercentage = Math.round((fatCalories * 100) / totalCalories);

  const rowHeight = helveticaBold.heightAtSize(14);
  const rowMargin = 16;

  const gridWidth = PAGE_WIDTH - 2 * HORIZONTAL_MARGIN;

  let yCursor = top - rowHeight - rowMargin;

  generateMacronutrientRow({
    top: yCursor,
    page,
    macronutrientName: "Protein",
    macronutrientGrams: proteinGrams,
    macronutrientCalories: proteinCalories,
    macronutrientBWRatio: proteinBWRatio,
    macronutrientPercentage: proteinPercentage,
    helvetica,
    helveticaBold,
  });

  yCursor -= rowMargin;

  drawDividerLine({ y: yCursor, page });

  yCursor -= rowMargin + 1 + rowHeight;

  generateMacronutrientRow({
    top: yCursor,
    page,
    macronutrientName: "Carbohydrates",
    macronutrientGrams: carbGrams,
    macronutrientCalories: carbCalories,
    macronutrientBWRatio: carbBWRatio,
    macronutrientPercentage: carbPercentage,
    helvetica,
    helveticaBold,
  });

  yCursor -= rowMargin;

  drawDividerLine({ y: yCursor, page });

  yCursor -= rowMargin + 1 + rowHeight;

  generateMacronutrientRow({
    top: yCursor,
    page,
    macronutrientName: "Fats",
    macronutrientGrams: fatGrams,
    macronutrientCalories: fatCalories,
    macronutrientBWRatio: fatBWRatio,
    macronutrientPercentage: fatPercentage,
    helvetica,
    helveticaBold,
  });

  yCursor -= rowMargin;

  page.drawLine({
    start: {
      x: HORIZONTAL_MARGIN + (gridWidth - 3 * MACRONUTRIENT_CELL_WIDTH),
      y: yCursor,
    },
    end: {
      x: HORIZONTAL_MARGIN + (gridWidth - 2 * MACRONUTRIENT_CELL_WIDTH),
      y: yCursor,
    },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  yCursor -= rowMargin + 1 + rowHeight;

  centerInMacronutrientCell({
    left: HORIZONTAL_MARGIN + (gridWidth - 3 * MACRONUTRIENT_CELL_WIDTH),
    top: yCursor,
    text: `${totalCalories} cal`,
    font: helveticaBold,
    page,
  });

  yCursor -= rowMargin;

  return top - yCursor;
};

const centerInServingsCell = ({
  left,
  top,
  text,
  font,
  page,
}: {
  left: number;
  top: number;
  text: string;
  font: PDFFont;
  page: PDFPage;
}) => {
  const textWidth = font.widthOfTextAtSize(text, 14);
  const x = left + SERVINGS_CELL_WIDTH / 2 - textWidth / 2;

  page.drawText(text, {
    x,
    y: top,
    font,
    size: 14,
  });
};

const generateServingsGridHeading = ({
  top,
  page,
  helveticaBold,
}: {
  top: number;
  page: PDFPage;
  helveticaBold: PDFFont;
}) => {
  const gridWidth = PAGE_WIDTH - 2 * HORIZONTAL_MARGIN;
  let xCursor = HORIZONTAL_MARGIN + (gridWidth - 5 * SERVINGS_CELL_WIDTH);

  centerInServingsCell({
    left: xCursor,
    top: top,
    text: "Servings",
    font: helveticaBold,
    page,
  });

  xCursor += SERVINGS_CELL_WIDTH;

  centerInServingsCell({
    left: xCursor,
    top: top,
    text: "Protein",
    font: helveticaBold,
    page,
  });

  xCursor += SERVINGS_CELL_WIDTH;

  centerInServingsCell({
    left: xCursor,
    top: top,
    text: "Carbs",
    font: helveticaBold,
    page,
  });

  xCursor += SERVINGS_CELL_WIDTH;

  centerInServingsCell({
    left: xCursor,
    top: top,
    text: "Fats",
    font: helveticaBold,
    page,
  });

  xCursor += SERVINGS_CELL_WIDTH;

  centerInServingsCell({
    left: xCursor,
    top: top,
    text: "Calories",
    font: helveticaBold,
    page,
  });
};

const generateServingsGridRow = ({
  top,
  page,
  name,
  servings,
  proteinGrams,
  carbGrams,
  fatGrams,
  calories,
  helvetica,
  helveticaBold,
}: {
  top: number;
  page: PDFPage;
  name: string;
  servings: string;
  proteinGrams: number;
  carbGrams: number;
  fatGrams: number;
  calories: number;
  helvetica: PDFFont;
  helveticaBold: PDFFont;
}) => {
  page.drawText(name, {
    x: HORIZONTAL_MARGIN,
    y: top,
    size: 14,
    font: helveticaBold,
  });

  const gridWidth = PAGE_WIDTH - 2 * HORIZONTAL_MARGIN;
  let xCursor = HORIZONTAL_MARGIN + (gridWidth - 5 * SERVINGS_CELL_WIDTH);

  centerInServingsCell({
    left: xCursor,
    top: top,
    text: servings,
    font: helveticaBold,
    page,
  });

  xCursor += SERVINGS_CELL_WIDTH;

  centerInServingsCell({
    left: xCursor,
    top: top,
    text: proteinGrams.toString(),
    font: helvetica,
    page,
  });

  xCursor += SERVINGS_CELL_WIDTH;

  centerInServingsCell({
    left: xCursor,
    top: top,
    text: carbGrams.toString(),
    font: helvetica,
    page,
  });

  xCursor += SERVINGS_CELL_WIDTH;

  centerInServingsCell({
    left: xCursor,
    top: top,
    text: fatGrams.toString(),
    font: helvetica,
    page,
  });

  xCursor += SERVINGS_CELL_WIDTH;

  centerInServingsCell({
    left: xCursor,
    top: top,
    text: calories.toString(),
    font: helvetica,
    page,
  });
};

export const generateServingsGrid = ({
  top,
  page,
  fruitPortions,
  grainPortions,
  proteinPortions,
  fatPortions,
  dairyPortions,
  helvetica,
  helveticaBold,
}: {
  top: number;
  page: PDFPage;
  fruitPortions: number;
  grainPortions: number;
  proteinPortions: number;
  fatPortions: number;
  dairyPortions: number;
  helvetica: PDFFont;
  helveticaBold: PDFFont;
}) => {
  const fontSize = 14;
  const rowHeight = helveticaBold.heightAtSize(fontSize);
  const rowMargin = 16;

  let yCursor = top - rowHeight;

  generateServingsGridHeading({
    top: yCursor,
    page,
    helveticaBold,
  });

  yCursor -= rowMargin;

  drawDividerLine({ y: yCursor, page });

  yCursor -= rowMargin + 1 + rowHeight;

  generateServingsGridRow({
    top: yCursor,
    page,
    name: "Vegetables",
    servings: "4 - 6",
    proteinGrams: 6 * VEGETABLE_SERVING.proteinGrams,
    carbGrams: 6 * VEGETABLE_SERVING.carbGrams,
    fatGrams: 6 * VEGETABLE_SERVING.fatGrams,
    calories: 6 * VEGETABLE_SERVING.calories,
    helvetica,
    helveticaBold,
  });

  yCursor -= rowMargin;

  drawDividerLine({ y: yCursor, page });

  yCursor -= rowMargin + 1 + rowHeight;

  generateServingsGridRow({
    top: yCursor,
    page,
    name: "Fruits",
    servings: fruitPortions.toString(),
    proteinGrams: fruitPortions * FRUIT_SERVING.proteinGrams,
    carbGrams: fruitPortions * FRUIT_SERVING.carbGrams,
    fatGrams: fruitPortions * FRUIT_SERVING.fatGrams,
    calories: fruitPortions * FRUIT_SERVING.calories,
    helvetica,
    helveticaBold,
  });

  yCursor -= rowMargin;

  drawDividerLine({ y: yCursor, page });

  yCursor -= rowMargin + 1 + rowHeight;

  generateServingsGridRow({
    top: yCursor,
    page,
    name: "Grains",
    servings: grainPortions.toString(),
    proteinGrams: grainPortions * GRAIN_SERVING.proteinGrams,
    carbGrams: grainPortions * GRAIN_SERVING.carbGrams,
    fatGrams: grainPortions * GRAIN_SERVING.fatGrams,
    calories: grainPortions * GRAIN_SERVING.calories,
    helvetica,
    helveticaBold,
  });

  yCursor -= rowMargin;

  drawDividerLine({ y: yCursor, page });

  yCursor -= rowMargin + 1 + rowHeight;

  generateServingsGridRow({
    top: yCursor,
    page,
    name: "Protein",
    servings: proteinPortions.toString(),
    proteinGrams: proteinPortions * LEAN_PROTEIN_SERVING.proteinGrams,
    carbGrams: proteinPortions * LEAN_PROTEIN_SERVING.carbGrams,
    fatGrams: proteinPortions * LEAN_PROTEIN_SERVING.fatGrams,
    calories: proteinPortions * LEAN_PROTEIN_SERVING.calories,
    helvetica,
    helveticaBold,
  });

  yCursor -= rowMargin;

  drawDividerLine({ y: yCursor, page });

  yCursor -= rowMargin + 1 + rowHeight;

  generateServingsGridRow({
    top: yCursor,
    page,
    name: "Fats",
    servings: fatPortions.toString(),
    proteinGrams: fatPortions * FAT_SERVING.proteinGrams,
    carbGrams: fatPortions * FAT_SERVING.carbGrams,
    fatGrams: fatPortions * FAT_SERVING.fatGrams,
    calories: fatPortions * FAT_SERVING.calories,
    helvetica,
    helveticaBold,
  });

  yCursor -= rowMargin;

  drawDividerLine({ y: yCursor, page });

  yCursor -= rowMargin + 1 + rowHeight;

  generateServingsGridRow({
    top: yCursor,
    page,
    name: "Dairy",
    servings: dairyPortions.toString(),
    proteinGrams: dairyPortions * DAIRY_SERVING.proteinGrams,
    carbGrams: dairyPortions * DAIRY_SERVING.carbGrams,
    fatGrams: dairyPortions * DAIRY_SERVING.fatGrams,
    calories: dairyPortions * DAIRY_SERVING.calories,
    helvetica,
    helveticaBold,
  });

  yCursor -= rowMargin;

  const gridWidth = PAGE_WIDTH - 2 * HORIZONTAL_MARGIN;

  page.drawLine({
    start: {
      x: HORIZONTAL_MARGIN + (gridWidth - 4 * SERVINGS_CELL_WIDTH),
      y: yCursor,
    },
    end: {
      x: HORIZONTAL_MARGIN + gridWidth,
      y: yCursor,
    },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  yCursor -= rowMargin + 1 + rowHeight;
  let xCursor = HORIZONTAL_MARGIN + (gridWidth - 4 * SERVINGS_CELL_WIDTH);

  centerInServingsCell({
    left: xCursor,
    top: yCursor,
    text: `${
      6 * VEGETABLE_SERVING.proteinGrams +
      fruitPortions * FRUIT_SERVING.proteinGrams +
      grainPortions * GRAIN_SERVING.proteinGrams +
      proteinPortions * LEAN_PROTEIN_SERVING.proteinGrams +
      fatPortions * FAT_SERVING.proteinGrams +
      dairyPortions * DAIRY_SERVING.proteinGrams
    } g`,
    font: helveticaBold,
    page,
  });

  xCursor += SERVINGS_CELL_WIDTH;

  centerInServingsCell({
    left: xCursor,
    top: yCursor,
    text: `${
      6 * VEGETABLE_SERVING.carbGrams +
      fruitPortions * FRUIT_SERVING.carbGrams +
      grainPortions * GRAIN_SERVING.carbGrams +
      proteinPortions * LEAN_PROTEIN_SERVING.carbGrams +
      fatPortions * FAT_SERVING.carbGrams +
      dairyPortions * DAIRY_SERVING.carbGrams
    } g`,
    font: helveticaBold,
    page,
  });

  xCursor += SERVINGS_CELL_WIDTH;

  centerInServingsCell({
    left: xCursor,
    top: yCursor,
    text: `${
      6 * VEGETABLE_SERVING.fatGrams +
      fruitPortions * FRUIT_SERVING.fatGrams +
      grainPortions * GRAIN_SERVING.fatGrams +
      proteinPortions * LEAN_PROTEIN_SERVING.fatGrams +
      fatPortions * FAT_SERVING.fatGrams +
      dairyPortions * DAIRY_SERVING.fatGrams
    } g`,
    font: helveticaBold,
    page,
  });

  xCursor += SERVINGS_CELL_WIDTH;

  centerInServingsCell({
    left: xCursor,
    top: yCursor,
    text: `${
      6 * VEGETABLE_SERVING.calories +
      fruitPortions * FRUIT_SERVING.calories +
      grainPortions * GRAIN_SERVING.calories +
      proteinPortions * LEAN_PROTEIN_SERVING.calories +
      fatPortions * FAT_SERVING.calories +
      dairyPortions * DAIRY_SERVING.calories
    }`,
    font: helveticaBold,
    page,
  });
};
