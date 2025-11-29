import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Image } from "lucide-react";

export default function GIFtoJPG() {
  return (
    <ToolPageTemplate
      title="GIF to JPG Converter"
      description="Convert GIF images to JPG format. Extract frames from animated GIFs or convert static images."
      icon={Image}
      features={[
        {
          title: "Frame Extraction",
          description: "Extract individual frames from animated GIFs as separate JPG images.",
        },
        {
          title: "Better Compression",
          description: "JPG format provides better compression for photos and complex images.",
        },
        {
          title: "Higher Quality",
          description: "Convert GIFs to JPG for higher color depth and better image quality.",
        },
        {
          title: "Batch Processing",
          description: "Convert multiple GIF files to JPG simultaneously.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload GIF Files",
          description: "Select GIF images or animated GIFs to convert to JPG.",
        },
        {
          step: 2,
          title: "Convert to JPG",
          description: "GIF frames are converted to high-quality JPG images.",
        },
        {
          step: 3,
          title: "Download JPG",
          description: "Download your JPG images ready to use anywhere.",
        },
      ]}
    />
  );
}
