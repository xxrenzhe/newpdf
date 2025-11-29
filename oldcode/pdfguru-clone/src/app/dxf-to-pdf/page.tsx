import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Pencil } from "lucide-react";

export default function DXFtoPDF() {
  return (
    <ToolPageTemplate
      title="DXF to PDF Converter"
      description="Convert DXF CAD files to PDF format. Share technical drawings and blueprints easily."
      icon={Pencil}
      features={[
        {
          title: "CAD-Free Viewing",
          description: "Share technical drawings as PDF without requiring CAD software to view them.",
        },
        {
          title: "Layer Preservation",
          description: "Maintains layer structure and organization from your DXF file.",
        },
        {
          title: "Accurate Conversion",
          description: "Preserves dimensions, annotations, and technical specifications precisely.",
        },
        {
          title: "Print Optimized",
          description: "Create print-ready PDFs perfect for blueprints and technical documentation.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload DXF File",
          description: "Select your DXF CAD drawing file to convert to PDF.",
        },
        {
          step: 2,
          title: "Convert to PDF",
          description: "Your DXF drawing is converted to a professional PDF document.",
        },
        {
          step: 3,
          title: "Download PDF",
          description: "Get your PDF ready for sharing, printing, or archival.",
        },
      ]}
    />
  );
}
