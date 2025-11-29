import ToolPageTemplate from "@/components/ToolPageTemplate";
import { BookOpen } from "lucide-react";

export default function PDFtoMOBI() {
  return (
    <ToolPageTemplate
      title="PDF to MOBI Converter"
      description="Convert PDF files to MOBI eBook format for Amazon Kindle devices and apps."
      icon={BookOpen}
      features={[
        {
          title: "Kindle Optimized",
          description: "MOBI format is specifically designed for Amazon Kindle devices and apps.",
        },
        {
          title: "Enhanced Reading",
          description: "Enjoy features like adjustable font size, bookmarks, and highlights on Kindle.",
        },
        {
          title: "Metadata Support",
          description: "Preserve book title, author, and cover image in the MOBI file.",
        },
        {
          title: "Fast Conversion",
          description: "Quick processing that converts your PDF to Kindle-ready MOBI in seconds.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PDF",
          description: "Choose the PDF book or document you want to read on your Kindle.",
        },
        {
          step: 2,
          title: "Convert to MOBI",
          description: "Our converter creates a Kindle-compatible MOBI file from your PDF.",
        },
        {
          step: 3,
          title: "Transfer to Kindle",
          description: "Download the MOBI file and transfer it to your Kindle device or app.",
        },
      ]}
    />
  );
}
