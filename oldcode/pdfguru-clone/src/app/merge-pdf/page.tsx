import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Merge } from "lucide-react";

export default function MergePDFPage() {
  return (
    <ToolPageTemplate
      title="Merge PDF"
      description="Combine multiple PDF files into one document. Merge PDFs in the order you want with our easy-to-use PDF merger."
      icon={Merge}
      features={[
        {
          title: "Combine Multiple PDFs",
          description: "Merge 2 or more PDF files into a single document quickly and easily.",
        },
        {
          title: "Drag & Drop Ordering",
          description: "Arrange the order of your PDF files by simply dragging and dropping them.",
        },
        {
          title: "Preview Before Merging",
          description: "See thumbnails of your PDF pages before merging to ensure everything is in the right order.",
        },
        {
          title: "Preserve Quality",
          description: "All PDFs are merged without any loss of quality or formatting.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PDF Files",
          description: "Select multiple PDF files you want to merge or drag and drop them into the upload area.",
        },
        {
          step: 2,
          title: "Arrange Order",
          description: "Drag and drop the PDF files to arrange them in your desired order.",
        },
        {
          step: 3,
          title: "Merge & Download",
          description: "Click merge and download your combined PDF file.",
        },
      ]}
    />
  );
}
