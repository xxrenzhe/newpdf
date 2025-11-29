import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Optimize PDF - NewPDF',
  description: 'Optimize PDF for web and mobile',
};

export default function optimize_pdfPage() {
  return (
    <ToolPageTemplate
      title="Optimize PDF"
      description="Optimize PDF for web and mobile"
      comingSoon={true}
    />
  );
}
