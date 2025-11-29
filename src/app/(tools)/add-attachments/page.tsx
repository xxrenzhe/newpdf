import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Attachments - NewPDF',
  description: 'Add file attachments to PDF',
};

export default function add_attachmentsPage() {
  return (
    <ToolPageTemplate
      title="Add Attachments"
      description="Add file attachments to PDF"
      comingSoon={true}
    />
  );
}
