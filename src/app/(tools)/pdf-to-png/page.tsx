import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF to PNG - NewPDF',
  description: 'Convert PDF pages to PNG images',
};

export default function pdf_to_pngPage() {
  return (
    <ToolPageTemplate
      title="PDF to PNG"
      description="Convert PDF pages to PNG images"
      comingSoon={true}
    />
  );
}
