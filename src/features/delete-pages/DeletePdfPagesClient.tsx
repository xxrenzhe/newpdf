'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import FileUpload from '@/components/shared/FileUpload';
import { PDFDocument } from 'pdf-lib';
import {
  deleteWorkspacePdf,
  loadWorkspacePdf,
  saveWorkspacePdf,
  type WorkspacePdfRecord,
} from '@/lib/workspace/pdfWorkspaceCache';

const WORKSPACE_KEY = 'workspace';

type PdfJsPage = {
  getViewport: (params: { scale: number }) => { width: number; height: number };
  render: (params: {
    canvasContext: CanvasRenderingContext2D;
    viewport: { width: number; height: number };
  }) => { promise: Promise<void> };
  cleanup?: () => void;
};

type PdfJsDocument = {
  numPages: number;
  getPage: (pageNum: number) => Promise<PdfJsPage>;
};

type PdfJsLoadingTask = {
  promise: Promise<PdfJsDocument>;
};

type PdfJsLib = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: unknown) => PdfJsLoadingTask;
};

const THUMB_WIDTH_PX = 180;
const RENDER_CONCURRENCY = 2;

async function loadPdfJs(): Promise<PdfJsLib> {
  if (typeof window === 'undefined') {
    throw new Error('PDF.js can only be loaded in the browser');
  }

  if (!window.pdfjsLib) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '/assets/js/pdfjs/pdf.min.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load PDF.js'));
      document.head.appendChild(script);
    });
  }

  const pdfjsLib = (window as unknown as { pdfjsLib: PdfJsLib }).pdfjsLib;
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/js/pdfjs/pdf.worker.min.js';
  return pdfjsLib;
}

function normalizeBaseName(raw: string) {
  const value = raw.trim();
  if (!value) return 'document';
  return value.replace(/\.pdf$/i, '').trim() || 'document';
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

export default function DeletePdfPagesClient() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [pdfDoc, setPdfDoc] = useState<PdfJsDocument | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [isLoadingDoc, setIsLoadingDoc] = useState(false);
  const [docError, setDocError] = useState<string | null>(null);
  const [cachedPdf, setCachedPdf] = useState<WorkspacePdfRecord | null>(null);
  const [isCheckingCache, setIsCheckingCache] = useState(true);

  const [selected, setSelected] = useState<Set<number>>(() => new Set());
  const [isApplying, setIsApplying] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);
  const canvasByPageRef = useRef<Map<number, HTMLCanvasElement>>(new Map());
  const renderedPagesRef = useRef<Set<number>>(new Set());
  const queuedPagesRef = useRef<Set<number>>(new Set());
  const queueRef = useRef<number[]>([]);
  const inflightRef = useRef(0);
  const pdfDocRef = useRef<PdfJsDocument | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    pdfDocRef.current = pdfDoc;
  }, [pdfDoc]);

  useEffect(() => {
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
  }, []);

  const toggleSelected = useCallback((pageNum: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(pageNum)) next.delete(pageNum);
      else next.add(pageNum);
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => setSelected(new Set()), []);

  const selectAll = useCallback(() => {
    setSelected(() => {
      const all = new Set<number>();
      for (let i = 1; i <= pageCount; i++) all.add(i);
      return all;
    });
  }, [pageCount]);

  const invertSelection = useCallback(() => {
    setSelected(prev => {
      const next = new Set<number>();
      for (let i = 1; i <= pageCount; i++) {
        if (!prev.has(i)) next.add(i);
      }
      return next;
    });
  }, [pageCount]);

  const processQueue = useCallback(() => {
    const startRender = async (pageNum: number) => {
      try {
        const doc = pdfDocRef.current;
        const canvas = canvasByPageRef.current.get(pageNum);
        if (!doc || !canvas) return;

        const page = await doc.getPage(pageNum);
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = Math.min(1.5, THUMB_WIDTH_PX / baseViewport.width);
        const viewport = page.getViewport({ scale });

        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const context = canvas.getContext('2d', { alpha: false });
        if (!context) return;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        renderedPagesRef.current.add(pageNum);
      } catch {
        // Ignore individual page render failures to avoid blocking the rest
      } finally {
        inflightRef.current -= 1;
        void processQueue();
      }
    };

    while (inflightRef.current < RENDER_CONCURRENCY && queueRef.current.length > 0) {
      const pageNum = queueRef.current.shift()!;
      queuedPagesRef.current.delete(pageNum);
      if (renderedPagesRef.current.has(pageNum)) continue;

      inflightRef.current += 1;
      void startRender(pageNum);
    }
  }, []);

  const enqueueRender = useCallback((pageNum: number) => {
    if (renderedPagesRef.current.has(pageNum)) return;
    if (queuedPagesRef.current.has(pageNum)) return;
    queuedPagesRef.current.add(pageNum);
    queueRef.current.push(pageNum);
    void processQueue();
  }, [processQueue]);

  const registerCanvas = useCallback((pageNum: number, canvas: HTMLCanvasElement | null) => {
    if (!canvas) {
      canvasByPageRef.current.delete(pageNum);
      return;
    }
    canvasByPageRef.current.set(pageNum, canvas);
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const pageNum = Number((entry.target as HTMLElement).dataset.page || '0');
          if (pageNum > 0) enqueueRender(pageNum);
        }
      },
      {
        root: gridRef.current,
        rootMargin: '400px 0px',
        threshold: 0.01,
      }
    );

    const observer = observerRef.current;
    gridRef.current.querySelectorAll<HTMLElement>('[data-page]').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [enqueueRender, pageCount]);

  const handleFileSelect = useCallback(async (file: File) => {
    setDocError(null);
    setIsLoadingDoc(true);
    setPdfFile(file);
    setSelected(new Set());
    renderedPagesRef.current = new Set();
    queuedPagesRef.current = new Set();
    queueRef.current = [];
    inflightRef.current = 0;

    try {
      const data = await file.arrayBuffer();
      setPdfData(data);
      void saveWorkspacePdf(WORKSPACE_KEY, file.name, data).catch(() => {});
      setCachedPdf({ fileName: file.name, blob: new Blob([data], { type: 'application/pdf' }), updatedAt: Date.now() });

      const pdfjsLib = await loadPdfJs();
      const task = pdfjsLib.getDocument({
        data,
        cMapUrl: '/assets/js/pdfjs/cmaps/',
        cMapPacked: true,
        standardFontDataUrl: '/assets/js/pdfjs/standard_fonts/',
        enableXfa: true,
      });

      const doc = await task.promise;
      setPdfDoc(doc);
      setPageCount(doc.numPages || 0);
    } catch (e: unknown) {
      setDocError(e instanceof Error ? e.message : 'Failed to load PDF');
      setPdfDoc(null);
      setPageCount(0);
    } finally {
      setIsLoadingDoc(false);
    }
  }, []);

  const handleResumeCached = useCallback(async () => {
    if (!cachedPdf) return;
    const arrayBuffer = await cachedPdf.blob.arrayBuffer();
    const file = new File([arrayBuffer], cachedPdf.fileName, { type: 'application/pdf' });
    await handleFileSelect(file);
  }, [cachedPdf, handleFileSelect]);

  const handleClearCached = useCallback(async () => {
    try {
      await deleteWorkspacePdf(WORKSPACE_KEY);
    } finally {
      setCachedPdf(null);
    }
  }, []);

  const outputName = useMemo(() => {
    const base = normalizeBaseName(pdfFile?.name || 'document.pdf');
    return `${base}_pages_deleted.pdf`;
  }, [pdfFile]);

  const applyDelete = useCallback(async () => {
    if (!pdfData || !pdfFile) return;
    if (selected.size === 0) return;

    setIsApplying(true);
    try {
      const src = await PDFDocument.load(pdfData, { ignoreEncryption: true });
      const total = src.getPageCount();

      const keepIndexes: number[] = [];
      for (let i = 0; i < total; i++) {
        const pageNum = i + 1;
        if (!selected.has(pageNum)) keepIndexes.push(i);
      }

      if (keepIndexes.length === 0) {
        throw new Error('Cannot delete all pages. Keep at least one page.');
      }

      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, keepIndexes);
      pages.forEach(p => out.addPage(p));

      const bytes = await out.save();
      const safeBytes = new Uint8Array(bytes);
      const blob = new Blob([safeBytes], { type: 'application/pdf' });
      downloadBlob(blob, outputName);
      void saveWorkspacePdf(WORKSPACE_KEY, outputName, blob).catch(() => {});
      setCachedPdf({ fileName: outputName, blob, updatedAt: Date.now() });
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Failed to apply deletion');
    } finally {
      setIsApplying(false);
    }
  }, [pdfData, pdfFile, outputName, selected]);

  if (!pdfFile || !pdfData) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h1 className="text-4xl font-bold">Delete PDF Pages</h1>
            <p className="text-lg text-muted-foreground">
              Select pages you want to remove and click Done. Everything runs locally in your browser.
            </p>
          </div>

          <div className="mt-10">
            {cachedPdf && (
              <div className="max-w-2xl mx-auto mb-4 p-4 border rounded-lg bg-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">
                      Use your last document
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
              <div className="max-w-2xl mx-auto mb-4 text-center text-sm text-gray-500">
                Checking local cache…
              </div>
            )}
            <FileUpload onFileSelect={handleFileSelect} maxSizeMB={200} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#f5f5f5] overflow-hidden">
      <header className="bg-white border-b border-gray-200 h-14 flex items-center px-4 justify-between flex-shrink-0">
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center flex-shrink-0">
            <span className="text-primary font-bold text-xl">PDF</span>
            <span className="font-bold text-xl text-gray-900">Tools</span>
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">{pdfFile.name}</div>
            <div className="text-xs text-gray-500">{pageCount ? `${pageCount} pages` : 'Loading…'}</div>
          </div>
        </div>

        <button
          onClick={applyDelete}
          disabled={isApplying || selected.size === 0 || isLoadingDoc || !pageCount}
          className="bg-primary disabled:bg-gray-300 hover:bg-primary/90 text-white px-6 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Done
        </button>
      </header>

      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <div className="text-sm text-gray-700">
          Selected to delete: <span className="font-semibold">{selected.size}</span>
        </div>
        <button
          onClick={selectAll}
          className="text-sm text-gray-700 hover:text-gray-900 px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-50"
        >
          Select all
        </button>
        <button
          onClick={invertSelection}
          className="text-sm text-gray-700 hover:text-gray-900 px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-50"
        >
          Invert
        </button>
        <button
          onClick={clearSelection}
          className="text-sm text-gray-700 hover:text-gray-900 px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-50"
        >
          Clear
        </button>

        <div className="flex-1" />

        {docError && (
          <div className="text-sm text-red-600">
            {docError}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-hidden">
        <div
          ref={gridRef}
          className="h-full overflow-auto p-4"
        >
          {isLoadingDoc && (
            <div className="text-sm text-gray-600 mb-4">
              Loading PDF…
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map(pageNum => {
              const isSelected = selected.has(pageNum);
              return (
                <button
                  key={pageNum}
                  type="button"
                  data-page={pageNum}
                  onClick={() => toggleSelected(pageNum)}
                  className={[
                    'group relative bg-white rounded-lg border overflow-hidden text-left',
                    isSelected ? 'border-primary ring-2 ring-primary/30' : 'border-gray-200 hover:border-gray-300',
                  ].join(' ')}
                  style={{ width: THUMB_WIDTH_PX + 24 }}
                >
                  <div className="p-3 flex items-center justify-between">
                    <div className="text-xs text-gray-600">Page {pageNum}</div>
                    <div
                      className={[
                        'w-5 h-5 rounded border flex items-center justify-center',
                        isSelected ? 'bg-primary border-primary text-white' : 'bg-white border-gray-300 text-transparent group-hover:text-gray-400',
                      ].join(' ')}
                      aria-hidden="true"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  <div className="px-3 pb-3 flex justify-center">
                    <canvas
                      ref={(el) => registerCanvas(pageNum, el)}
                      className="bg-white shadow-sm rounded"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
