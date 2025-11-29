'use client';

import { usePDFEditor } from './usePDFEditor';
import type { PDFEditorWrapperProps } from './types';
// PDF编辑器样式将在运行时加载

export function PDFEditorWrapper(props: PDFEditorWrapperProps) {
  const { className = '' } = props;
  const { containerRef, isLoading, isReady, error } = usePDFEditor(props);

  if (error) {
    return (
      <div className={`pdf-editor-error p-8 text-center ${className}`}>
        <div className="text-red-600 text-lg font-semibold mb-2">
          Failed to load PDF editor
        </div>
        <div className="text-gray-600">{error.message}</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`pdf-editor-container relative ${className}`}
      style={{ height: '100%', width: '100%' }}
    >
      {/* PDF Toolbar - Always render to ensure DOM exists */}
      <div id="pdf-toolbar" className="pdf-toolbar" style={{ visibility: isLoading ? 'hidden' : 'visible' }}></div>

      {/* PDF Wrapper - Main layout container */}
      <div className="pdf-wrapper" style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        {/* Left Slider Controls */}
        <div className="pdf-left-slider">
          <div id="pdf_thumbs_slider" className="slide-item">
            {/* Thumbnail toggle button */}
          </div>
        </div>

        {/* Thumbnails Wrapper */}
        <div id="pdf_thumbs_wrapper" className="pdf-thumbs-wrapper">
          <div className="pdf-thumbs-title">
            <span>Thumbnails</span>
            <button id="pdf_thumbs_close">×</button>
          </div>
          <div id="pdf-thumbs" className="pdf-thumbs"></div>
        </div>

        {/* Main PDF Viewer Area */}
        <div className="pdf-main-wrapper">
          <div id="pdf-el-actions-wrapper" className="pdf-el-actions-wrapper fixed-top">
            <div id="pdf-el-actions" className="pdf-el-actions"></div>
          </div>
          <div id="pdf-main" className="pdf-viewer pdf-main-box"></div>
        </div>
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="pdf-editor-loading absolute inset-0 flex items-center justify-center bg-white z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <div className="text-gray-600">Loading PDF editor...</div>
          </div>
        </div>
      )}
    </div>
  );
}

// Export hook for advanced usage
export { usePDFEditor } from './usePDFEditor';
export type { PDFEditorWrapperProps } from './types';
