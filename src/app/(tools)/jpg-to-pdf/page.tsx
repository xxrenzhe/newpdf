import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JPG to PDF - NewPDF',
  description: 'Convert JPG images to PDF',
};

export default function jpg_to_pdfPage() {
  return (
    <ToolPageTemplate
      title="JPG to PDF"
      description="Convert JPG images to PDF"
      comingSoon={true}
    />
  );
}
