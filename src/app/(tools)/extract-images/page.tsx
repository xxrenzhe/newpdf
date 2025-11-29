import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Extract Images - NewPDF',
  description: 'Extract all images from PDF',
};

export default function extract_imagesPage() {
  return (
    <ToolPageTemplate
      title="Extract Images"
      description="Extract all images from PDF"
      comingSoon={true}
    />
  );
}
