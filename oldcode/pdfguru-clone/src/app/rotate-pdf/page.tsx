import ToolPageTemplate from "@/components/ToolPageTemplate";
import { RotateCw } from "lucide-react";

export const metadata = {
  title: "Rotate PDF - Rotate PDF Pages Online",
  description: "Rotate PDF pages to the correct orientation quickly and easily",
};

export default function RotatePdfPage() {
  return (
    <ToolPageTemplate
      title="Rotate PDF"
      description="Rotate your PDF pages to the correct orientation in 90-degree increments"
      icon={RotateCw}
      features={[
        {
          title: "Rotate Individual Pages",
          description: "Rotate specific pages or all pages at once",
        },
        {
          title: "90° Increments",
          description: "Rotate pages clockwise or counterclockwise in 90° steps",
        },
        {
          title: "Live Preview",
          description: "See the rotation in real-time before saving",
        },
        {
          title: "Batch Rotation",
          description: "Apply the same rotation to multiple pages simultaneously",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload Your PDF",
          description: "Select the PDF file with pages that need rotation",
        },
        {
          step: 2,
          title: "Rotate Pages",
          description: "Click rotation buttons to adjust page orientation",
        },
        {
          step: 3,
          title: "Save Changes",
          description: "Download your PDF with corrected page orientations",
        },
      ]}
    />
  );
}
