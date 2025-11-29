import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Image } from "lucide-react";

export default function PDFtoImage() {
  return (
    <ToolPageTemplate
      title="PDF to Image Converter"
      description="Convert PDF pages to various image formats (JPG, PNG, TIFF, etc.). Perfect for sharing and displaying."
      icon={Image}
      features={[
        {
          title: "Multiple Formats",
          description: "Export to JPG, PNG, TIFF, BMP, and other popular image formats.",
        },
        {
          title: "Custom Resolution",
          description: "Choose your preferred DPI and resolution for optimal image quality.",
        },
        {
          title: "Batch Conversion",
          description: "Convert multi-page PDFs to images with one click.",
        },
        {
          title: "Quality Control",
          description: "Adjust compression and quality settings to balance file size and clarity.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PDF",
          description: "Upload your PDF file to start the conversion process.",
        },
        {
          step: 2,
          title: "Choose Format",
          description: "Select your preferred image format and quality settings.",
        },
        {
          step: 3,
          title: "Download Images",
          description: "Download your converted images individually or as a ZIP archive.",
        },
      ]}
    />
  );
}
