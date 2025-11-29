import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Portfolio - NewPDF',
  description: 'Create PDF portfolio with multiple files',
};

export default function create_portfolioPage() {
  return (
    <ToolPageTemplate
      title="Create Portfolio"
      description="Create PDF portfolio with multiple files"
      comingSoon={true}
    />
  );
}
