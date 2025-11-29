import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF to JPG - NewPDF',
  description: 'Convert PDF pages to JPG images',
};

export default function pdf_to_jpgPage() {
  return (
    <ToolPageTemplate
      title="PDF to JPG"
      description="Convert PDF pages to JPG images"
      comingSoon={true}
    />
  );
}
