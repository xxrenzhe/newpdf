import { Metadata } from 'next';
import ToolPageTemplate from '@/components/shared/ToolPageTemplate';

export const metadata: Metadata = {
  title: 'Blog - NewPDF',
  description: 'Latest news and tips about PDF tools',
};

export default function blogPage() {
  return (
    <ToolPageTemplate
      title="Blog"
      description="Latest news and tips about PDF tools"
      comingSoon={true}
    />
  );
}
