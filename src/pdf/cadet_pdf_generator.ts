import download from "downloadjs";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const generateCadetPdf = async ({
  name,
  biologicalSex,
  age,
  heightFeet,
  heightInches,
  weightLbs,
  goalWeightLbs,
  goalText,
  vegetablePortions,
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
  vegetablePortions: number;
  fruitPortions: number;
  grainPortions: number;
  proteinPortions: number;
  dairyPortions: number;
}) => {
  const cadetPDF = await PDFDocument.create();
  const helvetica = await cadetPDF.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await cadetPDF.embedFont(StandardFonts.HelveticaBold);

  const page = cadetPDF.addPage();
  page.drawText("Creating PDFs in JavaScript is awesome", {
    x: 50,
    y: 500,
    size: 18,
    color: rgb(0, 0, 0),
    font: helvetica,
  });

  const cadetPDFBytes = await cadetPDF.save();
  download(cadetPDFBytes, "cadet-nutrition.pdf", "application/pdf");
};

export default generateCadetPdf;
