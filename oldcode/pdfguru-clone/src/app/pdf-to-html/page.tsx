import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Code } from "lucide-react";

export default function PDFtoHTML() {
  return (
    <ToolPageTemplate
      title="PDF to HTML Converter"
      description="Convert PDF documents to HTML web pages. Perfect for publishing content online."
      icon={Code}
      features={[
        {
          title: "Web-Ready Output",
          description: "Get clean, semantic HTML code ready to publish on any website.",
        },
        {
          title: "Responsive Design",
          description: "HTML output is mobile-friendly and adapts to different screen sizes.",
        },
        {
          title: "Preserve Links",
          description: "All hyperlinks and bookmarks from your PDF are maintained in HTML.",
        },
        {
          title: "SEO Friendly",
          description: "Convert PDFs to searchable, indexable HTML for better SEO performance.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PDF File",
          description: "Choose the PDF document you want to convert to HTML.",
        },
        {
          step: 2,
          title: "Convert to HTML",
          description: "Our tool extracts content and creates clean, semantic HTML code.",
        },
        {
          step: 3,
          title: "Download HTML",
          description: "Download your HTML file with images and CSS ready to use on your website.",
        },
      ]}
    />
  );
}
