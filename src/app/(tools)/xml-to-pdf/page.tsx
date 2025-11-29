import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'XML to PDF - NewPDF',
  description: 'Convert XML files to PDF',
};

export default function xml_to_pdfPage() {
  return (
    <ToolPageTemplate
      title="XML to PDF"
      description="Convert XML files to PDF"
      comingSoon={true}
    />
  );
}
