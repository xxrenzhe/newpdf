import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Code } from "lucide-react";

export default function HTMLtoPDF() {
  return (
    <ToolPageTemplate
      title="HTML to PDF Converter"
      description="Convert HTML web pages to PDF documents. Perfect for archiving and offline reading."
      icon={Code}
      features={[
        {
          title: "Full CSS Support",
          description: "Renders HTML with CSS, JavaScript, and modern web features accurately.",
        },
        {
          title: "Archive Web Pages",
          description: "Save web content as PDF for offline viewing and long-term archival.",
        },
        {
          title: "Preserve Links",
          description: "All hyperlinks and internal page links are maintained in the PDF.",
        },
        {
          title: "Custom Page Size",
          description: "Choose from standard sizes or set custom dimensions for your PDF output.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload HTML File",
          description: "Select your HTML file or provide a URL to convert to PDF.",
        },
        {
          step: 2,
          title: "Render & Convert",
          description: "The HTML is rendered with all styles and converted to PDF format.",
        },
        {
          step: 3,
          title: "Download PDF",
          description: "Get your PDF with the web page perfectly preserved.",
        },
      ]}
    />
  );
}
