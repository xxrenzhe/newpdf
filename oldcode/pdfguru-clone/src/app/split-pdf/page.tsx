import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Scissors } from "lucide-react";

export const metadata = {
  title: "Split PDF - Divide PDF into Multiple Files",
  description: "Split large PDF files into smaller documents by page ranges or extract individual pages",
};

export default function SplitPdfPage() {
  return (
    <ToolPageTemplate
      title="Split PDF"
      description="Divide your PDF into multiple files by page ranges or extract individual pages"
      icon={Scissors}
      features={[
        {
          title: "Split by Range",
          description: "Divide your PDF into custom page ranges to create multiple documents",
        },
        {
          title: "Extract Individual Pages",
          description: "Extract specific pages as separate PDF files",
        },
        {
          title: "Bulk Processing",
          description: "Split multiple PDFs at once to save time",
        },
        {
          title: "Preserve Quality",
          description: "Original formatting and quality retained in all split files",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload Your PDF",
          description: "Select the PDF file you want to split from your device",
        },
        {
          step: 2,
          title: "Choose Split Method",
          description: "Select page ranges or individual pages to extract",
        },
        {
          step: 3,
          title: "Split and Download",
          description: "Process your PDF and download the split files",
        },
      ]}
    />
  );
}
