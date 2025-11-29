import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF to SVG - NewPDF',
  description: 'Convert PDF to SVG vector format',
};

export default function pdf_to_svgPage() {
  return (
    <ToolPageTemplate
      title="PDF to SVG"
      description="Convert PDF to SVG vector format"
      comingSoon={true}
    />
  );
}
