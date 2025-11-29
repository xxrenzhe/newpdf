import ToolPageTemplate from "@/components/ToolPageTemplate";
import { MessageSquare } from "lucide-react";

export const metadata = {
  title: "Annotate PDF - Add Comments and Notes",
  description: "Add annotations, comments, highlights, and notes to your PDF documents",
};

export default function AnnotatePdfPage() {
  return (
    <ToolPageTemplate
      title="Annotate PDF"
      description="Add comments, highlights, notes, and annotations to your PDF documents"
      icon={MessageSquare}
      features={[
        {
          title: "Text Annotations",
          description: "Add text comments and notes anywhere on your PDF pages",
        },
        {
          title: "Highlight Text",
          description: "Highlight important sections with customizable colors",
        },
        {
          title: "Drawing Tools",
          description: "Use shapes, arrows, and freehand drawing to mark up PDFs",
        },
        {
          title: "Collaborative Review",
          description: "Perfect for document review and feedback processes",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload Your PDF",
          description: "Choose the PDF document you want to annotate",
        },
        {
          step: 2,
          title: "Add Annotations",
          description: "Use our tools to add comments, highlights, and drawings",
        },
        {
          step: 3,
          title: "Save Changes",
          description: "Download your annotated PDF with all changes preserved",
        },
      ]}
    />
  );
}
