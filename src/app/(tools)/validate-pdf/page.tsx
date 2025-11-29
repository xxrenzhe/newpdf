import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Validate PDF - NewPDF',
  description: 'Check PDF compliance and errors',
};

export default function validate_pdfPage() {
  return (
    <ToolPageTemplate
      title="Validate PDF"
      description="Check PDF compliance and errors"
      comingSoon={true}
    />
  );
}
