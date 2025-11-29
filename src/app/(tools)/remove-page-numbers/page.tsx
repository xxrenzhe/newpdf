import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Remove Page Numbers - NewPDF',
  description: 'Remove page numbers from PDF',
};

export default function remove_page_numbersPage() {
  return (
    <ToolPageTemplate
      title="Remove Page Numbers"
      description="Remove page numbers from PDF"
      comingSoon={true}
    />
  );
}
