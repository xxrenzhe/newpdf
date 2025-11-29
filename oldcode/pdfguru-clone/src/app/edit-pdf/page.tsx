import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Edit } from "lucide-react";

export default function EditPDFPage() {
  return (
    <ToolPageTemplate
      title="Edit PDF"
      description="Edit PDF documents online with our powerful and easy-to-use PDF editor. Add text, images, shapes, and more to your PDFs in seconds."
      icon={Edit}
      features={[
        {
          title: "Text Editing",
          description: "Click and type to edit text directly in your PDF documents. Change fonts, sizes, and colors with ease.",
        },
        {
          title: "Add Images",
          description: "Insert images, logos, and graphics into your PDF files. Resize and position them exactly where you need.",
        },
        {
          title: "Shapes & Annotations",
          description: "Draw shapes, add highlights, underlines, and comments to make your PDFs more informative.",
        },
        {
          title: "Real-time Preview",
          description: "See changes instantly as you edit. What you see is exactly what you'll get in the final PDF.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload Your PDF",
          description: "Drag and drop your PDF file or click to browse and select it from your device.",
        },
        {
          step: 2,
          title: "Edit Your Document",
          description: "Use our editing tools to add text, images, shapes, or modify existing content.",
        },
        {
          step: 3,
          title: "Download",
          description: "Once you're done editing, click download to save your edited PDF file.",
        },
      ]}
    />
  );
}
