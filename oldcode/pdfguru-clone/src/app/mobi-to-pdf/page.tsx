import ToolPageTemplate from "@/components/ToolPageTemplate";
import { BookOpen } from "lucide-react";

export default function MOBItoPDF() {
  return (
    <ToolPageTemplate
      title="MOBI to PDF Converter"
      description="Convert Kindle MOBI eBooks to PDF format. Read and share your eBooks on any device."
      icon={BookOpen}
      features={[
        {
          title: "Universal Reading",
          description: "Read your Kindle books on any device after converting to PDF format.",
        },
        {
          title: "Print Your Books",
          description: "Convert MOBI to PDF for easy printing with proper page layout.",
        },
        {
          title: "Preserve Content",
          description: "Maintains text, images, formatting, and table of contents from MOBI.",
        },
        {
          title: "Fast Conversion",
          description: "Quick processing that handles even large MOBI files efficiently.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload MOBI File",
          description: "Select the MOBI eBook file you want to convert to PDF.",
        },
        {
          step: 2,
          title: "Convert to PDF",
          description: "Our tool converts your MOBI book to a formatted PDF document.",
        },
        {
          step: 3,
          title: "Download PDF",
          description: "Download your PDF eBook ready for any device or printing.",
        },
      ]}
    />
  );
}
