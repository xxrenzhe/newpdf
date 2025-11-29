import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Image } from "lucide-react";

export default function JPGtoPDF() {
  return (
    <ToolPageTemplate
      title="JPG to PDF Converter"
      description="Convert JPG images to PDF documents. Combine multiple images into a single PDF file."
      icon={Image}
      features={[
        {
          title: "Batch Conversion",
          description: "Convert multiple JPG images to PDF at once or combine them into one file.",
        },
        {
          title: "Custom Page Size",
          description: "Choose from standard page sizes or create custom dimensions for your PDF.",
        },
        {
          title: "Quality Preservation",
          description: "Maintain original image quality without compression or quality loss.",
        },
        {
          title: "Drag & Drop",
          description: "Simple drag and drop interface to reorder images before conversion.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload JPG Images",
          description: "Select one or more JPG files you want to convert to PDF.",
        },
        {
          step: 2,
          title: "Arrange & Convert",
          description: "Arrange images in desired order and convert them to PDF format.",
        },
        {
          step: 3,
          title: "Download PDF",
          description: "Download your PDF with all images perfectly formatted.",
        },
      ]}
    />
  );
}
