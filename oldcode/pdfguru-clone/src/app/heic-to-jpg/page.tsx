import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Image } from "lucide-react";

export default function HEICtoJPG() {
  return (
    <ToolPageTemplate
      title="HEIC to JPG Converter"
      description="Convert iPhone HEIC photos to JPG format. Make your images compatible with all devices."
      icon={Image}
      features={[
        {
          title: "iPhone Photo Support",
          description: "Convert HEIC images from iPhone and iPad to universal JPG format.",
        },
        {
          title: "Universal Compatibility",
          description: "JPG works on all devices, platforms, and photo editing software.",
        },
        {
          title: "Preserve Quality",
          description: "Maintain high image quality during conversion from HEIC to JPG.",
        },
        {
          title: "Batch Processing",
          description: "Convert multiple HEIC photos to JPG at once to save time.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload HEIC Photos",
          description: "Select HEIC images from your iPhone or iPad to convert.",
        },
        {
          step: 2,
          title: "Convert to JPG",
          description: "Your HEIC photos are converted to JPG with quality preserved.",
        },
        {
          step: 3,
          title: "Download JPG",
          description: "Download your JPG images compatible with all devices.",
        },
      ]}
    />
  );
}
