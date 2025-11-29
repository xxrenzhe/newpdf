import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileText } from "lucide-react";

export default function DOCXtoPDF() {
  return (
    <ToolPageTemplate
      title="DOCX to PDF Converter"
      description="Convert Microsoft Word DOCX files to PDF format. Preserve formatting and create shareable documents."
      icon={FileText}
      features={[
        {
          title: "Perfect Conversion",
          description: "All fonts, images, tables, and formatting are preserved in the PDF output.",
        },
        {
          title: "No Software Needed",
          description: "Convert DOCX to PDF online without installing Microsoft Word or any software.",
        },
        {
          title: "Fast & Secure",
          description: "Quick processing with encrypted file transfer and automatic deletion.",
        },
        {
          title: "Professional Quality",
          description: "Create high-quality PDFs suitable for business and professional use.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload DOCX",
          description: "Choose your Word DOCX file from your computer or cloud storage.",
        },
        {
          step: 2,
          title: "Convert to PDF",
          description: "Automatic conversion starts immediately with all formatting preserved.",
        },
        {
          step: 3,
          title: "Download PDF",
          description: "Your PDF is ready to download, share, or print.",
        },
      ]}
    />
  );
}
