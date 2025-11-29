import ToolPageTemplate from "@/components/ToolPageTemplate";
import { BookOpen } from "lucide-react";

export default function EPUBtoPDF() {
  return (
    <ToolPageTemplate
      title="EPUB to PDF Converter"
      description="Convert EPUB eBooks to PDF format. Read your digital books on any device or print them."
      icon={BookOpen}
      features={[
        {
          title: "Universal Compatibility",
          description: "PDF format works on all devices, making your eBooks accessible everywhere.",
        },
        {
          title: "Print Ready",
          description: "Convert eBooks to PDF for easy printing with proper page layout.",
        },
        {
          title: "Preserve Structure",
          description: "Maintains chapters, table of contents, images, and formatting.",
        },
        {
          title: "Fast Processing",
          description: "Quick conversion from EPUB to PDF regardless of book size.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload EPUB File",
          description: "Select the EPUB eBook you want to convert to PDF format.",
        },
        {
          step: 2,
          title: "Convert to PDF",
          description: "Our tool converts your EPUB to a formatted PDF document.",
        },
        {
          step: 3,
          title: "Download PDF",
          description: "Download your PDF eBook ready for reading on any device.",
        },
      ]}
    />
  );
}
