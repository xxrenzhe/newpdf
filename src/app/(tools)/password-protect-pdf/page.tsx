import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password Protect PDF - NewPDF',
  description: 'Add password protection to your PDF',
};

export default function password_protect_pdfPage() {
  return (
    <ToolPageTemplate
      title="Password Protect PDF"
      description="Add password protection to your PDF"
      comingSoon={true}
    />
  );
}
