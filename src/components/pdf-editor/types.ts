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
  save(): Promise<Blob>;
  download(): void;
  undo(): void;
  redo(): void;
  clear(): void;
  addText(text: string, x: number, y: number): void;
  addImage(url: string, x: number, y: number): void;
  setActiveTool(tool: string): void;
}

export interface PDFEvent {
  on(event: string, callback: (e: any, data: any) => void): void;
  off(event: string, callback?: (e: any, data: any) => void): void;
  emit(event: string, data?: any): void;
}

export interface PDFFont {
  name: string;
  url: string;
  subset?: boolean;
}

// Global window types for pdfeditor
declare global {
  interface Window {
    pdfjsLib: any;
    PDFEvent: PDFEvent;
  }
}

// Export types for components
export type PDFToolType =
  | 'text'
  | 'image'
  | 'highlight'
  | 'underline'
  | 'strikethrough'
  | 'draw'
  | 'eraser'
  | 'signature'
  | 'stamp'
  | 'link'
  | 'comment'
  | 'shape';

export type PDFLocale = 'en' | 'zh' | 'ja' | 'ko' | 'es' | 'fr' | 'de' | 'pt' | 'ru';

export interface PDFEditorWrapperProps {
  pdfUrl?: string;
  pdfData?: ArrayBuffer;
  tools?: PDFToolType[];
  locale?: PDFLocale;
  onSave?: (blob: Blob) => void;
  onError?: (error: Error) => void;
  className?: string;
}
