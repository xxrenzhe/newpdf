import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Image } from "lucide-react";

export default function HEICtoPNG() {
  return (
    <ToolPageTemplate
      title="HEIC to PNG Converter"
      description="Convert iPhone HEIC images to PNG format with transparency support and lossless quality."
      icon={Image}
      features={[
        {
          title: "Lossless Quality",
          description: "PNG format preserves the original quality of your HEIC photos perfectly.",
        },
        {
          title: "Transparency Support",
          description: "PNG supports alpha channels for images with transparent backgrounds.",
        },
        {
          title: "iPhone Compatible",
          description: "Easily convert photos from iPhone and iPad to universal PNG format.",
        },
        {
          title: "Batch Conversion",
          description: "Convert multiple HEIC files to PNG in one go to save time.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload HEIC Files",
          description: "Select HEIC photos from your iPhone, iPad, or Mac.",
        },
        {
          step: 2,
          title: "Convert to PNG",
          description: "Your HEIC images are converted to PNG with lossless quality.",
        },
        {
          step: 3,
          title: "Download PNG",
          description: "Download your PNG images ready for editing or sharing.",
        },
      ]}
    />
  );
}
