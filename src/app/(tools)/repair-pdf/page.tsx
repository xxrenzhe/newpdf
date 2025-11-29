import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Repair PDF - NewPDF',
  description: 'Fix corrupted PDF files',
};

export default function repair_pdfPage() {
  return (
    <ToolPageTemplate
      title="Repair PDF"
      description="Fix corrupted PDF files"
      comingSoon={true}
    />
  );
}
