import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Linearize PDF - NewPDF',
  description: 'Optimize PDF for fast web viewing',
};

export default function linearize_pdfPage() {
  return (
    <ToolPageTemplate
      title="Linearize PDF"
      description="Optimize PDF for fast web viewing"
      comingSoon={true}
    />
  );
}
