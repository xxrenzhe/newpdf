import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TIFF to PDF - NewPDF',
  description: 'Convert TIFF images to PDF',
};

export default function tiff_to_pdfPage() {
  return (
    <ToolPageTemplate
      title="TIFF to PDF"
      description="Convert TIFF images to PDF"
      comingSoon={true}
    />
  );
}
