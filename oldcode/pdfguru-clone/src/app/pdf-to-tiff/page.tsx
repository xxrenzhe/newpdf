import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Image } from "lucide-react";

export default function PDFtoTIFF() {
  return (
    <ToolPageTemplate
      title="PDF to TIFF Converter"
      description="Convert PDF documents to TIFF image format. Ideal for archiving and professional printing."
      icon={Image}
      features={[
        {
          title: "Multi-Page Support",
          description: "Create multi-page TIFF files or separate TIFF images for each PDF page.",
        },
        {
          title: "High Quality",
          description: "Maintain maximum quality with lossless TIFF compression options.",
        },
        {
          title: "Professional Standard",
          description: "TIFF format is widely used in printing, scanning, and document archiving.",
        },
        {
          title: "Color Depth Options",
          description: "Choose from various color depths including black & white, grayscale, or full color.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PDF",
          description: "Select the PDF file you want to convert to TIFF format.",
        },
        {
          step: 2,
          title: "Configure Settings",
          description: "Choose TIFF settings like multi-page or single-page output and compression.",
        },
        {
          step: 3,
          title: "Download TIFF",
          description: "Download your high-quality TIFF file ready for printing or archiving.",
        },
      ]}
    />
  );
}
