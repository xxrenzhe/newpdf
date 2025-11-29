import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileText } from "lucide-react";

export default function TexttoPDF() {
  return (
    <ToolPageTemplate
      title="Text to PDF Converter"
      description="Convert plain text files to PDF format. Create professional documents from simple text."
      icon={FileText}
      features={[
        {
          title: "Simple & Fast",
          description: "Quickly convert TXT files to PDF with just one click.",
        },
        {
          title: "Custom Formatting",
          description: "Choose fonts, font sizes, margins, and page layout for your PDF.",
        },
        {
          title: "Preserve Line Breaks",
          description: "Maintains original text formatting and line breaks in the PDF output.",
        },
        {
          title: "Professional Output",
          description: "Create clean, readable PDFs from plain text files.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload Text File",
          description: "Select your TXT file or paste text directly into the converter.",
        },
        {
          step: 2,
          title: "Customize Format",
          description: "Choose font, size, and layout options for your PDF document.",
        },
        {
          step: 3,
          title: "Download PDF",
          description: "Get your formatted PDF ready for sharing or printing.",
        },
      ]}
    />
  );
}
