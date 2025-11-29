import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Pencil } from "lucide-react";

export default function PDFtoDXF() {
  return (
    <ToolPageTemplate
      title="PDF to DXF Converter"
      description="Convert PDF technical drawings to DXF CAD format. Edit in AutoCAD and other CAD software."
      icon={Pencil}
      features={[
        {
          title: "CAD Compatible",
          description: "DXF format works with AutoCAD, SolidWorks, and all major CAD applications.",
        },
        {
          title: "Vector Accuracy",
          description: "Preserves precise vector lines, curves, and dimensions from technical drawings.",
        },
        {
          title: "Layer Support",
          description: "Maintains layers and organizational structure for easy editing in CAD software.",
        },
        {
          title: "Professional Quality",
          description: "Industry-standard conversion for architects, engineers, and designers.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PDF Drawing",
          description: "Select your PDF technical drawing or blueprint to convert.",
        },
        {
          step: 2,
          title: "Convert to DXF",
          description: "Our converter extracts vector data and creates an editable DXF file.",
        },
        {
          step: 3,
          title: "Open in CAD",
          description: "Download your DXF file and open it in AutoCAD or your preferred CAD software.",
        },
      ]}
    />
  );
}
