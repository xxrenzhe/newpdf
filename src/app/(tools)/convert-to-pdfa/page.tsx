import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Convert to PDF/A - NewPDF',
  description: 'Convert to archival PDF/A format',
};

export default function convert_to_pdfaPage() {
  return (
    <ToolPageTemplate
      title="Convert to PDF/A"
      description="Convert to archival PDF/A format"
      comingSoon={true}
    />
  );
}
