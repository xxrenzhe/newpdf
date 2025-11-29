import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Split PDF - NewPDF',
  description: 'Divide your PDF into multiple separate files',
};

export default function split_pdfPage() {
  return (
    <ToolPageTemplate
      title="Split PDF"
      description="Divide your PDF into multiple separate files"
      comingSoon={true}
    />
  );
}
