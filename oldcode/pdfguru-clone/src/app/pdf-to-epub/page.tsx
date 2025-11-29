import ToolPageTemplate from "@/components/ToolPageTemplate";
import { BookOpen } from "lucide-react";

export default function PDFtoEPUB() {
  return (
    <ToolPageTemplate
      title="PDF to EPUB Converter"
      description="Convert PDF documents to EPUB eBook format. Read your files on any eReader or mobile device."
      icon={BookOpen}
      features={[
        {
          title: "eReader Compatible",
          description: "EPUB format works perfectly with Kindle, Apple Books, Kobo, and all major eReaders.",
        },
        {
          title: "Reflowable Text",
          description: "Text automatically adjusts to screen size for comfortable reading on any device.",
        },
        {
          title: "Preserve Structure",
          description: "Maintains chapters, headings, images, and document structure from your PDF.",
        },
        {
          title: "Font Customization",
          description: "Readers can adjust font size, style, and background for personalized reading.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PDF",
          description: "Choose the PDF document you want to convert to EPUB format.",
        },
        {
          step: 2,
          title: "Convert to EPUB",
          description: "Our converter transforms your PDF into a reflowable EPUB eBook.",
        },
        {
          step: 3,
          title: "Download eBook",
          description: "Download your EPUB file and transfer it to your favorite eReader device.",
        },
      ]}
    />
  );
}
