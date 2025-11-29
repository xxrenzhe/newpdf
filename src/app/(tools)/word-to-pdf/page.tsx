import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Word to PDF - NewPDF',
  description: 'Convert Word documents to PDF',
};

export default function word_to_pdfPage() {
  return (
    <ToolPageTemplate
      title="Word to PDF"
      description="Convert Word documents to PDF"
      comingSoon={true}
    />
  );
}
