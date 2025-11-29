import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF Metadata - NewPDF',
  description: 'View and edit PDF metadata',
};

export default function pdf_metadataPage() {
  return (
    <ToolPageTemplate
      title="PDF Metadata"
      description="View and edit PDF metadata"
      comingSoon={true}
    />
  );
}
