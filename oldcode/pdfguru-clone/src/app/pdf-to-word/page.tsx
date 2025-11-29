import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileText } from "lucide-react";

export default function PDFtoWord() {
  return (
    <ToolPageTemplate
      title="PDF to Word Converter"
      description="Convert PDF documents to editable Word files instantly. Maintain formatting, fonts, and images perfectly."
      icon={FileText}
      features={[
        {
          title: "Perfect Formatting",
          description: "Preserve all formatting, fonts, images, and layouts from your PDF to Word document.",
        },
        {
          title: "Fast Conversion",
          description: "Convert your PDF files to Word format in seconds with our high-speed processing.",
        },
        {
          title: "Fully Editable",
          description: "Get completely editable DOCX files that you can modify in Microsoft Word or any compatible editor.",
        },
        {
          title: "Secure & Private",
          description: "Your files are encrypted and automatically deleted after conversion for maximum privacy.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PDF File",
          description: "Click the upload button or drag and drop your PDF file into the conversion area.",
        },
        {
          step: 2,
          title: "Convert to Word",
          description: "Our system automatically converts your PDF to Word format while preserving all formatting.",
        },
        {
          step: 3,
          title: "Download DOCX",
          description: "Download your converted Word document and start editing immediately.",
        },
      ]}
    />
  );
}
