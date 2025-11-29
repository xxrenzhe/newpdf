import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSV to PDF - NewPDF',
  description: 'Convert CSV data to PDF',
};

export default function csv_to_pdfPage() {
  return (
    <ToolPageTemplate
      title="CSV to PDF"
      description="Convert CSV data to PDF"
      comingSoon={true}
    />
  );
}
