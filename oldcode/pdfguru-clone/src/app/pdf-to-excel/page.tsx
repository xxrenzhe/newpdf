import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileSpreadsheet } from "lucide-react";

export default function PDFtoExcel() {
  return (
    <ToolPageTemplate
      title="PDF to Excel Converter"
      description="Extract tables and data from PDF to Excel spreadsheets. Edit and analyze your data with ease."
      icon={FileSpreadsheet}
      features={[
        {
          title: "Smart Table Detection",
          description: "Automatically identifies and extracts tables from your PDF documents accurately.",
        },
        {
          title: "Editable Spreadsheets",
          description: "Get fully editable Excel files with formulas, formatting, and data ready to use.",
        },
        {
          title: "Data Accuracy",
          description: "Preserves numerical data, calculations, and table structures precisely.",
        },
        {
          title: "Multiple Sheets",
          description: "Convert PDFs with multiple tables into organized Excel worksheets.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PDF",
          description: "Upload the PDF file containing tables or data you want to convert.",
        },
        {
          step: 2,
          title: "Extract to Excel",
          description: "Our AI-powered tool extracts tables and converts them to Excel format.",
        },
        {
          step: 3,
          title: "Download & Edit",
          description: "Download your Excel file and start working with your data immediately.",
        },
      ]}
    />
  );
}
