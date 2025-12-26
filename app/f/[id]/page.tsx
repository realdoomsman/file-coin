'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { formatBytes, formatDate } from '@/lib/utils';
import { FileRecord } from '@/lib/supabase';

export default function FilePage() {
  const params = useParams();
  const router = useRouter();
  const [file, setFile] = useState<FileRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const fetchFile = async () => {
    try {
      const response = await fetch(`/api/f/${params.id}`);
      if (!response.ok) {
        setFile(null);
        return;
      }
      const data = await response.json();
      setFile(data);
    } catch (error) {
      console.error('Error fetching file:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = () => {
    if (file?.url) {
      window.open(file.url, '_blank');
    }
  };

  const copyLink = () => {
    const link = `${window.location.origin}/f/${params.id}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">loading file...</p>
        </div>
      </main>
    );
  }

  if (!file) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 font-caveat">file not found</h1>
          <p className="text-gray-600 mb-6">this file does not exist or has been removed.</p>
          <button
            onClick={() => router.push('/upload')}
            className="btn-sketch"
          >
            upload a file
          </button>
        </div>
      </main>
    );
  }

  // Check if it's an image
  const isImage = file.original_filename.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i);

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-caveat">{file.original_filename}</h1>
          <p className="text-gray-500 text-sm mt-1">
            uploaded {formatDate(file.created_at)}
          </p>
        </div>

        {/* Image Preview */}
        {isImage && (
          <div className="sketch-border bg-white p-4 mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={file.url} 
              alt={file.original_filename}
              className="max-w-full h-auto mx-auto"
              style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
          </div>
        )}

        {/* File Info */}
        <div className="sketch-border bg-white p-6 mb-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">file name</p>
              <p className="font-bold">{file.original_filename}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">size</p>
              <p className="font-bold">{formatBytes(file.size_bytes)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">storage</p>
              <p className="font-bold">{file.storage_provider === 'solana' ? 'on-chain (permanent)' : 'cloud'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">short link</p>
              <p className="font-bold font-mono text-sm">/f/{params.id}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button onClick={downloadFile} className="btn-sketch">
            download
          </button>
          <button onClick={copyLink} className="btn-outline">
            {copied ? 'copied' : 'copy link'}
          </button>
        </div>

        {/* Direct URL */}
        <div className="mt-8 sketch-border bg-white p-4">
          <p className="text-sm text-gray-500 mb-2">direct url</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={file.url}
              readOnly
              className="flex-1 border-2 border-black px-3 py-2 text-sm bg-gray-50 font-mono"
            />
            <button
              onClick={() => navigator.clipboard.writeText(file.url)}
              className="px-4 py-2 border-2 border-black bg-gray-100 hover:bg-gray-200 font-bold transition"
            >
              copy
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
