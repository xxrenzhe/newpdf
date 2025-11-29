import ToolPageTemplate from "@/components/ToolPageTemplate";
import { BookOpen } from "lucide-react";

export const metadata = {
  title: "AI Book Summarizer - Summarize Books with AI",
  description: "Get concise, intelligent summaries of books and long documents using AI",
};

export default function AiBookSummarizerPage() {
  return (
    <ToolPageTemplate
      title="AI Book Summarizer"
      description="Generate intelligent summaries of books and long documents with advanced AI"
      icon={BookOpen}
      features={[
        {
          title: "AI-Powered Analysis",
          description: "Advanced algorithms extract key points and insights",
        },
        {
          title: "Customizable Length",
          description: "Choose from brief overviews to detailed chapter summaries",
        },
        {
          title: "Key Takeaways",
          description: "Get bullet-point lists of main ideas and concepts",
        },
        {
          title: "Multiple Languages",
          description: "Summarize books in various languages",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload Book or Document",
          description: "Select the PDF or ebook you want to summarize",
        },
        {
          step: 2,
          title: "Choose Summary Type",
          description: "Select summary length and format preferences",
        },
        {
          step: 3,
          title: "Get Your Summary",
          description: "Receive a comprehensive AI-generated summary",
        },
      ]}
    />
  );
}
