import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redact PDF - NewPDF',
  description: 'Permanently remove sensitive information',
};

export default function redact_pdfPage() {
  return (
    <ToolPageTemplate
      title="Redact PDF"
      description="Permanently remove sensitive information"
      comingSoon={true}
    />
  );
}
