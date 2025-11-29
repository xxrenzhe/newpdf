import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Image } from "lucide-react";

export default function PDFtoSVG() {
  return (
    <ToolPageTemplate
      title="PDF to SVG Converter"
      description="Convert PDF pages to scalable vector graphics (SVG). Perfect for web design and vector editing."
      icon={Image}
      features={[
        {
          title: "Infinitely Scalable",
          description: "SVG files scale to any size without losing quality - perfect for responsive design.",
        },
        {
          title: "Small File Size",
          description: "Vector format produces compact files that load quickly on websites.",
        },
        {
          title: "Editable Vectors",
          description: "Edit the resulting SVG in Illustrator, Inkscape, or any vector graphics editor.",
        },
        {
          title: "Web Optimized",
          description: "SVG format is ideal for modern web development and responsive interfaces.",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload PDF",
          description: "Choose your PDF file containing vector graphics or text to convert.",
        },
        {
          step: 2,
          title: "Convert to SVG",
          description: "Each page is converted to a scalable vector graphics file.",
        },
        {
          step: 3,
          title: "Download SVG",
          description: "Download your SVG files ready to use in web projects or design software.",
        },
      ]}
    />
  );
}
