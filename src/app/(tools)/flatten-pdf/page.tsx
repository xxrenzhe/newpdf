import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flatten PDF - NewPDF',
  description: 'Flatten PDF forms and annotations',
};

export default function flatten_pdfPage() {
  return (
    <ToolPageTemplate
      title="Flatten PDF"
      description="Flatten PDF forms and annotations"
      comingSoon={true}
    />
  );
}
