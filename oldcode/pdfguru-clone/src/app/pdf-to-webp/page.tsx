import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Image } from "lucide-react";

export default function PDFtoWebP() {
  return (
    <ToolPageTemplate
      title="PDF to WebP Converter"
      description="Convert PDF pages to WebP images for superior compression and faster web loading."
      icon={Image}
      features={[
        {
          title: "Superior Compression",
          description: "WebP provides 25-35% better compression than JPEG and PNG formats.",
        },
        {
          title: "Faster Loading",
          description: "Smaller file sizes mean faster website load times and better user experience.",
        },
        {
          title: "Transparency Support",
          description: "WebP supports both lossy and lossless compression with alpha transparency.",
        },
        {
          title: "Modern Standard",
          description: "WebP is the modern web standard supported by all major browsers.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PDF",
          description: "Select your PDF file to convert to modern WebP image format.",
        },
        {
          step: 2,
          title: "Convert to WebP",
          description: "Each PDF page is converted to an optimized WebP image.",
        },
        {
          step: 3,
          title: "Download Images",
          description: "Download your WebP images ready for web deployment.",
        },
      ]}
    />
  );
}
