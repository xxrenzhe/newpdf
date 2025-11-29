import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF OCR - NewPDF',
  description: 'Convert scanned PDFs to searchable text',
};

export default function pdf_ocrPage() {
  return (
    <ToolPageTemplate
      title="PDF OCR"
      description="Convert scanned PDFs to searchable text"
      comingSoon={true}
    />
  );
}
