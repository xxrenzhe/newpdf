import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Image } from "lucide-react";

export default function PNGtoPDF() {
  return (
    <ToolPageTemplate
      title="PNG to PDF Converter"
      description="Convert PNG images to PDF format with transparency support. Create professional documents from images."
      icon={Image}
      features={[
        {
          title: "Transparency Support",
          description: "Preserve PNG transparency in your PDF documents for professional results.",
        },
        {
          title: "Multiple Images",
          description: "Combine multiple PNG files into a single PDF or create separate PDFs.",
        },
        {
          title: "High Quality",
          description: "Lossless conversion maintains the original quality of your PNG images.",
        },
        {
          title: "Page Customization",
          description: "Adjust margins, orientation, and page size to fit your needs.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PNG Files",
          description: "Choose PNG images from your device to convert to PDF format.",
        },
        {
          step: 2,
          title: "Convert to PDF",
          description: "Our tool converts your PNG images to a professional PDF document.",
        },
        {
          step: 3,
          title: "Download & Share",
          description: "Download your PDF and share it anywhere with confidence.",
        },
      ]}
    />
  );
}
