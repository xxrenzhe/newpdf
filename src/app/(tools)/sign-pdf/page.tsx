import type { Metadata } from 'next';
import PDFEditorClient from '../edit-pdf/PDFEditorClient';

export const metadata: Metadata = {
  title: 'Sign PDF - NewPDF',
  description: 'Add digital signatures and stamps to your PDF documents.',
};

export default function SignPDFPage() {
  return <PDFEditorClient />;
}
