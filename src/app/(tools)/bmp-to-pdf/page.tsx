import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BMP to PDF - NewPDF',
  description: 'Convert BMP images to PDF',
};

export default function bmp_to_pdfPage() {
  return (
    <ToolPageTemplate
      title="BMP to PDF"
      description="Convert BMP images to PDF"
      comingSoon={true}
    />
  );
}
