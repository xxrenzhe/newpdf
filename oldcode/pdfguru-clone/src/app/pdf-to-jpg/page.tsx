import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Image } from "lucide-react";

export default function PDFtoJPG() {
  return (
    <ToolPageTemplate
      title="PDF to JPG Converter"
      description="Convert PDF pages to high-quality JPG images. Perfect for sharing and viewing on any device."
      icon={Image}
      features={[
        {
          title: "High Quality Output",
          description: "Export PDF pages as high-resolution JPG images with customizable DPI settings.",
        },
        {
          title: "Batch Processing",
          description: "Convert all pages of your PDF to individual JPG images in one go.",
        },
        {
          title: "Universal Compatibility",
          description: "JPG format works everywhere - social media, websites, presentations, and more.",
        },
        {
          title: "Fast & Reliable",
          description: "Quick conversion with guaranteed quality and accurate color reproduction.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PDF",
          description: "Select your PDF file or drag it into the upload area to begin.",
        },
        {
          step: 2,
          title: "Convert to JPG",
          description: "Each page of your PDF is automatically converted to a JPG image.",
        },
        {
          step: 3,
          title: "Download Images",
          description: "Download individual images or all of them as a ZIP file.",
        },
      ]}
    />
  );
}
