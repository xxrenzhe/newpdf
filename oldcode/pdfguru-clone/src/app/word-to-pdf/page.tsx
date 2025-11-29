import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileText } from "lucide-react";

export default function WordtoPDF() {
  return (
    <ToolPageTemplate
      title="Word to PDF Converter"
      description="Convert Microsoft Word documents to PDF format instantly. Preserve all formatting perfectly."
      icon={FileText}
      features={[
        {
          title: "Perfect Formatting",
          description: "Maintains all fonts, images, layouts, and formatting from your Word document.",
        },
        {
          title: "Universal Sharing",
          description: "PDF format ensures your document looks the same on any device or platform.",
        },
        {
          title: "Instant Conversion",
          description: "Convert DOCX and DOC files to PDF in seconds with one click.",
        },
        {
          title: "Professional Output",
          description: "Create high-quality, print-ready PDF files from your Word documents.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload Word File",
          description: "Select your DOCX or DOC file from your computer or drag and drop it.",
        },
        {
          step: 2,
          title: "Auto-Convert to PDF",
          description: "Your Word document is automatically converted to PDF with all formatting intact.",
        },
        {
          step: 3,
          title: "Download PDF",
          description: "Download your PDF file ready to share, print, or archive.",
        },
      ]}
    />
  );
}
