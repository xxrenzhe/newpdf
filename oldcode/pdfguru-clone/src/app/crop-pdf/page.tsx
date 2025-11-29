import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Crop } from "lucide-react";

export const metadata = {
  title: "Crop PDF - Trim and Crop PDF Pages",
  description: "Crop and trim PDF pages to remove margins and unwanted areas",
};

export default function CropPdfPage() {
  return (
    <ToolPageTemplate
      title="Crop PDF"
      description="Trim margins and crop PDF pages to focus on the content that matters"
      icon={Crop}
      features={[
        {
          title: "Visual Cropping",
          description: "See exactly what you're cropping with live preview",
        },
        {
          title: "Precise Control",
          description: "Set exact crop dimensions or drag to select area",
        },
        {
          title: "Apply to All Pages",
          description: "Crop all pages uniformly or customize each page",
        },
        {
          title: "Remove Margins",
          description: "Automatically detect and remove white margins",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload Your PDF",
          description: "Select the PDF file you want to crop",
        },
        {
          step: 2,
          title: "Set Crop Area",
          description: "Drag to select the area you want to keep or enter dimensions",
        },
        {
          step: 3,
          title: "Download Cropped PDF",
          description: "Get your PDF with unwanted areas removed",
        },
      ]}
    />
  );
}
