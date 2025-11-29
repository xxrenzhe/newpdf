import { Metadata } from 'next';
import ToolPageTemplate from '@/components/shared/ToolPageTemplate';

export const metadata: Metadata = {
  title: 'PDF Forms - NewPDF',
  description: 'Fill out and create PDF forms',
};

export default function formsPage() {
  return (
    <ToolPageTemplate
      title="PDF Forms"
      description="Fill out and create PDF forms"
      comingSoon={true}
    />
  );
}
