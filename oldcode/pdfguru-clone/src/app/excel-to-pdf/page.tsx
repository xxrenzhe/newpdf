import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileSpreadsheet } from "lucide-react";

export default function ExceltoPDF() {
  return (
    <ToolPageTemplate
      title="Excel to PDF Converter"
      description="Convert Excel spreadsheets to PDF format. Perfect for sharing reports and data securely."
      icon={FileSpreadsheet}
      features={[
        {
          title: "Preserve Formatting",
          description: "Maintains all cell formatting, colors, borders, and formulas in the PDF.",
        },
        {
          title: "Multiple Sheets",
          description: "Convert all sheets or select specific worksheets to include in your PDF.",
        },
        {
          title: "Print-Ready Output",
          description: "Optimized for printing with proper page breaks and scaling.",
        },
        {
          title: "Secure Sharing",
          description: "Share your data as read-only PDF to prevent unwanted modifications.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload Excel File",
          description: "Select your XLS or XLSX spreadsheet file to convert.",
        },
        {
          step: 2,
          title: "Convert to PDF",
          description: "All worksheets are converted to PDF with formatting preserved.",
        },
        {
          step: 3,
          title: "Download PDF",
          description: "Download your PDF ready for sharing, printing, or archiving.",
        },
      ]}
    />
  );
}
