import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Image } from "lucide-react";

export default function JPGtoPNG() {
  return (
    <ToolPageTemplate
      title="JPG to PNG Converter"
      description="Convert JPG images to PNG format with transparency support. Perfect for web graphics and design."
      icon={Image}
      features={[
        {
          title: "Lossless Quality",
          description: "PNG format preserves image quality without compression artifacts.",
        },
        {
          title: "Transparency Ready",
          description: "Convert to PNG to add transparency and alpha channels to your images.",
        },
        {
          title: "Batch Conversion",
          description: "Convert multiple JPG files to PNG format simultaneously.",
        },
        {
          title: "Web Optimized",
          description: "Get PNG images optimized for web use with perfect quality.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload JPG Images",
          description: "Select one or multiple JPG files to convert to PNG format.",
        },
        {
          step: 2,
          title: "Convert to PNG",
          description: "Your JPG images are converted to high-quality PNG format.",
        },
        {
          step: 3,
          title: "Download PNG",
          description: "Download your PNG images ready for editing or web use.",
        },
      ]}
    />
  );
}
