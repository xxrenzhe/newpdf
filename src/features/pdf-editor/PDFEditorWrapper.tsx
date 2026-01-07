'use client';

import { usePDFEditor } from './usePDFEditor';
import { UnifiedToolbar } from './Toolbar';
import type { PDFEditorWrapperProps } from './types';
import { useState, useEffect } from 'react';
// PDF编辑器样式将在运行时加载

export function PDFEditorWrapper(props: PDFEditorWrapperProps) {
  const { className = '', useReactToolbar = true, onReady, hideToolbarDownload = false } = props;
  const { containerRef, editorRef, isLoading, isReady, error, instanceKey } = usePDFEditor(props);
  const [showSuccess, setShowSuccess] = useState(false);

  // Check if we're in PDF Guru mode (parent has pdf-guru-mode class)
  const isGuruMode = typeof window !== 'undefined' &&
    containerRef.current?.closest('.pdf-guru-mode') !== null;

  // Show success message when editor is ready (only if not in guru mode)
  useEffect(() => {
    if (isReady && !isLoading && !isGuruMode) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isReady, isLoading, isGuruMode]);

  useEffect(() => {
    if (!isReady) return;
    onReady?.(editorRef.current);
  }, [isReady, onReady, editorRef]);

  if (error) {
    return (
      <div className={`pdf-editor-error p-8 text-center ${className}`}>
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-br from-red-50 to-red-100">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Failed to load PDF editor
            </h2>
            <p className="text-gray-600 text-center mb-4">
              {error.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`pdf-editor-container relative ${className}`}
      style={{ height: '100%', width: '100%' }}
    >
      {/* Success notification - only show when not in guru mode */}
      {showSuccess && !isGuruMode && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="bg-green-50 border border-green-200 rounded-lg shadow-lg p-4 flex items-center gap-3">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-green-800 font-medium">PDF editor ready!</span>
          </div>
        </div>
      )}

      {/* React UnifiedToolbar - shown when ready and useReactToolbar is true */}
      {useReactToolbar && isReady && (
        <UnifiedToolbar
          editorRef={editorRef}
          instanceKey={instanceKey}
          hideDownload={hideToolbarDownload}
          className={isGuruMode ? 'hidden' : ''}
        />
      )}

      {/* Legacy toolbar container - always present for editor initialization, hidden when React toolbar is active */}
      <div
        id="pdf-toolbar"
        className="pdf-toolbar"
        style={{
          display: useReactToolbar && isReady ? 'none' : 'block',
          visibility: isLoading ? 'hidden' : 'visible'
        }}
      ></div>

      {/* PDF Wrapper - Main layout container */}
      <div
        className="pdf-wrapper"
        style={{
          visibility: isLoading ? 'hidden' : 'visible',
          height: '100%',
          display: 'flex',
          position: 'relative',
        }}
      >
        {/* Left Slider Controls */}
        <div className="pdf-left-slider">
          <div id="pdf_thumbs_slider" className="slide-item">
            <img src="/assets/img/sideshow.svg" width={20} height={20} alt="Thumbnails" />
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
        <div className="pdf-main-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div id="pdf-el-actions-wrapper" className="pdf-el-actions-wrapper fixed-top">
            <div id="pdf-el-actions" className="pdf-el-actions"></div>
          </div>
          <div id="pdf-main" className="pdf-viewer pdf-main-box" style={{ flex: 1, overflow: 'auto' }}></div>
        </div>

        {/* Right-side panels (History / Forms) required by pdfeditor */}
        <div id="history_wrapper" className="history-wrapper" style={{ height: '100%' }}>
          <div className="history-title">
            <span>History</span>
          </div>
          <div className="history-box"></div>
          <div className="history-remove-btn">Remove all</div>
        </div>

        <div id="forms_wrapper" className="history-wrapper" style={{ height: '100%' }}>
          <div className="history-title">
            <span>Forms</span>
          </div>
          <div className="history-box">
            <div className="history-page">
              <div className="history-page-title">Standard</div>
              <div className="history-list forms-box">
                <div className="history-item forms_textfield" data-value="Text">
                  <div className="history-item-icon">
                    <img src="/assets/img/forms/text.svg" alt="Text" />
                  </div>
                  <div className="history-item-text">Text</div>
                </div>
                <div className="history-item forms_sign">
                  <div className="history-item-icon">
                    <img src="/assets/img/forms/signature.svg" alt="Signature" />
                  </div>
                  <div className="history-item-text">Signature</div>
                </div>
                <div className="history-item forms_date" data-value="DD/MM/YY">
                  <div className="history-item-icon">
                    <img src="/assets/img/forms/date.svg" alt="Date" />
                  </div>
                  <div className="history-item-text">Date</div>
                </div>
                <div className="history-item forms_checkbox">
                  <div className="history-item-icon">
                    <img src="/assets/img/forms/checkbox.svg" alt="Checkbox" />
                  </div>
                  <div className="history-item-text">Checkbox</div>
                </div>
                <div className="history-item forms_radiogroup">
                  <div className="history-item-icon">
                    <img src="/assets/img/forms/radio_button.svg" alt="Radio" />
                  </div>
                  <div className="history-item-text">Radio</div>
                </div>
                <div className="history-item forms_dropdown" data-value="Option 1|Option 2|Option 3">
                  <div className="history-item-icon">
                    <img src="/assets/img/forms/dropdown.svg" alt="Dropdown" />
                  </div>
                  <div className="history-item-text">Dropdown</div>
                </div>
              </div>
            </div>

            <div className="history-page">
              <div className="history-page-title">Templates</div>
              <div className="history-list forms-box">
                <div className="history-item forms_textfield" data-value="Full name">
                  <div className="history-item-icon">
                    <img src="/assets/img/forms/name.svg" alt="Name" />
                  </div>
                  <div className="history-item-text">Name</div>
                </div>
                <div className="history-item forms_textfield" data-value="Email">
                  <div className="history-item-icon">
                    <img src="/assets/img/forms/email.svg" alt="Email" />
                  </div>
                  <div className="history-item-text">Email</div>
                </div>
                <div className="history-item forms_textfield" data-value="Phone number">
                  <div className="history-item-icon">
                    <img src="/assets/img/forms/phone_number.svg" alt="Phone" />
                  </div>
                  <div className="history-item-text">Phone</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pdf-right-slider">
          <div id="history_slider" className="slide-item" title="History">
            <img src="/assets/img/history.svg" alt="History" />
            <span>0</span>
          </div>
          <div id="forms_slider" className="slide-item" title="Forms">
            <img src="/assets/img/forms.svg" alt="Forms" />
          </div>
        </div>
      </div>

      {/* Loading overlay with enhanced feedback */}
      {isLoading && (
        <div className="pdf-editor-loading absolute inset-0 flex items-center justify-center bg-[#525659] z-50">
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
                  <div className="absolute inset-1 bg-[#525659] rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-red-600 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Loading PDF</h3>
            <p className="text-gray-300 text-sm mb-4">Preparing your document...</p>
            <div className="flex justify-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Export hook for advanced usage
export { usePDFEditor } from './usePDFEditor';
export type { PDFEditorWrapperProps } from './types';
