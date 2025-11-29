import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HEIC to PDF - NewPDF',
  description: 'Convert HEIC images to PDF',
};

export default function heic_to_pdfPage() {
  return (
    <ToolPageTemplate
      title="HEIC to PDF"
      description="Convert HEIC images to PDF"
      comingSoon={true}
    />
  );
}
