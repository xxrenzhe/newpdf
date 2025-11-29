import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML to PDF - NewPDF',
  description: 'Convert HTML pages to PDF',
};

export default function html_to_pdfPage() {
  return (
    <ToolPageTemplate
      title="HTML to PDF"
      description="Convert HTML pages to PDF"
      comingSoon={true}
    />
  );
}
