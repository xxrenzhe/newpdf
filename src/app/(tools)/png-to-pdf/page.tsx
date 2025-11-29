import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PNG to PDF - NewPDF',
  description: 'Convert PNG images to PDF',
};

export default function png_to_pdfPage() {
  return (
    <ToolPageTemplate
      title="PNG to PDF"
      description="Convert PNG images to PDF"
      comingSoon={true}
    />
  );
}
