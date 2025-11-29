import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invert PDF - NewPDF',
  description: 'Invert colors in PDF',
};

export default function invert_pdfPage() {
  return (
    <ToolPageTemplate
      title="Invert PDF"
      description="Invert colors in PDF"
      comingSoon={true}
    />
  );
}
