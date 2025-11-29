import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Image } from "lucide-react";

export default function PNGtoJPG() {
  return (
    <ToolPageTemplate
      title="PNG to JPG Converter"
      description="Convert PNG images to JPG format. Reduce file size for faster loading and easy sharing."
      icon={Image}
      features={[
        {
          title: "Smaller File Size",
          description: "JPG compression significantly reduces file size perfect for web and email.",
        },
        {
          title: "Universal Compatibility",
          description: "JPG format works everywhere - all devices, browsers, and platforms.",
        },
        {
          title: "Background Color",
          description: "Choose custom background color for transparent PNG areas.",
        },
        {
          title: "Quality Control",
          description: "Adjust compression level to balance quality and file size.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PNG Files",
          description: "Select PNG images you want to convert to JPG format.",
        },
        {
          step: 2,
          title: "Convert to JPG",
          description: "PNG files are converted to JPG with optimized compression.",
        },
        {
          step: 3,
          title: "Download JPG",
          description: "Download your JPG images ready for sharing or uploading.",
        },
      ]}
    />
  );
}
