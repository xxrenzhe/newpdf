import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Extract PDF Pages - Pull Specific Pages from PDFs",
  description: "Extract and save specific pages from your PDF documents as new files",
};

export default function ExtractPdfPagesPage() {
  return (
    <ToolPageTemplate
      title="Extract PDF Pages"
      description="Pull specific pages from your PDF and save them as new documents"
      icon={FileText}
      features={[
        {
          title: "Select Multiple Pages",
          description: "Choose any combination of pages to extract from your PDF",
        },
        {
          title: "Preview Before Extract",
          description: "View thumbnails of all pages before extracting",
        },
        {
          title: "Maintain Quality",
          description: "Extracted pages retain original formatting and resolution",
        },
        {
          title: "Fast Processing",
          description: "Extract pages from even large PDFs in seconds",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PDF File",
          description: "Select the PDF containing the pages you want to extract",
        },
        {
          step: 2,
          title: "Select Pages",
          description: "Choose which pages to extract using page numbers or ranges",
        },
        {
          step: 3,
          title: "Extract and Save",
          description: "Download your new PDF containing only the selected pages",
        },
      ]}
    />
  );
}
