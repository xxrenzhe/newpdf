import PDFEditorClient from './PDFEditorClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit PDF - NewPDF',
  description: 'Free online PDF editor. Add text, images, signatures, and annotations to your PDF files.',
};

export default function EditPDFPage() {
  return <PDFEditorClient />;
}
