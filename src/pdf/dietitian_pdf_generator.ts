import download from "downloadjs";
import { PDFDocument, PDFFont, StandardFonts } from "pdf-lib";

import {
  PAGE_HEIGHT,
  PAGE_WIDTH,
  VERTICAL_MARGIN,
  HORIZONTAL_MARGIN,
  SECTION_SPACING,
  HIGHLIGHT_BOX_WIDTH,
  HIGHLIGHT_BOX_HORIZONTAL_MARGIN,
} from "./pdf_constants";
import {
  generateDietitianNotesBox,
  generateGoalsBox,
  generateHeader,
  generateHighlightBox,
  generateMacronutrientGrid,
  generateServingsGrid,
  getFilePrefix,
} from "./pdf_helpers";
import { logo } from "./pdf_images";

const generateFirstPage = async ({
  dietitianPDF,
  helvetica,
  helveticaBold,
  cadetName,
  biologicalSex,
  age,
  heightFeet,
  heightInches,
  weightLbs,
  goalWeightLbs,
  leanBodyMassLbs,
  goalText,
  dietitianNotes,
  bmr,
  bmrMethod,
  tdee,
  targetCalories,
}: {
  dietitianPDF: PDFDocument;
  helvetica: PDFFont;
  helveticaBold: PDFFont;
  cadetName: string;
  biologicalSex: string;
  age: number;
  heightFeet: number;
  heightInches: number;
  weightLbs: number;
  goalWeightLbs: number | null;
  leanBodyMassLbs: number | null;
  goalText: string;
  dietitianNotes: string;
  bmr: number;
  bmrMethod: string;
  tdee: number;
  targetCalories: number;
}) => {
  const firstPage = dietitianPDF.addPage();
  firstPage.setSize(PAGE_WIDTH, PAGE_HEIGHT);
  const logoImage = await dietitianPDF.embedPng(logo);

  let xCursor = HORIZONTAL_MARGIN;
  let yCursor = PAGE_HEIGHT - VERTICAL_MARGIN;

  const headerHeight = generateHeader({
    left: xCursor,
    right: PAGE_WIDTH - HORIZONTAL_MARGIN,
    top: yCursor,
    page: firstPage,
    helvetica,
    helveticaBold,
    logo: logoImage,
    cadetName,
  });

  yCursor -= headerHeight + SECTION_SPACING;

  generateHighlightBox({
    left: xCursor,
    top: yCursor,
    label: "Biological Sex",
    value: biologicalSex,
    page: firstPage,
    helvetica,
    helveticaBold,
  });

  xCursor += HIGHLIGHT_BOX_WIDTH + HIGHLIGHT_BOX_HORIZONTAL_MARGIN;

  generateHighlightBox({
    left: xCursor,
    top: yCursor,
    label: "Age",
    value: age.toString(),
    page: firstPage,
    helvetica,
    helveticaBold,
  });

  xCursor += HIGHLIGHT_BOX_WIDTH + HIGHLIGHT_BOX_HORIZONTAL_MARGIN;

  generateHighlightBox({
    left: xCursor,
    top: yCursor,
    label: "Height",
    value: `${heightFeet}'${heightInches}"`,
    page: firstPage,
    helvetica,
    helveticaBold,
  });

  xCursor += HIGHLIGHT_BOX_WIDTH + HIGHLIGHT_BOX_HORIZONTAL_MARGIN;

  const highlightBoxHeight = generateHighlightBox({
    left: xCursor,
    top: yCursor,
    label: "Weight",
    value: `${weightLbs} lbs`,
    subtext: goalWeightLbs ? `Goal Weight: ${goalWeightLbs} lbs` : "",
    page: firstPage,
    helvetica,
    helveticaBold,
  });

  xCursor = HORIZONTAL_MARGIN;
  yCursor -= highlightBoxHeight + SECTION_SPACING;

  const goalBoxHeight = generateGoalsBox({
    left: xCursor,
    top: yCursor,
    goalText,
    page: firstPage,
    helvetica,
    helveticaBold,
  });

  yCursor -= goalBoxHeight + SECTION_SPACING + helveticaBold.heightAtSize(12);

  const notesBoxHeight = generateDietitianNotesBox({
    left: xCursor,
    top: yCursor,
    notesText: dietitianNotes,
    page: firstPage,
    helvetica,
    helveticaBold,
  });

  yCursor -= notesBoxHeight + SECTION_SPACING + helveticaBold.heightAtSize(12);

  firstPage.drawText("Calories", {
    x: xCursor,
    y: yCursor,
    font: helveticaBold,
    size: 12,
  });

  yCursor -= SECTION_SPACING;

  generateHighlightBox({
    left: xCursor,
    top: yCursor,
    label: "LBM",
    value: leanBodyMassLbs ? `${leanBodyMassLbs} lbs` : "N/A",
    page: firstPage,
    helvetica,
    helveticaBold,
  });

  xCursor += HIGHLIGHT_BOX_WIDTH + HIGHLIGHT_BOX_HORIZONTAL_MARGIN;

  generateHighlightBox({
    left: xCursor,
    top: yCursor,
    label: "BMR",
    value: `${bmr} cal`,
    subtext: bmrMethod,
    page: firstPage,
    helvetica,
    helveticaBold,
  });

  xCursor += HIGHLIGHT_BOX_WIDTH + HIGHLIGHT_BOX_HORIZONTAL_MARGIN;

  generateHighlightBox({
    left: xCursor,
    top: yCursor,
    label: "TDEE",
    value: `${tdee} cal`,
    subtext: `Physical Activity: ${Math.round((tdee * 100) / bmr) / 10}`,
    page: firstPage,
    helvetica,
    helveticaBold,
  });

  xCursor += HIGHLIGHT_BOX_WIDTH + HIGHLIGHT_BOX_HORIZONTAL_MARGIN;

  generateHighlightBox({
    left: xCursor,
    top: yCursor,
    label: "Target Calories",
    value: `${targetCalories} cal`,
    page: firstPage,
    helvetica,
    helveticaBold,
  });
};

const generateSecondPage = async ({
  dietitianPDF,
  helvetica,
  helveticaBold,
  weightLbs,
  proteinGrams,
  carbGrams,
  fatGrams,
  fruitPortions,
  grainPortions,
  proteinPortions,
  fatPortions,
  dairyPortions,
}: {
  dietitianPDF: PDFDocument;
  helvetica: PDFFont;
  helveticaBold: PDFFont;
  weightLbs: number;
  proteinGrams: number;
  carbGrams: number;
  fatGrams: number;
  fruitPortions: number;
  grainPortions: number;
  proteinPortions: number;
  fatPortions: number;
  dairyPortions: number;
}) => {
  const secondPage = dietitianPDF.addPage();
  secondPage.setSize(PAGE_WIDTH, PAGE_HEIGHT);

  let xCursor = HORIZONTAL_MARGIN;
  let yCursor = PAGE_HEIGHT - VERTICAL_MARGIN - helveticaBold.heightAtSize(12);

  secondPage.drawText("Macronutrients", {
    x: xCursor,
    y: yCursor,
    font: helveticaBold,
    size: 12,
  });

  yCursor -= SECTION_SPACING;

  const macronutrientGridHeight = generateMacronutrientGrid({
    top: yCursor,
    page: secondPage,
    weightLbs,
    proteinGrams,
    carbGrams,
    fatGrams,
    helvetica,
    helveticaBold,
  });

  yCursor -=
    macronutrientGridHeight + SECTION_SPACING + helveticaBold.heightAtSize(12);

  secondPage.drawText("Daily Servings", {
    x: xCursor,
    y: yCursor,
    font: helveticaBold,
    size: 12,
  });

  yCursor -= SECTION_SPACING;

  generateServingsGrid({
    top: yCursor,
    page: secondPage,
    fruitPortions,
    grainPortions,
    proteinPortions,
    fatPortions,
    dairyPortions,
    helvetica,
    helveticaBold,
  });
};

const generateDietitianPdf = async ({
  name,
  biologicalSex,
  age,
  heightFeet,
  heightInches,
  weightLbs,
  goalWeightLbs,
  leanBodyMassLbs,
  goalText,
  dietitianNotes,
  bmr,
  bmrMethod,
  tdee,
  targetCalories,
  proteinGrams,
  carbGrams,
  fatGrams,
  fruitPortions,
  grainPortions,
  proteinPortions,
  fatPortions,
  dairyPortions,
}: {
  name: string;
  biologicalSex: string;
  age: number;
  heightFeet: number;
  heightInches: number;
  weightLbs: number;
  goalWeightLbs: number | null;
  leanBodyMassLbs: number | null;
  goalText: string;
  dietitianNotes: string;
  bmr: number;
  bmrMethod: string;
  tdee: number;
  targetCalories: number;
  proteinGrams: number;
  carbGrams: number;
  fatGrams: number;
  fruitPortions: number;
  grainPortions: number;
  proteinPortions: number;
  fatPortions: number;
  dairyPortions: number;
}) => {
  const dietitianPDF = await PDFDocument.create();
  const helvetica = await dietitianPDF.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await dietitianPDF.embedFont(
    StandardFonts.HelveticaBold
  );

  generateFirstPage({
    dietitianPDF,
    helvetica,
    helveticaBold,
    cadetName: name,
    biologicalSex,
    age,
    heightFeet,
    heightInches,
    weightLbs,
    goalWeightLbs,
    leanBodyMassLbs,
    goalText,
    dietitianNotes,
    bmr,
    bmrMethod,
    tdee,
    targetCalories,
  });

  generateSecondPage({
    dietitianPDF,
    helvetica,
    helveticaBold,
    weightLbs,
    proteinGrams,
    carbGrams,
    fatGrams,
    fruitPortions,
    grainPortions,
    proteinPortions,
    fatPortions,
    dairyPortions,
  });

  const dietitianPDFBytes = await dietitianPDF.save();
  download(
    dietitianPDFBytes,
    `${getFilePrefix(name)}_RDCopy.pdf`,
    "application/pdf"
  );
};

export default generateDietitianPdf;
