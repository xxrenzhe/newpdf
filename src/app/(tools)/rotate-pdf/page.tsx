import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rotate PDF - NewPDF',
  description: 'Rotate pages in your PDF document',
};

export default function rotate_pdfPage() {
  return (
    <ToolPageTemplate
      title="Rotate PDF"
      description="Rotate pages in your PDF document"
      comingSoon={true}
    />
  );
}
