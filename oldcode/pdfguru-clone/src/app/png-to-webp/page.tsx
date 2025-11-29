import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Image } from "lucide-react";

export default function PNGtoWebP() {
  return (
    <ToolPageTemplate
      title="PNG to WebP Converter"
      description="Convert PNG images to WebP format. Reduce file size by 25-35% with superior compression."
      icon={Image}
      features={[
        {
          title: "Superior Compression",
          description: "WebP provides 25-35% better compression than PNG while maintaining quality.",
        },
        {
          title: "Faster Web Loading",
          description: "Smaller file sizes mean faster website load times and better performance.",
        },
        {
          title: "Transparency Preserved",
          description: "WebP maintains PNG transparency and alpha channels perfectly.",
        },
        {
          title: "Modern Standard",
          description: "WebP is supported by all modern browsers for optimal web delivery.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PNG Images",
          description: "Select PNG files you want to convert to modern WebP format.",
        },
        {
          step: 2,
          title: "Convert to WebP",
          description: "PNG images are converted to WebP with optimized compression.",
        },
        {
          step: 3,
          title: "Download WebP",
          description: "Download your WebP images ready for web deployment.",
        },
      ]}
    />
  );
}
