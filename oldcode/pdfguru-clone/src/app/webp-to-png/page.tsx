import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Image } from "lucide-react";

export default function WebPtoPNG() {
  return (
    <ToolPageTemplate
      title="WebP to PNG Converter"
      description="Convert WebP images to PNG format for universal compatibility and editing."
      icon={Image}
      features={[
        {
          title: "Universal Compatibility",
          description: "PNG format works in all image editors and platforms, old and new.",
        },
        {
          title: "Lossless Quality",
          description: "Convert WebP to PNG without any quality loss or degradation.",
        },
        {
          title: "Transparency Support",
          description: "Maintains alpha channels and transparency from WebP to PNG.",
        },
        {
          title: "Editing Ready",
          description: "PNG format is ideal for photo editing in Photoshop, GIMP, and other tools.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload WebP Files",
          description: "Select WebP images you want to convert to PNG format.",
        },
        {
          step: 2,
          title: "Convert to PNG",
          description: "WebP files are converted to PNG with quality preserved.",
        },
        {
          step: 3,
          title: "Download PNG",
          description: "Download your PNG images ready for editing or universal sharing.",
        },
      ]}
    />
  );
}
