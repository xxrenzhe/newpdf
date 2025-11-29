import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WebP to PDF - NewPDF',
  description: 'Convert WebP images to PDF',
};

export default function webp_to_pdfPage() {
  return (
    <ToolPageTemplate
      title="WebP to PDF"
      description="Convert WebP images to PDF"
      comingSoon={true}
    />
  );
}
