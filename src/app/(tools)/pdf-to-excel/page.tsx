import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF to Excel - NewPDF',
  description: 'Convert PDF tables to Excel',
};

export default function pdf_to_excelPage() {
  return (
    <ToolPageTemplate
      title="PDF to Excel"
      description="Convert PDF tables to Excel"
      comingSoon={true}
    />
  );
}
