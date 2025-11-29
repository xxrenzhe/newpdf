import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Pencil } from "lucide-react";

export default function DWGtoPDF() {
  return (
    <ToolPageTemplate
      title="DWG to PDF Converter"
      description="Convert AutoCAD DWG files to PDF format. Share technical drawings without requiring CAD software."
      icon={Pencil}
      features={[
        {
          title: "No AutoCAD Needed",
          description: "Convert DWG files to PDF without having AutoCAD or other CAD software installed.",
        },
        {
          title: "Preserve Precision",
          description: "Maintains exact dimensions, layers, and technical details from your DWG file.",
        },
        {
          title: "Universal Sharing",
          description: "PDF format allows anyone to view your technical drawings on any device.",
        },
        {
          title: "High Quality Output",
          description: "Vector-based PDF preserves sharp lines and text at any zoom level.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload DWG File",
          description: "Select your AutoCAD DWG drawing file to convert.",
        },
        {
          step: 2,
          title: "Convert to PDF",
          description: "Your technical drawing is converted to a high-quality PDF.",
        },
        {
          step: 3,
          title: "Download & Share",
          description: "Download your PDF ready to share with clients or team members.",
        },
      ]}
    />
  );
}
