import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete PDF Pages - NewPDF',
  description: 'Remove unwanted pages from your PDF',
};

export default function delete_pdf_pagesPage() {
  return (
    <ToolPageTemplate
      title="Delete PDF Pages"
      description="Remove unwanted pages from your PDF"
      comingSoon={true}
    />
  );
}
