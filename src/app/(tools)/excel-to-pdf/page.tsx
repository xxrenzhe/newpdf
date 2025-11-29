import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Excel to PDF - NewPDF',
  description: 'Convert Excel spreadsheets to PDF',
};

export default function excel_to_pdfPage() {
  return (
    <ToolPageTemplate
      title="Excel to PDF"
      description="Convert Excel spreadsheets to PDF"
      comingSoon={true}
    />
  );
}
