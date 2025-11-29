import ToolPageTemplate from "@/components/ToolPageTemplate";
import { ArrowDownUp } from "lucide-react";

export const metadata = {
  title: "Organize PDF - Reorder PDF Pages",
  description: "Reorder and organize your PDF pages with drag-and-drop simplicity",
};

export default function OrganizePdfPage() {
  return (
    <ToolPageTemplate
      title="Organize PDF"
      description="Reorder, rearrange, and organize your PDF pages exactly how you need them"
      icon={ArrowDownUp}
      features={[
        {
          title: "Drag and Drop",
          description: "Easily reorder pages by dragging them to new positions",
        },
        {
          title: "Visual Interface",
          description: "See thumbnail previews of all pages while organizing",
        },
        {
          title: "Bulk Operations",
          description: "Move multiple pages at once for faster organization",
        },
        {
          title: "Undo/Redo",
          description: "Easily reverse changes if you make a mistake",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PDF File",
          description: "Select the PDF whose pages you want to reorganize",
        },
        {
          step: 2,
          title: "Rearrange Pages",
          description: "Drag and drop pages into your desired order",
        },
        {
          step: 3,
          title: "Save Organized PDF",
          description: "Download your PDF with pages in the new order",
        },
      ]}
    />
  );
}
