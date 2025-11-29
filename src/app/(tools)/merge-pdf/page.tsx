import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Merge PDF - NewPDF',
  description: 'Combine multiple PDFs into a single document',
};

export default function merge_pdfPage() {
  return (
    <ToolPageTemplate
      title="Merge PDF"
      description="Combine multiple PDFs into a single document"
      comingSoon={true}
    />
  );
}
