import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare PDF - NewPDF',
  description: 'Compare two PDF documents',
};

export default function compare_pdfPage() {
  return (
    <ToolPageTemplate
      title="Compare PDF"
      description="Compare two PDF documents"
      comingSoon={true}
    />
  );
}
