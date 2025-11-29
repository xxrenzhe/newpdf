import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Minimize } from "lucide-react";

export default function CompressPDFPage() {
  return (
    <ToolPageTemplate
      title="Compress PDF"
      description="Reduce PDF file size without losing quality. Compress large PDF files to make them easier to share and store."
      icon={Minimize}
      features={[
        {
          title: "Smart Compression",
          description: "Our algorithm intelligently compresses your PDF while maintaining optimal quality and readability.",
        },
        {
          title: "Batch Processing",
          description: "Compress multiple PDF files at once to save time and effort.",
        },
        {
          title: "Quality Control",
          description: "Choose between different compression levels based on your needs - from maximum compression to high quality.",
        },
        {
          title: "Fast & Secure",
          description: "Lightning-fast compression with enterprise-grade security. Your files are automatically deleted after processing.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PDF File",
          description: "Select the PDF file you want to compress from your computer or drag and drop it into the upload area.",
        },
        {
          step: 2,
          title: "Choose Compression Level",
          description: "Select your preferred compression level - balanced, maximum compression, or high quality.",
        },
        {
          step: 3,
          title: "Download Compressed PDF",
          description: "Download your compressed PDF file. The file size will be significantly reduced while maintaining quality.",
        },
      ]}
    />
  );
}
