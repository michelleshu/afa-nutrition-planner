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
} from "./pdf_constants";
import {
  PDFFont,
  PDFImage,
  PDFPage,
  TextAlignment,
  layoutMultilineText,
  rgb,
} from "pdf-lib";

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
    page.drawText(subtext, {
      x: left,
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

export const drawDividerLine = ({ y, page }: { y: number; page: PDFPage }) => {
  page.drawLine({
    start: { x: HORIZONTAL_MARGIN, y },
    end: { x: PAGE_WIDTH - HORIZONTAL_MARGIN, y },
    thickness: 1,
    color: rgb(0.9, 0.9, 0.9),
  });
};
