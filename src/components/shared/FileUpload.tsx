"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FileUploadProps {
  onFileSelect?: (file: File) => void;
  maxSizeMB?: number;
}

export default function FileUpload({ onFileSelect, maxSizeMB = 100 }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleFile = useCallback(async (file: File) => {
    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    // Only accept PDF files for editing
    if (!file.type.includes('pdf')) {
      alert('Please select a PDF file');
      return;
    }

    setSelectedFile(file);

    // Pure frontend file handling - no server upload
    if (onFileSelect) {
      onFileSelect(file);
    }

    // Simulate processing for UI feedback
    setIsProcessing(true);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsProcessing(false);
      }
    }, 200);
  }, [maxSizeMB, onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setProgress(0);
    setIsProcessing(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`relative overflow-hidden rounded-3xl transition-all duration-300 ${
          isDragging
            ? "border-4 border-primary scale-105"
            : "border-2 border-dashed border-gray-200"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="gradient-orange p-12 rounded-3xl">
          {!selectedFile ? (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-white p-6 shadow-lg">
                  <Upload className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">
                Drop your files here
              </h3>
              <p className="text-white/90 text-sm mb-6">
                Size up to {maxSizeMB} MB • Files are processed locally in your browser
              </p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileInput}
                accept=".pdf"
              />
              <label htmlFor="file-upload">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 cursor-pointer"
                >
                  <span>Choose File</span>
                </Button>
              </label>
            </div>
          ) : (
            <div className="text-center">
              <div className="flex justify-center items-center mb-4">
                <FileText className="h-12 w-12 text-white" />
                <button
                  onClick={removeFile}
                  className="ml-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
              <p className="text-white font-medium mb-2">{selectedFile.name}</p>
              <p className="text-white/80 text-sm mb-4">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              {isProcessing && (
                <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-white h-full transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
              {!isProcessing && (
                <p className="text-white font-semibold">Processing complete!</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          By uploading file, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Use
          </Link>{" "}
          and acknowledge our{" "}
          <Link href="/privacy-policy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
