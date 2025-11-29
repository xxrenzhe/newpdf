import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Image } from "lucide-react";

export default function TIFFtoPDF() {
  return (
    <ToolPageTemplate
      title="TIFF to PDF Converter"
      description="Convert TIFF images to PDF format. Perfect for document scanning and archival."
      icon={Image}
      features={[
        {
          title: "Multi-Page Support",
          description: "Convert multi-page TIFF files to multi-page PDF documents seamlessly.",
        },
        {
          title: "Quality Preservation",
          description: "Maintain original image quality and resolution in the PDF output.",
        },
        {
          title: "Batch Processing",
          description: "Convert multiple TIFF files to PDF at once for efficient workflow.",
        },
        {
          title: "Compression Options",
          description: "Choose compression settings to optimize file size without losing quality.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload TIFF Files",
          description: "Select one or multiple TIFF images to convert to PDF.",
        },
        {
          step: 2,
          title: "Convert to PDF",
          description: "Each TIFF file is converted to PDF with all pages preserved.",
        },
        {
          step: 3,
          title: "Download PDF",
          description: "Download your PDF files ready for archiving or sharing.",
        },
      ]}
    />
  );
}
