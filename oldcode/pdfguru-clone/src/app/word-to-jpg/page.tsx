import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileText } from "lucide-react";

export default function WordtoJPG() {
  return (
    <ToolPageTemplate
      title="Word to JPG Converter"
      description="Convert Word documents to JPG images. Perfect for creating image previews and thumbnails."
      icon={FileText}
      features={[
        {
          title: "Page to Image",
          description: "Convert each Word document page to a separate high-quality JPG image.",
        },
        {
          title: "High Resolution",
          description: "Choose output resolution for crystal-clear image quality.",
        },
        {
          title: "Easy Sharing",
          description: "JPG images are easy to share on social media, websites, and presentations.",
        },
        {
          title: "Quick Preview",
          description: "Create image previews of Word documents without opening them.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload Word File",
          description: "Select the DOCX or DOC file you want to convert to JPG images.",
        },
        {
          step: 2,
          title: "Convert Pages",
          description: "Each page of your Word document is converted to a JPG image.",
        },
        {
          step: 3,
          title: "Download Images",
          description: "Download your JPG images individually or as a ZIP file.",
        },
      ]}
    />
  );
}
