import ToolPageTemplate from "@/components/ToolPageTemplate";
import { PenTool } from "lucide-react";

export const metadata = {
  title: "Sign PDF - Add Electronic Signatures to PDFs",
  description: "Add legally binding electronic signatures to your PDF documents online",
};

export default function SignPdfPage() {
  return (
    <ToolPageTemplate
      title="Sign PDF"
      description="Add legally binding electronic signatures to your PDF documents"
      icon={PenTool}
      features={[
        {
          title: "Draw Signature",
          description: "Create signatures by drawing with your mouse or touchscreen",
        },
        {
          title: "Type Signature",
          description: "Type your name and convert it to a signature with custom fonts",
        },
        {
          title: "Upload Signature",
          description: "Upload an image of your handwritten signature",
        },
        {
          title: "Legally Binding",
          description: "Create electronic signatures that are legally recognized",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload Document",
          description: "Select the PDF document that requires your signature",
        },
        {
          step: 2,
          title: "Create Signature",
          description: "Draw, type, or upload your signature",
        },
        {
          step: 3,
          title: "Place and Save",
          description: "Position your signature on the document and download",
        },
      ]}
    />
  );
}
