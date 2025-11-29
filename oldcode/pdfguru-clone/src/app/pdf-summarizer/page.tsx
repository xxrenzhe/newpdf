import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileText } from "lucide-react";

export default function PDFSummarizerPage() {
  return (
    <ToolPageTemplate
      title="AI PDF Summarizer"
      description="Instantly summarize long PDF documents using advanced AI technology. Get key insights and main points in seconds."
      icon={FileText}
      features={[
        {
          title: "AI-Powered Summarization",
          description: "Our advanced AI analyzes your PDF and extracts the most important information, saving you hours of reading time.",
        },
        {
          title: "Customizable Length",
          description: "Choose between short, medium, or detailed summaries based on your needs.",
        },
        {
          title: "Key Points Extraction",
          description: "Automatically identify and highlight the main takeaways, conclusions, and important data from your documents.",
        },
        {
          title: "Multi-Language Support",
          description: "Summarize PDFs in multiple languages with high accuracy and contextual understanding.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload Your PDF",
          description: "Select the PDF document you want to summarize. Supports files up to 100MB.",
        },
        {
          step: 2,
          title: "Choose Summary Options",
          description: "Select your preferred summary length and any specific sections you want to focus on.",
        },
        {
          step: 3,
          title: "Get Your Summary",
          description: "Receive an AI-generated summary with key points, insights, and important details extracted from your PDF.",
        },
      ]}
    />
  );
}
