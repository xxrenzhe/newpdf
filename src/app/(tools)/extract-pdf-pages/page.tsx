import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Extract PDF Pages - NewPDF',
  description: 'Extract specific pages from your PDF',
};

export default function extract_pdf_pagesPage() {
  return (
    <ToolPageTemplate
      title="Extract PDF Pages"
      description="Extract specific pages from your PDF"
      comingSoon={true}
    />
  );
}
