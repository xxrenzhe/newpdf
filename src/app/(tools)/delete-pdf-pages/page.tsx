import type { Metadata } from 'next';
import DeletePdfPagesClient from '@/features/delete-pages/DeletePdfPagesClient';

export const metadata: Metadata = {
  title: 'Delete PDF Pages - NewPDF',
  description: 'Remove unwanted pages from your PDF',
};

export default function delete_pdf_pagesPage() {
  return <DeletePdfPagesClient />;
}
