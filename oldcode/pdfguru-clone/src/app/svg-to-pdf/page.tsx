import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Image } from "lucide-react";

export default function SVGtoPDF() {
  return (
    <ToolPageTemplate
      title="SVG to PDF Converter"
      description="Convert SVG vector graphics to PDF format. Perfect for printing and sharing vector artwork."
      icon={Image}
      features={[
        {
          title: "Vector Quality",
          description: "Preserve vector graphics in PDF for infinite scalability without quality loss.",
        },
        {
          title: "Print Ready",
          description: "Create high-quality PDFs perfect for professional printing.",
        },
        {
          title: "Exact Rendering",
          description: "Maintains all colors, gradients, and vector paths from your SVG file.",
        },
        {
          title: "Small File Size",
          description: "Vector-based PDFs remain compact while maintaining perfect quality.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload SVG File",
          description: "Select your SVG vector graphic file to convert to PDF.",
        },
        {
          step: 2,
          title: "Convert to PDF",
          description: "Your SVG is converted to PDF while preserving all vector properties.",
        },
        {
          step: 3,
          title: "Download PDF",
          description: "Get your PDF ready for printing or professional use.",
        },
      ]}
    />
  );
}
