'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { formatBytes } from '@/lib/utils';

export default function UploadPage() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError('');
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      if (connected && publicKey) {
        formData.append('walletAddress', publicKey.toBase58());
      }

      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setProgress(100);
      setTimeout(() => {
        router.push(`/file/${data.id}`);
      }, 500);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
      setUploading(false);
    }
  };

  const maxFileSize = connected ? '200MB' : '50MB';
  const totalStorage = connected ? '1GB+' : '200MB';

  return (
    <main className="min-h-screen py-16">
      <div className="max-w-xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: 'Caveat, cursive' }}>upload a file</h1>
          <p className="text-gray-600">
            {connected 
              ? 'connected - enjoying holder benefits' 
              : 'no wallet needed. connect for more storage.'}
          </p>
        </div>

        {/* Upload Area */}
        <div className="sketch-border bg-white p-6">
          {!file ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-3 border-dashed rounded-lg p-12 text-center transition-all cursor-pointer ${
                isDragging 
                  ? 'border-[#e6c200] bg-[#fff9e0]' 
                  : 'border-gray-400 hover:border-gray-600'
              }`}
            >
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="w-20 h-16 mx-auto mb-6 sketch-border-yellow flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-xl font-bold mb-2">
                  drop your file here
                </p>
                <p className="text-gray-600 mb-4">
                  or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  max {maxFileSize} per file / {totalStorage} total storage
                </p>
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              {/* File Preview */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 border-2 border-gray-300 rounded">
                <div className="w-12 h-10 sketch-border-yellow flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">{file.name}</p>
                  <p className="text-sm text-gray-600">{formatBytes(file.size)}</p>
                </div>
                {!uploading && (
                  <button
                    onClick={() => setFile(null)}
                    className="text-gray-500 hover:text-black transition p-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Progress Bar */}
              {uploading && (
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>uploading...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 border-2 border-black rounded h-4">
                    <div
                      className="bg-[#e6c200] h-full rounded transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="sketch-border bg-red-50 p-4">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {/* Actions */}
              {!uploading && (
                <div className="flex gap-3">
                  <button onClick={handleUpload} className="btn-sketch flex-1">
                    upload
                  </button>
                  <button onClick={() => setFile(null)} className="btn-outline">
                    cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          <div className="sketch-border bg-white p-4">
            <h3 className="font-bold mb-2">supported files</h3>
            <p className="text-gray-600 text-sm">
              images, documents, videos, audio, archives - any file type works.
            </p>
          </div>
          <div className="sketch-border bg-white p-4">
            <h3 className="font-bold mb-2">privacy</h3>
            <p className="text-gray-600 text-sm">
              files are public by default. connect wallet for private uploads.
            </p>
          </div>
        </div>

        {/* Wallet Prompt */}
        {!connected && (
          <div className="mt-8 sketch-border-yellow p-6 text-center">
            <p className="font-bold mb-2">want more storage?</p>
            <p className="text-sm">
              connect your wallet and hold $FILE tokens for up to 5GB storage and 500MB file uploads.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
