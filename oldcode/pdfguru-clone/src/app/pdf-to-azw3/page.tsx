import ToolPageTemplate from "@/components/ToolPageTemplate";
import { BookOpen } from "lucide-react";

export default function PDFtoAZW3() {
  return (
    <ToolPageTemplate
      title="PDF to AZW3 Converter"
      description="Convert PDF to AZW3 format for enhanced Kindle reading experience with advanced features."
      icon={BookOpen}
      features={[
        {
          title: "Advanced Kindle Format",
          description: "AZW3 is Amazon's latest format with better formatting and typography support.",
        },
        {
          title: "Rich Formatting",
          description: "Supports complex layouts, embedded fonts, and advanced styling features.",
        },
        {
          title: "Better Compatibility",
          description: "Works with newer Kindle devices and apps for the best reading experience.",
        },
        {
          title: "Enhanced Features",
          description: "Supports page flip, panel view, and other advanced Kindle features.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PDF File",
          description: "Select the PDF document you want to convert to AZW3 format.",
        },
        {
          step: 2,
          title: "Convert to AZW3",
          description: "Our tool converts your PDF to the advanced AZW3 Kindle format.",
        },
        {
          step: 3,
          title: "Download & Read",
          description: "Download your AZW3 file and enjoy it on your Kindle device or app.",
        },
      ]}
    />
  );
}
