import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MOBI to PDF - NewPDF',
  description: 'Convert MOBI ebooks to PDF',
};

export default function mobi_to_pdfPage() {
  return (
    <ToolPageTemplate
      title="MOBI to PDF"
      description="Convert MOBI ebooks to PDF"
      comingSoon={true}
    />
  );
}
