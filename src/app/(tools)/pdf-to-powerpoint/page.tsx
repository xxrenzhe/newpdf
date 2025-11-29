import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF to PowerPoint - NewPDF',
  description: 'Convert PDF to PowerPoint presentation',
};

export default function pdf_to_powerpointPage() {
  return (
    <ToolPageTemplate
      title="PDF to PowerPoint"
      description="Convert PDF to PowerPoint presentation"
      comingSoon={true}
    />
  );
}
