import ToolPageTemplate from "@/components/ToolPageTemplate";
import { ScanText } from "lucide-react";

export const metadata = {
  title: "PDF OCR - Convert Scanned PDFs to Searchable Text",
  description: "Use OCR technology to convert scanned PDFs into searchable and editable documents",
};

export default function PdfOcrPage() {
  return (
    <ToolPageTemplate
      title="PDF OCR"
      description="Convert scanned PDFs and images into searchable, editable text with OCR"
      icon={ScanText}
      features={[
        {
          title: "Advanced OCR",
          description: "State-of-the-art optical character recognition technology",
        },
        {
          title: "Multi-Language Support",
          description: "Recognize text in over 100 languages",
        },
        {
          title: "Preserve Layout",
          description: "Maintain original document formatting and structure",
        },
        {
          title: "High Accuracy",
          description: "Industry-leading accuracy even with poor quality scans",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload Scanned PDF",
          description: "Select your scanned PDF or image file",
        },
        {
          step: 2,
          title: "Choose Language",
          description: "Select the language(s) in your document for best results",
        },
        {
          step: 3,
          title: "Download Searchable PDF",
          description: "Get your OCR-processed PDF with searchable text",
        },
      ]}
    />
  );
}
