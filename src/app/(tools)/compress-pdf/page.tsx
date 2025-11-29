import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compress PDF - NewPDF',
  description: 'Reduce PDF file size while maintaining quality',
};

export default function compress_pdfPage() {
  return (
    <ToolPageTemplate
      title="Compress PDF"
      description="Reduce PDF file size while maintaining quality"
      comingSoon={true}
    />
  );
}
