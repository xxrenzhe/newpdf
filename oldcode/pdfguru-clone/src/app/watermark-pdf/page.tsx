import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Droplet } from "lucide-react";

export const metadata = {
  title: "Watermark PDF - Add Watermarks to PDFs",
  description: "Add text or image watermarks to your PDF documents for branding and protection",
};

export default function WatermarkPdfPage() {
  return (
    <ToolPageTemplate
      title="Watermark PDF"
      description="Add custom text or image watermarks to protect and brand your PDFs"
      icon={Droplet}
      features={[
        {
          title: "Text Watermarks",
          description: "Add custom text with adjustable font, size, and opacity",
        },
        {
          title: "Image Watermarks",
          description: "Upload your logo or image as a watermark",
        },
        {
          title: "Positioning Control",
          description: "Place watermarks anywhere on the page with rotation options",
        },
        {
          title: "Batch Watermarking",
          description: "Apply watermarks to multiple PDFs at once",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PDF File",
          description: "Select the PDF you want to add a watermark to",
        },
        {
          step: 2,
          title: "Customize Watermark",
          description: "Choose text or image, adjust position, size, and opacity",
        },
        {
          step: 3,
          title: "Download Watermarked PDF",
          description: "Get your PDF with the watermark applied",
        },
      ]}
    />
  );
}
