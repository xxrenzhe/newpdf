import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON to PDF - NewPDF',
  description: 'Convert JSON data to PDF',
};

export default function json_to_pdfPage() {
  return (
    <ToolPageTemplate
      title="JSON to PDF"
      description="Convert JSON data to PDF"
      comingSoon={true}
    />
  );
}
