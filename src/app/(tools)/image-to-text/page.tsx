import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image to Text - NewPDF',
  description: 'Extract text from images using OCR',
};

export default function image_to_textPage() {
  return (
    <ToolPageTemplate
      title="Image to Text"
      description="Extract text from images using OCR"
      comingSoon={true}
    />
  );
}
