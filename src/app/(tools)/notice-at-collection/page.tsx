import { Metadata } from 'next';
import ToolPageTemplate from '@/components/shared/ToolPageTemplate';

export const metadata: Metadata = {
  title: 'Notice at Collection - NewPDF',
  description: 'Privacy notice for California residents',
};

export default function notice_at_collectionPage() {
  return (
    <ToolPageTemplate
      title="Notice at Collection"
      description="Privacy notice for California residents"
      comingSoon={true}
    />
  );
}
