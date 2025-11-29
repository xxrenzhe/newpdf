import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileText } from "lucide-react";

export default function PDFtoDOCX() {
  return (
    <ToolPageTemplate
      title="PDF to DOCX Converter"
      description="Convert PDF files to Microsoft Word DOCX format. Edit your documents with full formatting intact."
      icon={FileText}
      features={[
        {
          title: "100% Editable",
          description: "Get fully editable DOCX files compatible with Microsoft Word, Google Docs, and more.",
        },
        {
          title: "Formatting Intact",
          description: "Preserves fonts, styles, images, tables, and all document formatting perfectly.",
        },
        {
          title: "Fast Processing",
          description: "Convert PDFs to DOCX in seconds, regardless of document size.",
        },
        {
          title: "Cloud-Based",
          description: "No software installation needed - convert directly in your browser.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PDF",
          description: "Select your PDF file from your computer or cloud storage.",
        },
        {
          step: 2,
          title: "Auto-Convert",
          description: "Our advanced OCR and conversion engine processes your PDF to DOCX.",
        },
        {
          step: 3,
          title: "Download DOCX",
          description: "Get your editable Word document and start making changes instantly.",
        },
      ]}
    />
  );
}
