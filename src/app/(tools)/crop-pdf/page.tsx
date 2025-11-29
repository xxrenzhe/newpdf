import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crop PDF - NewPDF',
  description: 'Trim margins and crop PDF pages',
};

export default function crop_pdfPage() {
  return (
    <ToolPageTemplate
      title="Crop PDF"
      description="Trim margins and crop PDF pages"
      comingSoon={true}
    />
  );
}
