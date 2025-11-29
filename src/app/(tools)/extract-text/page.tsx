import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Extract Text - NewPDF',
  description: 'Extract all text from PDF',
};

export default function extract_textPage() {
  return (
    <ToolPageTemplate
      title="Extract Text"
      description="Extract all text from PDF"
      comingSoon={true}
    />
  );
}
