import { Metadata } from 'next';
import ToolPageTemplate from '@/components/shared/ToolPageTemplate';

export const metadata: Metadata = {
  title: 'Edit & Sign - NewPDF',
  description: 'Edit and sign your PDF documents online',
};

export default function edit_and_signPage() {
  return (
    <ToolPageTemplate
      title="Edit & Sign"
      description="Edit and sign your PDF documents online"
      comingSoon={true}
    />
  );
}
