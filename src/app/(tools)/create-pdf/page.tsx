import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create PDF - NewPDF',
  description: 'Create a new PDF from scratch',
};

export default function create_pdfPage() {
  return (
    <ToolPageTemplate
      title="Create PDF"
      description="Create a new PDF from scratch"
      comingSoon={true}
    />
  );
}
