import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF to MOBI - NewPDF',
  description: 'Convert PDF to MOBI ebook',
};

export default function pdf_to_mobiPage() {
  return (
    <ToolPageTemplate
      title="PDF to MOBI"
      description="Convert PDF to MOBI ebook"
      comingSoon={true}
    />
  );
}
