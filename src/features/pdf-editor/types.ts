// TypeScript type definitions for PDFEditor vanilla JS library

export interface PDFReaderOptions {
  url?: string;
  data?: ArrayBuffer;
  main: HTMLElement | null;
  thumbs: HTMLElement | null;
}

export interface PDFEditorOptions {
  tools?: string[];
  toolbar?: HTMLElement | null;
  locale?: string;
}

export interface PDFReaderInstance {
  init(): Promise<void>;
  destroy(): void;
  getPageCount(): number;
  getCurrentPage(): number;
  goToPage(page: number): void;
  zoomIn(): void;
  zoomOut(): void;
  rotate(angle: number): void;
}

export interface PDFEditorInstance {
  init(): Promise<void>;
  destroy(): void;
  save(fileName?: string): Promise<Blob>;
  download(fileName?: string): void;
  undo(): void;
  redo(): void;
  clear(): void;
  addText(text: string, x: number, y: number): void;
  addImage(url: string, x: number, y: number): void;
  setActiveTool(tool: string): void;
}

export interface PDFEvent {
  on(event: string, callback: (e: unknown, data: unknown) => void): void;
  off(event: string, callback?: (e: unknown, data: unknown) => void): void;
  emit(event: string, data?: unknown): void;
}

export interface PDFFont {
  name: string;
  url: string;
  subset?: boolean;
}

// Global window types for pdfeditor
declare global {
  interface Window {
    pdfjsLib: unknown;
    PDFEvent: PDFEvent;
  }
}

// Export types for components
export type PDFToolType =
  | 'mouse'
  | 'hand'
  | 'text'
  | 'image'
  | 'highlight'
  | 'text_highlight'
  | 'underline'
  | 'strikethrough'
  | 'draw'
  | 'line'
  | 'eraser'
  | 'signature'
  | 'stamp'
  | 'link'
  | 'comment'
  | 'shape'
  | 'shapes'
  | 'ellipse'
  | 'circle'
  | 'rect'
  | 'arrow'
  | 'history'
  | 'pages'
  | 'insert_pages'
  | 'delete_pages'
  | 'download'
  | 'find'
  | 'watermark'
  | 'textbox'
  | 'textArt'
  | 'forms'
  | 'header_footer'
  | 'page_number'
  | 'seal'
  | 'radact';

export type PDFLocale = 'en' | 'zh' | 'ja' | 'ko' | 'es' | 'fr' | 'de' | 'pt' | 'ru';

export interface PDFEditorWrapperProps {
  pdfUrl?: string;
  pdfData?: ArrayBuffer;
  tools?: ReadonlyArray<PDFToolType>;
  locale?: PDFLocale;
  onSave?: (blob: Blob) => void;
  onError?: (error: Error) => void;
  onReady?: (editor: PDFEditorInstance | null) => void;
  className?: string;
  /** Use React-based UnifiedToolbar instead of legacy toolbar. Defaults to true. */
  useReactToolbar?: boolean;
  /** Hide the UnifiedToolbar download button (use a single "Done" CTA instead). */
  hideToolbarDownload?: boolean;
}
