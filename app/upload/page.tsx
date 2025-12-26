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
      
      // Only include wallet if connected
      if (connected && publicKey) {
        formData.append('walletAddress', publicKey.toBase58());
      }

      // Simulate progress for better UX
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

  // Calculate limits based on connection status
  const maxFileSize = connected ? (publicKey ? '200MB' : '50MB') : '50MB';
  const totalStorage = connected ? '1GB+' : '200MB';

  return (
    <main className="min-h-screen py-16">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">Upload a File</h1>
          <p className="text-gray-400">
            {connected 
              ? 'Connected — enjoying holder benefits' 
              : 'No wallet needed. Connect for more storage.'}
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
          {!file ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                isDragging 
                  ? 'border-purple-500 bg-purple-500/10' 
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-white mb-2">
                  Drop your file here
                </p>
                <p className="text-gray-500 mb-4">
                  or click to browse
                </p>
                <p className="text-sm text-gray-600">
                  Max {maxFileSize} per file • {totalStorage} total storage
                </p>
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              {/* File Preview */}
              <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{file.name}</p>
                  <p className="text-sm text-gray-500">{formatBytes(file.size)}</p>
                </div>
                {!uploading && (
                  <button
                    onClick={() => setFile(null)}
                    className="text-gray-500 hover:text-gray-300 transition p-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Progress Bar */}
              {uploading && (
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Uploading...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Actions */}
              {!uploading && (
                <div className="flex gap-3">
                  <button
                    onClick={handleUpload}
                    className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all"
                  >
                    Upload
                  </button>
                  <button
                    onClick={() => setFile(null)}
                    className="px-6 py-3 border border-gray-700 hover:border-gray-600 rounded-lg font-semibold transition"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-5">
            <h3 className="font-medium text-white mb-2">Supported Files</h3>
            <p className="text-gray-500 text-sm">
              Images, documents, videos, audio, archives — any file type works.
            </p>
          </div>
          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-5">
            <h3 className="font-medium text-white mb-2">Privacy</h3>
            <p className="text-gray-500 text-sm">
              Files are public by default. Connect wallet for private uploads.
            </p>
          </div>
        </div>

        {/* Wallet Prompt */}
        {!connected && (
          <div className="mt-8 p-6 bg-purple-500/10 border border-purple-500/30 rounded-xl text-center">
            <p className="text-purple-300 mb-2">Want more storage?</p>
            <p className="text-gray-400 text-sm">
              Connect your wallet and hold $FILE tokens for up to 5GB storage and 500MB file uploads.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
