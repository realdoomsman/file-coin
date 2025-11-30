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
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-gray-400">Loading file...</p>
        </div>
      </main>
    );
  }

  if (!file) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold mb-4">File Not Found</h1>
          <button
            onClick={() => router.push('/app')}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
          >
            Back to Dashboard
          </button>
        </div>
      </main>
    );
  }

  const isOwner = publicKey?.toBase58() === file.owner_wallet;

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <button
          onClick={() => router.push('/app')}
          className="text-purple-400 hover:text-purple-300 mb-4"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-4xl font-bold mb-2">{file.original_filename}</h1>
      </div>

      <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 mb-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm text-gray-400 mb-1">File Name</h3>
            <p className="font-semibold">{file.original_filename}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-400 mb-1">Size</h3>
            <p className="font-semibold">{formatBytes(file.size_bytes)}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-400 mb-1">Upload Date</h3>
            <p className="font-semibold">{formatDate(file.created_at)}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-400 mb-1">Owner</h3>
            <p className="font-semibold">{shortenAddress(file.owner_wallet)}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-400 mb-1">Storage Provider</h3>
            <p className="font-semibold capitalize">{file.storage_provider}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-400 mb-1">Visibility</h3>
            <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
              file.is_public ? 'bg-green-900/30 text-green-400' : 'bg-gray-800 text-gray-400'
            }`}>
              {file.is_public ? 'Public' : 'Private'}
            </span>
          </div>
        </div>

        {file.url && (
          <div className="mt-6 pt-6 border-t border-gray-800">
            <h3 className="text-sm text-gray-400 mb-2">Direct URL</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={file.url}
                readOnly
                className="flex-1 bg-gray-800 px-4 py-2 rounded text-sm"
              />
              <button
                onClick={() => navigator.clipboard.writeText(file.url)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded font-semibold transition"
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
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
        >
          Download File
        </button>
        
        {isOwner && (
          <button
            onClick={togglePublic}
            disabled={updating}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {updating ? 'Updating...' : file.is_public ? 'Make Private' : 'Make Public'}
          </button>
        )}
      </div>

      {!isOwner && !file.is_public && (
        <div className="mt-6 bg-yellow-900/20 border border-yellow-600 rounded p-4">
          <p className="text-yellow-400">
            This file is private. You can view it because you have the direct link.
          </p>
        </div>
      )}
    </main>
  );
}
