import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EPUB to PDF - NewPDF',
  description: 'Convert EPUB ebooks to PDF',
};

export default function epub_to_pdfPage() {
  return (
    <ToolPageTemplate
      title="EPUB to PDF"
      description="Convert EPUB ebooks to PDF"
      comingSoon={true}
    />
  );
}
