import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Markdown to PDF - NewPDF',
  description: 'Convert Markdown to PDF',
};

export default function markdown_to_pdfPage() {
  return (
    <ToolPageTemplate
      title="Markdown to PDF"
      description="Convert Markdown to PDF"
      comingSoon={true}
    />
  );
}
