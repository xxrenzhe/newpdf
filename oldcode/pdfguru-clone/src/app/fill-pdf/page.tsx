import ToolPageTemplate from "@/components/ToolPageTemplate";
import { ClipboardEdit } from "lucide-react";

export const metadata = {
  title: "Fill PDF Forms - Complete PDF Forms Online",
  description: "Fill out PDF forms quickly and easily with our online PDF form filler",
};

export default function FillPdfPage() {
  return (
    <ToolPageTemplate
      title="Fill PDF Forms"
      description="Complete and fill out PDF forms online without printing or scanning"
      icon={ClipboardEdit}
      features={[
        {
          title: "Interactive Forms",
          description: "Fill out any PDF form field including text, checkboxes, and dropdowns",
        },
        {
          title: "Save Progress",
          description: "Save your work and come back to complete forms later",
        },
        {
          title: "Auto-Fill Support",
          description: "Quickly fill common fields with saved information",
        },
        {
          title: "Professional Output",
          description: "Generate clean, professional-looking completed forms",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PDF Form",
          description: "Select the PDF form you need to fill out",
        },
        {
          step: 2,
          title: "Complete Fields",
          description: "Click on form fields and enter your information",
        },
        {
          step: 3,
          title: "Save or Print",
          description: "Download your completed form or print it directly",
        },
      ]}
    />
  );
}
