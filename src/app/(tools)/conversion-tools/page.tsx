import { Metadata } from 'next';
import ToolPageTemplate from '@/components/shared/ToolPageTemplate';

export const metadata: Metadata = {
  title: 'Convert PDF - NewPDF',
  description: 'Convert PDF to and from various formats',
};

export default function conversion_toolsPage() {
  return (
    <ToolPageTemplate
      title="Convert PDF"
      description="Convert PDF to and from various formats"
      comingSoon={true}
    />
  );
}
