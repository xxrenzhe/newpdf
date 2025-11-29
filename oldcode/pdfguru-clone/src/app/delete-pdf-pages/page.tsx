import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Trash2 } from "lucide-react";

export const metadata = {
  title: "Delete PDF Pages - Remove Unwanted Pages",
  description: "Remove unwanted pages from your PDF documents quickly and easily",
};

export default function DeletePdfPagesPage() {
  return (
    <ToolPageTemplate
      title="Delete PDF Pages"
      description="Remove unwanted pages from your PDF documents to create cleaner files"
      icon={Trash2}
      features={[
        {
          title: "Selective Deletion",
          description: "Choose exactly which pages to remove from your PDF",
        },
        {
          title: "Visual Preview",
          description: "See all pages before deciding which ones to delete",
        },
        {
          title: "Batch Delete",
          description: "Delete multiple pages at once with range selection",
        },
        {
          title: "Safe Processing",
          description: "Original file remains unchanged until you download",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload Your PDF",
          description: "Select the PDF file containing pages you want to remove",
        },
        {
          step: 2,
          title: "Mark Pages for Deletion",
          description: "Select the pages you want to delete from the preview",
        },
        {
          step: 3,
          title: "Download Clean PDF",
          description: "Get your updated PDF with unwanted pages removed",
        },
      ]}
    />
  );
}
