import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grayscale PDF - NewPDF',
  description: 'Convert PDF to grayscale',
};

export default function grayscale_pdfPage() {
  return (
    <ToolPageTemplate
      title="Grayscale PDF"
      description="Convert PDF to grayscale"
      comingSoon={true}
    />
  );
}
