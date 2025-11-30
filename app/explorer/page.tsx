'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatBytes, formatDate, shortenAddress } from '@/lib/utils';
import { FileRecord } from '@/lib/supabase';

export default function ExplorerPage() {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchPublicFiles();
  }, []);

  const fetchPublicFiles = async () => {
    try {
      const response = await fetch('/api/explorer');
      const data = await response.json();
      setFiles(data.files || []);
    } catch (error) {
      console.error('Error fetching public files:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFiles = files.filter(file => {
    if (filter === 'all') return true;
    const ext = file.original_filename.split('.').pop()?.toLowerCase();
    
    if (filter === 'images') {
      return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '');
    }
    if (filter === 'documents') {
      return ['pdf', 'doc', 'docx', 'txt', 'md'].includes(ext || '');
    }
    if (filter === 'videos') {
      return ['mp4', 'mov', 'avi', 'webm'].includes(ext || '');
    }
    return true;
  });

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Public File Explorer</h1>
        <p className="text-gray-400">Browse files shared by the community</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            filter === 'all' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          All Files
        </button>
        <button
          onClick={() => setFilter('images')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            filter === 'images' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          Images
        </button>
        <button
          onClick={() => setFilter('documents')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            filter === 'documents' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          Documents
        </button>
        <button
          onClick={() => setFilter('videos')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            filter === 'videos' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          Videos
        </button>
      </div>

      {/* Files Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-gray-400">Loading files...</p>
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📁</div>
          <p className="text-gray-400">No public files found</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFiles.map((file) => (
            <Link
              key={file.id}
              href={`/file/${file.id}`}
              className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-purple-600 transition"
            >
              <div className="text-4xl mb-4">📄</div>
              <h3 className="font-semibold mb-2 truncate">{file.original_filename}</h3>
              <div className="space-y-1 text-sm text-gray-400">
                <p>Size: {formatBytes(file.size_bytes)}</p>
                <p>Uploaded: {formatDate(file.created_at)}</p>
                <p>By: {shortenAddress(file.owner_wallet)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
