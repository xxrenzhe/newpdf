import { Metadata } from 'next';
import ToolPageTemplate from '@/components/shared/ToolPageTemplate';

export const metadata: Metadata = {
  title: 'Log In - NewPDF',
  description: 'Sign in to your account',
};

export default function app_loginPage() {
  return (
    <ToolPageTemplate
      title="Log In"
      description="Sign in to your account"
      comingSoon={true}
    />
  );
}
