'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { PDFEditorWrapper } from '@/features/pdf-editor';
import type { PDFEditorInstance } from '@/features/pdf-editor/types';
import FileUpload from '@/components/shared/FileUpload';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  deleteWorkspacePdf,
  loadWorkspacePdf,
  saveWorkspacePdf,
  type WorkspacePdfRecord,
} from '@/lib/workspace/pdfWorkspaceCache';

const WORKSPACE_KEY = 'workspace';

const EDITOR_TOOLS = [
  'pages',
  'mouse',
  'hand',
  'text',
  'textbox',
  'image',
  'highlight',
  'text_highlight',
  'underline',
  'strikethrough',
  'line',
  'eraser',
  'signature',
  'stamp',
  'shapes',
  'rect',
  'circle',
  'ellipse',
  'radact',
  'find',
  'insert_pages',
  'delete_pages',
  'watermark',
  'page_number',
  'header_footer',
  'forms',
  'textArt',
  'history',
  'download',
] as const;

function normalizeBaseName(raw: string) {
  const value = raw.trim();
  if (!value) return 'edited';
  return value.replace(/\.pdf$/i, '').trim() || 'edited';
}

export default function PDFEditorClient({
  pdfData: initialPdfData,
  fileName: initialFileName,
}: {
  pdfData?: ArrayBuffer | null;
  fileName?: string;
} = {}) {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(initialPdfData || null);
  const [showUpload, setShowUpload] = useState(!initialPdfData);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [cachedPdf, setCachedPdf] = useState<WorkspacePdfRecord | null>(null);
  const [isCheckingCache, setIsCheckingCache] = useState(!initialPdfData);

  const fileNameInputRef = useRef<HTMLInputElement>(null);
  const editorInstanceRef = useRef<PDFEditorInstance | null>(null);

  const tools = EDITOR_TOOLS;

  useEffect(() => {
    if (initialPdfData) return;
    let cancelled = false;
    setIsCheckingCache(true);
    loadWorkspacePdf(WORKSPACE_KEY)
      .then(record => {
        if (cancelled) return;
        setCachedPdf(record);
      })
      .catch(() => {})
      .finally(() => {
        if (cancelled) return;
        setIsCheckingCache(false);
      });
    return () => {
      cancelled = true;
    };
  }, [initialPdfData]);

  useEffect(() => {
    if (initialPdfData && initialFileName) {
      const file = new File([initialPdfData], initialFileName, { type: 'application/pdf' });
      setPdfFile(file);
      setPdfData(initialPdfData);
      setShowUpload(false);
      void saveWorkspacePdf(WORKSPACE_KEY, initialFileName, initialPdfData).catch(() => {});
    }
  }, [initialPdfData, initialFileName]);

  const handleFileSelect = useCallback(async (file: File) => {
    setPdfFile(file);
    const arrayBuffer = await file.arrayBuffer();
    setPdfData(arrayBuffer);
    setShowUpload(false);
    void saveWorkspacePdf(WORKSPACE_KEY, file.name, arrayBuffer).catch(() => {});
    setCachedPdf({ fileName: file.name, blob: new Blob([arrayBuffer], { type: 'application/pdf' }), updatedAt: Date.now() });
  }, []);

  const handleSave = useCallback((blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const base = normalizeBaseName(
      fileNameInputRef.current?.value || pdfFile?.name || 'edited.pdf'
    );
    a.download = `${base}_edited.pdf`;
    a.click();
    URL.revokeObjectURL(url);
    void saveWorkspacePdf(WORKSPACE_KEY, a.download, blob).catch(() => {});
    setCachedPdf({ fileName: a.download, blob, updatedAt: Date.now() });
  }, [pdfFile]);

  const handleResumeCached = useCallback(async () => {
    if (!cachedPdf) return;
    const arrayBuffer = await cachedPdf.blob.arrayBuffer();
    const file = new File([arrayBuffer], cachedPdf.fileName, { type: 'application/pdf' });
    setPdfFile(file);
    setPdfData(arrayBuffer);
    setShowUpload(false);
  }, [cachedPdf]);

  const handleClearCached = useCallback(async () => {
    try {
      await deleteWorkspacePdf(WORKSPACE_KEY);
    } finally {
      setCachedPdf(null);
    }
  }, []);

  const handleDone = useCallback(() => {
    const base = normalizeBaseName(
      fileNameInputRef.current?.value || pdfFile?.name || 'edited.pdf'
    );
    editorInstanceRef.current?.save(`${base}_edited.pdf`);
  }, [pdfFile]);

  const getDefaultBaseName = () => normalizeBaseName(pdfFile?.name || 'untitled.pdf');

  if (showUpload || !pdfData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
          <div className="max-w-2xl w-full space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">Edit PDF</h1>
              <p className="text-lg text-muted-foreground">
                Upload your PDF file to start editing. Everything is processed locally in your browser.
              </p>
            </div>

            {cachedPdf && (
              <div className="p-4 border rounded-lg bg-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">
                      Continue where you left off
                    </div>
                    <div className="text-sm text-gray-600 truncate">{cachedPdf.fileName}</div>
                    <div className="text-xs text-gray-500">
                      Saved locally • {new Date(cachedPdf.updatedAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={handleResumeCached}
                      className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Resume
                    </button>
                    <button
                      onClick={handleClearCached}
                      className="border border-gray-200 hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Discard
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isCheckingCache && !cachedPdf && (
              <div className="text-center text-sm text-gray-500">
                Checking local cache…
              </div>
            )}

            <FileUpload onFileSelect={handleFileSelect} maxSizeMB={50} />

            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Text & formatting</h3>
                  <p className="text-sm text-muted-foreground">
                    Add text, highlight, underline, and strikethrough.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Images</h3>
                  <p className="text-sm text-muted-foreground">
                    Insert and position images anywhere on your PDF.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Sign & stamp</h3>
                  <p className="text-sm text-muted-foreground">
                    Draw signatures and apply stamps.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Pages</h3>
                  <p className="text-sm text-muted-foreground">
                    Insert pages, delete pages, add page numbers, headers & footers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#f5f5f5] overflow-hidden">
      <header className="bg-white border-b border-gray-200 h-14 flex items-center px-4 justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="text-primary font-bold text-xl">PDF</span>
            <span className="font-bold text-xl text-gray-900">Tools</span>
          </div>
          <div className="flex items-center gap-2 ml-2 border border-gray-200 rounded-md px-3 py-1.5 bg-white">
            <input
              ref={fileNameInputRef}
              type="text"
              defaultValue={getDefaultBaseName()}
              className="text-sm text-gray-700 bg-transparent border-none outline-none w-56"
              aria-label="File name"
            />
          </div>
          <span className="hidden md:inline text-xs text-gray-500">
            Local processing • No uploads
          </span>
        </div>

        <button
          onClick={handleDone}
          disabled={!isEditorReady}
          className="bg-primary disabled:bg-gray-300 hover:bg-primary/90 text-white px-6 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Done
        </button>
      </header>

      <div className="flex-1 overflow-hidden">
        <PDFEditorWrapper
          pdfData={pdfData}
          tools={tools}
          locale="en"
          onReady={(editor) => {
            editorInstanceRef.current = editor;
            setIsEditorReady(!!editor);
          }}
          onSave={handleSave}
          onError={(error) => {
            console.error('PDF Editor Error:', error);
          }}
          className="h-full"
          useReactToolbar={true}
          hideToolbarDownload={true}
        />
      </div>
    </div>
  );
}
