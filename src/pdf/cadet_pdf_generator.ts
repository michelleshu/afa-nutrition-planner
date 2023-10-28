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
  drawDividerLine,
  generateGoalsBox,
  generateHeader,
  generateHighlightBox,
  generatePortionSection,
} from "./pdf_helpers";
import { cuppedHand, fist, glass, logo, palm } from "./pdf_images";

const generateFirstPage = async ({
  cadetPDF,
  helvetica,
  helveticaBold,
  cadetName,
  biologicalSex,
  age,
  heightFeet,
  heightInches,
  weightLbs,
  goalWeightLbs,
  goalText,
  fruitPortions,
}: {
  cadetPDF: PDFDocument;
  helvetica: PDFFont;
  helveticaBold: PDFFont;
  cadetName: string;
  biologicalSex: string;
  age: number;
  heightFeet: number;
  heightInches: number;
  weightLbs: number;
  goalWeightLbs: number | null;
  goalText: string;
  fruitPortions: number;
}) => {
  const firstPage = cadetPDF.addPage();
  firstPage.setSize(PAGE_WIDTH, PAGE_HEIGHT);
  const logoImage = await cadetPDF.embedPng(logo);
  const fistImage = await cadetPDF.embedPng(fist);

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

  firstPage.drawText("Recommended Daily Portions", {
    x: xCursor,
    y: yCursor,
    font: helveticaBold,
    size: 12,
  });

  yCursor -= SECTION_SPACING;

  const vegetableSectionHeight = generatePortionSection({
    top: yCursor,
    left: xCursor,
    title: "Vegetables",
    image: fistImage,
    numberOfPortions: "4 - 6",
    portionDescription: ["fist-sized", "servings"],
    portionSubtitle: "(1 fist = 1 cup)",
    servingDescription: "1 serving = 25 calories",
    servingExamples: [
      " • 1 cup raw leafy greens",
      " • 1/2 cup chopped raw or cooked veggies",
      " • 6 baby carrots",
    ],
    page: firstPage,
    helvetica,
    helveticaBold,
  });

  yCursor -= vegetableSectionHeight + SECTION_SPACING;

  drawDividerLine({ y: yCursor, page: firstPage });

  yCursor -= SECTION_SPACING;

  generatePortionSection({
    top: yCursor,
    left: xCursor,
    title: "Fruits",
    image: fistImage,
    numberOfPortions: fruitPortions.toString(),
    portionDescription: ["fist-sized", "servings"],
    portionSubtitle: "(1 fist = 1 cup)",
    servingDescription: "1 serving = 60 calories",
    servingExamples: [
      " • 1 small piece of fruit (baseball size)",
      " • 1 small banana (1/2 large banana)",
      " • 1/2 cup berries (4 large) or grapes (16)",
      " • 1/2 bowl of melon cubes",
      " • 1/2 cup canned fruit (in juice)",
      " • 1/4 cup dried fruit",
      " • Falcon Fuel Cherry Juice (2 servings)",
    ],
    page: firstPage,
    helvetica,
    helveticaBold,
  });
};

const generateSecondPage = async ({
  cadetPDF,
  helvetica,
  helveticaBold,
  grainPortions,
  proteinPortions,
  dairyPortions,
}: {
  cadetPDF: PDFDocument;
  helvetica: PDFFont;
  helveticaBold: PDFFont;
  grainPortions: number;
  proteinPortions: number;
  dairyPortions: number;
}) => {
  const secondPage = cadetPDF.addPage();
  secondPage.setSize(PAGE_WIDTH, PAGE_HEIGHT);
  const cuppedHandImage = await cadetPDF.embedPng(cuppedHand);
  const palmImage = await cadetPDF.embedPng(palm);
  const glassImage = await cadetPDF.embedPng(glass);

  let yCursor = PAGE_HEIGHT - VERTICAL_MARGIN;

  const grainSectionHeight = generatePortionSection({
    top: yCursor,
    left: HORIZONTAL_MARGIN,
    title: "Grains",
    image: cuppedHandImage,
    numberOfPortions: grainPortions.toString(),
    portionDescription: ["cupped", "hand", "servings"],
    portionSubtitle: "(1 handful = 1/2 cup)",
    servingDescription: "1 serving = 15 grams = 80 to 100 calories",
    servingExamples: [
      " • 1 slice bread",
      " • 1/2 bun or English muffin",
      " • 1/2 cup pasta, rice, or hot cereal",
      ' • 6" tortilla (12" tortilla is 3-4 servings',
      " • 1/2 cup potatoes, corn, peas",
      " • 3-6 low fat crackers",
      " • 1 bagel is 3-4 servings",
    ],
    page: secondPage,
    helvetica,
    helveticaBold,
  });

  yCursor -= grainSectionHeight + SECTION_SPACING;

  drawDividerLine({ y: yCursor, page: secondPage });

  yCursor -= SECTION_SPACING;

  const proteinSectionHeight = generatePortionSection({
    top: yCursor,
    left: HORIZONTAL_MARGIN,
    title: "Protein",
    image: palmImage,
    numberOfPortions: proteinPortions.toString(),
    portionDescription: ["palm-sized", "servings"],
    portionSubtitle: "(1 palm = 3 oz)",
    servingDescription: "1 serving = 20 grams = 105 to 165 calories",
    servingExamples: [
      "Lean:",
      " • 3 oz skinless chicken or turkey",
      " • 3 oz white fish, canned tuna",
      " • 3/4 cup egg substitute",
      " • 1 scoop protein powder",
      "",
      "Higher in Fat:",
      " • 3 oz chicken or turkey with skin",
      " • 3 oz hamburger, meatloaf, or prime rib",
      " • 3 oz fatty fish",
      " • 3 tbsp nut butter is 1/2 serving",
    ],
    page: secondPage,
    helvetica,
    helveticaBold,
  });

  yCursor -= proteinSectionHeight + SECTION_SPACING;

  drawDividerLine({ y: yCursor, page: secondPage });

  yCursor -= SECTION_SPACING;

  generatePortionSection({
    top: yCursor,
    left: HORIZONTAL_MARGIN,
    title: "Dairy",
    image: glassImage,
    numberOfPortions: dairyPortions.toString(),
    portionDescription: ["8 oz", "servings"],
    portionSubtitle: "",
    servingDescription: "1 serving = 80 to 100 calories",
    servingExamples: [
      " • 8 oz milk",
      " • 8 oz calcium fortified milk alternative",
      " • 8 oz yogurt",
      " • 1.5 oz cheese (2 string cheeses)",
    ],
    page: secondPage,
    helvetica,
    helveticaBold,
  });
};

const generateCadetPdf = async ({
  name,
  biologicalSex,
  age,
  heightFeet,
  heightInches,
  weightLbs,
  goalWeightLbs,
  goalText,
  fruitPortions,
  grainPortions,
  proteinPortions,
  dairyPortions,
}: {
  name: string;
  biologicalSex: string;
  age: number;
  heightFeet: number;
  heightInches: number;
  weightLbs: number;
  goalWeightLbs: number | null;
  goalText: string;
  fruitPortions: number;
  grainPortions: number;
  proteinPortions: number;
  dairyPortions: number;
}) => {
  const cadetPDF = await PDFDocument.create();
  const helvetica = await cadetPDF.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await cadetPDF.embedFont(StandardFonts.HelveticaBold);

  generateFirstPage({
    cadetPDF,
    helvetica,
    helveticaBold,
    cadetName: name,
    biologicalSex,
    age,
    heightFeet,
    heightInches,
    weightLbs,
    goalWeightLbs,
    goalText,
    fruitPortions,
  });

  generateSecondPage({
    cadetPDF,
    helvetica,
    helveticaBold,
    grainPortions,
    proteinPortions,
    dairyPortions,
  });

  const cadetPDFBytes = await cadetPDF.save();
  download(cadetPDFBytes, "cadet-nutrition.pdf", "application/pdf");
};

export default generateCadetPdf;
