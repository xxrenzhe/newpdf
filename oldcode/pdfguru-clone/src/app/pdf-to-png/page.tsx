import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Image } from "lucide-react";

export default function PDFtoPNG() {
  return (
    <ToolPageTemplate
      title="PDF to PNG Converter"
      description="Convert PDF pages to PNG images with transparency support. Ideal for web graphics and design work."
      icon={Image}
      features={[
        {
          title: "Transparency Support",
          description: "PNG format preserves transparency, perfect for logos and graphics with clear backgrounds.",
        },
        {
          title: "Lossless Quality",
          description: "PNG uses lossless compression, ensuring your images maintain perfect quality.",
        },
        {
          title: "Multiple Pages",
          description: "Convert all pages or select specific pages from your PDF to PNG format.",
        },
        {
          title: "Web-Ready Images",
          description: "Get optimized PNG images ready to use on websites and digital platforms.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PDF File",
          description: "Choose your PDF document from your device or drag and drop it.",
        },
        {
          step: 2,
          title: "Convert Pages",
          description: "Our tool converts each PDF page into a high-quality PNG image.",
        },
        {
          step: 3,
          title: "Download PNG Files",
          description: "Save your PNG images individually or download all as a compressed archive.",
        },
      ]}
    />
  );
}
