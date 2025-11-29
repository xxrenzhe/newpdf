import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF to HTML - NewPDF',
  description: 'Convert PDF to HTML format',
};

export default function pdf_to_htmlPage() {
  return (
    <ToolPageTemplate
      title="PDF to HTML"
      description="Convert PDF to HTML format"
      comingSoon={true}
    />
  );
}
