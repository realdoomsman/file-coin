'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { formatBytes, formatDate, shortenAddress } from '@/lib/utils';
import { FileRecord } from '@/lib/supabase';

export default function FilePage() {
  const params = useParams();
  const router = useRouter();
  const { publicKey } = useWallet();
  const [file, setFile] = useState<FileRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const fetchFile = async () => {
    try {
      const response = await fetch(`/api/file/${params.id}`);
      const data = await response.json();
      setFile(data);
    } catch (error) {
      console.error('Error fetching file:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePublic = async () => {
    if (!file) return;
    setUpdating(true);

    try {
      const response = await fetch('/api/update-public', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileId: file.id,
          isPublic: !file.is_public,
          walletAddress: publicKey?.toBase58(),
        }),
      });

      if (response.ok) {
        setFile({ ...file, is_public: !file.is_public });
      }
    } catch (error) {
      console.error('Error updating file:', error);
    } finally {
      setUpdating(false);
    }
  };

  const downloadFile = () => {
    if (file?.url) {
      window.open(file.url, '_blank');
    }
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
          <button
            onClick={() => router.push('/app')}
            className="btn-sketch"
          >
            back to dashboard
          </button>
        </div>
      </main>
    );
  }

  const isOwner = publicKey?.toBase58() === file.owner_wallet;

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-8">
          <button
            onClick={() => router.push('/app')}
            className="text-[#b39700] hover:text-black mb-4 underline"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold">{file.original_filename}</h1>
        </div>

        <div className="sketch-border bg-white p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm text-gray-500 mb-1">file name</h3>
              <p className="font-bold">{file.original_filename}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">size</h3>
              <p className="font-bold">{formatBytes(file.size_bytes)}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">upload date</h3>
              <p className="font-bold">{formatDate(file.created_at)}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">owner</h3>
              <p className="font-bold font-mono text-sm">{shortenAddress(file.owner_wallet)}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">storage provider</h3>
              <p className="font-bold capitalize">{file.storage_provider}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">visibility</h3>
              <span className={`inline-block px-3 py-1 text-sm font-bold border-2 border-black ${
                file.is_public ? 'bg-green-200' : 'bg-gray-200'
              }`}>
                {file.is_public ? 'public' : 'private'}
              </span>
            </div>
          </div>

          {file.url && (
            <div className="mt-6 pt-6 border-t-2 border-gray-200">
              <h3 className="text-sm text-gray-500 mb-2">Direct URL</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={file.url}
                  readOnly
                  className="flex-1 border-2 border-black px-3 py-2 text-sm bg-gray-50"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(file.url)}
                  className="px-4 py-2 border-2 border-black bg-gray-100 hover:bg-gray-200 font-bold transition"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={downloadFile}
            className="btn-sketch"
          >
            Download File
          </button>
          
          {isOwner && (
            <button
              onClick={togglePublic}
              disabled={updating}
              className="btn-outline disabled:opacity-50"
            >
              {updating ? 'updating...' : file.is_public ? 'make private' : 'make public'}
            </button>
          )}
        </div>

        {!isOwner && !file.is_public && (
          <div className="mt-6 sketch-border-yellow p-4">
            <p>
              this file is private. you can view it because you have the direct link.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
