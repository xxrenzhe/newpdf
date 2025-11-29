import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text to PDF - NewPDF',
  description: 'Convert text files to PDF',
};

export default function text_to_pdfPage() {
  return (
    <ToolPageTemplate
      title="Text to PDF"
      description="Convert text files to PDF"
      comingSoon={true}
    />
  );
}
