import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Presentation } from "lucide-react";

export default function PDFtoPPTX() {
  return (
    <ToolPageTemplate
      title="PDF to PowerPoint Converter"
      description="Transform PDF documents into editable PowerPoint presentations. Perfect for creating and editing slides."
      icon={Presentation}
      features={[
        {
          title: "Editable Slides",
          description: "Convert PDF pages to fully editable PowerPoint slides you can customize.",
        },
        {
          title: "Layout Preservation",
          description: "Maintains original layout, images, and text positioning from your PDF.",
        },
        {
          title: "Quick Conversion",
          description: "Fast processing that converts your PDF to PPTX in seconds.",
        },
        {
          title: "Professional Quality",
          description: "Get presentation-ready slides with high-quality graphics and formatting.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PDF Document",
          description: "Select your PDF file that you want to convert to PowerPoint format.",
        },
        {
          step: 2,
          title: "Convert to PPTX",
          description: "Each PDF page is converted into an editable PowerPoint slide.",
        },
        {
          step: 3,
          title: "Download Presentation",
          description: "Download your PPTX file and edit it in PowerPoint or compatible software.",
        },
      ]}
    />
  );
}
