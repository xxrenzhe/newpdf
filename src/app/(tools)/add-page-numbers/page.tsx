import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Page Numbers - NewPDF',
  description: 'Add page numbers to PDF',
};

export default function add_page_numbersPage() {
  return (
    <ToolPageTemplate
      title="Add Page Numbers"
      description="Add page numbers to PDF"
      comingSoon={true}
    />
  );
}
