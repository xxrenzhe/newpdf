import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileSpreadsheet } from "lucide-react";

export default function CSVtoPDF() {
  return (
    <ToolPageTemplate
      title="CSV to PDF Converter"
      description="Convert CSV data files to formatted PDF tables. Perfect for reports and data sharing."
      icon={FileSpreadsheet}
      features={[
        {
          title: "Formatted Tables",
          description: "CSV data is converted to well-formatted tables in your PDF document.",
        },
        {
          title: "Custom Styling",
          description: "Choose table styles, colors, and formatting for professional reports.",
        },
        {
          title: "Large Data Support",
          description: "Handle large CSV files with automatic pagination and page breaks.",
        },
        {
          title: "Print Ready",
          description: "Create professional PDF reports from your CSV data ready to print.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload CSV File",
          description: "Select your CSV data file to convert to PDF format.",
        },
        {
          step: 2,
          title: "Convert to PDF",
          description: "CSV data is formatted into a professional table in PDF format.",
        },
        {
          step: 3,
          title: "Download PDF",
          description: "Download your formatted PDF ready for sharing or printing.",
        },
      ]}
    />
  );
}
