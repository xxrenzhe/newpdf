import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Image } from "lucide-react";

export default function ImagetoPDF() {
  return (
    <ToolPageTemplate
      title="Image to PDF Converter"
      description="Convert any image format to PDF. Support for JPG, PNG, GIF, BMP, TIFF, and more."
      icon={Image}
      features={[
        {
          title: "All Image Formats",
          description: "Convert JPG, PNG, GIF, BMP, TIFF, WebP, and other formats to PDF.",
        },
        {
          title: "Merge Multiple Images",
          description: "Combine multiple images of different formats into a single PDF file.",
        },
        {
          title: "Custom Layout",
          description: "Choose page orientation, size, and margins for your PDF.",
        },
        {
          title: "Quality Control",
          description: "Adjust compression settings to balance file size and image quality.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload Images",
          description: "Select one or multiple images in any format to convert to PDF.",
        },
        {
          step: 2,
          title: "Customize & Convert",
          description: "Arrange images, adjust settings, and convert to PDF format.",
        },
        {
          step: 3,
          title: "Download PDF",
          description: "Download your PDF with all images perfectly organized.",
        },
      ]}
    />
  );
}
