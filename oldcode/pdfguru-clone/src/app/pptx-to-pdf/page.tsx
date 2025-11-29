import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Presentation } from "lucide-react";

export default function PPTXtoPDF() {
  return (
    <ToolPageTemplate
      title="PowerPoint to PDF Converter"
      description="Convert PowerPoint presentations to PDF format. Share slides that look perfect everywhere."
      icon={Presentation}
      features={[
        {
          title: "Layout Preservation",
          description: "Maintains all animations, transitions, and formatting in the final PDF.",
        },
        {
          title: "Universal Viewing",
          description: "PDF ensures your presentation looks identical on any device or platform.",
        },
        {
          title: "Handout Options",
          description: "Choose slide layouts, notes pages, or handout formats for your PDF.",
        },
        {
          title: "High Quality",
          description: "Crystal-clear graphics and text perfect for printing or digital sharing.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload Presentation",
          description: "Select your PPTX or PPT file to convert to PDF format.",
        },
        {
          step: 2,
          title: "Convert Slides",
          description: "Each slide is converted to a PDF page with all formatting intact.",
        },
        {
          step: 3,
          title: "Download PDF",
          description: "Get your PDF presentation ready to share or present anywhere.",
        },
      ]}
    />
  );
}
