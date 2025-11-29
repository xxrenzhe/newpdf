import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF to Text - NewPDF',
  description: 'Extract text from PDF',
};

export default function pdf_to_textPage() {
  return (
    <ToolPageTemplate
      title="PDF to Text"
      description="Extract text from PDF"
      comingSoon={true}
    />
  );
}
