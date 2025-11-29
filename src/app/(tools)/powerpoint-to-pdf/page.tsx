import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PowerPoint to PDF - NewPDF',
  description: 'Convert PowerPoint presentations to PDF',
};

export default function powerpoint_to_pdfPage() {
  return (
    <ToolPageTemplate
      title="PowerPoint to PDF"
      description="Convert PowerPoint presentations to PDF"
      comingSoon={true}
    />
  );
}
