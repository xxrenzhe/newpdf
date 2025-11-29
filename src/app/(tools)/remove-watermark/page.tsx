import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Remove Watermark - NewPDF',
  description: 'Remove watermarks from PDF',
};

export default function remove_watermarkPage() {
  return (
    <ToolPageTemplate
      title="Remove Watermark"
      description="Remove watermarks from PDF"
      comingSoon={true}
    />
  );
}
