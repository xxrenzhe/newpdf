import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FilePlus } from "lucide-react";

export const metadata = {
  title: "Create PDF - Make PDF Documents from Scratch",
  description: "Create professional PDF documents from scratch with our easy-to-use PDF creator",
};

export default function CreatePdfPage() {
  return (
    <ToolPageTemplate
      title="Create PDF"
      description="Build professional PDF documents from scratch with text, images, and formatting"
      icon={FilePlus}
      features={[
        {
          title: "Rich Text Editor",
          description: "Add and format text with multiple fonts, sizes, and styles",
        },
        {
          title: "Insert Images",
          description: "Add images and graphics to your PDF documents",
        },
        {
          title: "Templates",
          description: "Start with pre-designed templates for common document types",
        },
        {
          title: "Custom Layout",
          description: "Control page size, margins, and orientation",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Choose Template or Blank",
          description: "Start with a template or create from a blank document",
        },
        {
          step: 2,
          title: "Add Content",
          description: "Insert text, images, and other elements to build your PDF",
        },
        {
          step: 3,
          title: "Export as PDF",
          description: "Download your professionally created PDF document",
        },
      ]}
    />
  );
}
