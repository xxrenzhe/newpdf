import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF to TIFF - NewPDF',
  description: 'Convert PDF to TIFF format',
};

export default function pdf_to_tiffPage() {
  return (
    <ToolPageTemplate
      title="PDF to TIFF"
      description="Convert PDF to TIFF format"
      comingSoon={true}
    />
  );
}
