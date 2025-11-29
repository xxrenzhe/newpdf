import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unlock PDF - NewPDF',
  description: 'Remove password protection from PDF',
};

export default function unlock_pdfPage() {
  return (
    <ToolPageTemplate
      title="Unlock PDF"
      description="Remove password protection from PDF"
      comingSoon={true}
    />
  );
}
