import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Organize PDF - NewPDF',
  description: 'Reorder and organize PDF pages',
};

export default function organize_pdfPage() {
  return (
    <ToolPageTemplate
      title="Organize PDF"
      description="Reorder and organize PDF pages"
      comingSoon={true}
    />
  );
}
