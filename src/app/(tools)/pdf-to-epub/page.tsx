import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF to EPUB - NewPDF',
  description: 'Convert PDF to EPUB ebook',
};

export default function pdf_to_epubPage() {
  return (
    <ToolPageTemplate
      title="PDF to EPUB"
      description="Convert PDF to EPUB ebook"
      comingSoon={true}
    />
  );
}
