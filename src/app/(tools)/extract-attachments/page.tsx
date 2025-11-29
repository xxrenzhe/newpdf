import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Extract Attachments - NewPDF',
  description: 'Extract file attachments from PDF',
};

export default function extract_attachmentsPage() {
  return (
    <ToolPageTemplate
      title="Extract Attachments"
      description="Extract file attachments from PDF"
      comingSoon={true}
    />
  );
}
