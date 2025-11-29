import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileText } from "lucide-react";

export default function PDFtoText() {
  return (
    <ToolPageTemplate
      title="PDF to Text Converter"
      description="Extract plain text from PDF documents. Perfect for copying, searching, and text analysis."
      icon={FileText}
      features={[
        {
          title: "OCR Technology",
          description: "Extract text from scanned PDFs and images using advanced OCR technology.",
        },
        {
          title: "Preserve Layout",
          description: "Option to maintain paragraph structure and formatting in the extracted text.",
        },
        {
          title: "Fast Extraction",
          description: "Quickly extract text from PDFs of any size in seconds.",
        },
        {
          title: "Clean Output",
          description: "Get clean, properly formatted text files ready for editing or analysis.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PDF",
          description: "Select the PDF document you want to extract text from.",
        },
        {
          step: 2,
          title: "Extract Text",
          description: "Our tool extracts all text content from your PDF automatically.",
        },
        {
          step: 3,
          title: "Download TXT",
          description: "Download your plain text file ready for editing or processing.",
        },
      ]}
    />
  );
}
