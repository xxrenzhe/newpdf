import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SVG to PDF - NewPDF',
  description: 'Convert SVG graphics to PDF',
};

export default function svg_to_pdfPage() {
  return (
    <ToolPageTemplate
      title="SVG to PDF"
      description="Convert SVG graphics to PDF"
      comingSoon={true}
    />
  );
}
