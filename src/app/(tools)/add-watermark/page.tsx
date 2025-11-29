import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Watermark - NewPDF',
  description: 'Add text or image watermark to PDF',
};

export default function add_watermarkPage() {
  return (
    <ToolPageTemplate
      title="Add Watermark"
      description="Add text or image watermark to PDF"
      comingSoon={true}
    />
  );
}
