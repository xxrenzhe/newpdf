import { Metadata } from 'next';
import ToolPageTemplate from '@/components/shared/ToolPageTemplate';

export const metadata: Metadata = {
  title: 'Reviews - NewPDF',
  description: 'What our users are saying',
};

export default function reviewsPage() {
  return (
    <ToolPageTemplate
      title="Reviews"
      description="What our users are saying"
      comingSoon={true}
    />
  );
}
