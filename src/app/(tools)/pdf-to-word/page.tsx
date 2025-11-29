import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF to Word - NewPDF',
  description: 'Convert PDF to Word document',
};

export default function pdf_to_wordPage() {
  return (
    <ToolPageTemplate
      title="PDF to Word"
      description="Convert PDF to Word document"
      comingSoon={true}
    />
  );
}
