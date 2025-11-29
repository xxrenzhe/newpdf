import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GIF to PDF - NewPDF',
  description: 'Convert GIF images to PDF',
};

export default function gif_to_pdfPage() {
  return (
    <ToolPageTemplate
      title="GIF to PDF"
      description="Convert GIF images to PDF"
      comingSoon={true}
    />
  );
}
