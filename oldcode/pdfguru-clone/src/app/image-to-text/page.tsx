import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Image } from "lucide-react";

export const metadata = {
  title: "Image to Text - Extract Text from Images",
  description: "Convert images to editable text with powerful OCR technology",
};

export default function ImageToTextPage() {
  return (
    <ToolPageTemplate
      title="Image to Text"
      description="Extract and convert text from images into editable, searchable content"
      icon={Image}
      features={[
        {
          title: "Multiple Formats",
          description: "Support for JPG, PNG, GIF, BMP, and TIFF images",
        },
        {
          title: "Batch Processing",
          description: "Convert text from multiple images at once",
        },
        {
          title: "Export Options",
          description: "Save extracted text as TXT, DOCX, or PDF",
        },
        {
          title: "Smart Recognition",
          description: "Accurately recognize handwriting and printed text",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload Images",
          description: "Select one or more images containing text",
        },
        {
          step: 2,
          title: "Process with OCR",
          description: "Our AI analyzes and extracts text from your images",
        },
        {
          step: 3,
          title: "Download Text",
          description: "Get your extracted text in your preferred format",
        },
      ]}
    />
  );
}
