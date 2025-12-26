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
      if (!response.ok) {
        console.error('Failed to fetch files');
        setFiles([]);
        return;
      }
      const data = await response.json();
      setFiles(data.files || []);
    } catch (error) {
      console.error('Error fetching public files:', error);
      setFiles([]);
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
    <main className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Caveat, cursive' }}>explorer</h1>
          <p className="text-gray-600">browse public files shared by the community</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['all', 'images', 'documents', 'videos'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm border-2 border-black transition ${
                filter === f 
                  ? 'bg-[#e6c200] shadow-[3px_3px_0_rgba(0,0,0,0.2)]' 
                  : 'bg-white hover:bg-gray-50'
              }`}
              style={{ borderRadius: '2px 6px 2px 8px' }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Files Grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-600">loading files...</p>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-16 mx-auto mb-4 sketch-border bg-white flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-700 mb-2">no public files yet</p>
            <p className="text-gray-500 text-sm">be the first to share something</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFiles.map((file) => (
              <Link
                key={file.id}
                href={`/file/${file.id}`}
                className="sketch-border bg-white p-4 hover:bg-gray-50 transition group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-8 sketch-border-yellow flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold truncate mb-1 group-hover:text-[#b39700] transition">
                      {file.original_filename}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{formatBytes(file.size_bytes)}</span>
                      <span>-</span>
                      <span>{formatDate(file.created_at)}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 font-mono">
                      {shortenAddress(file.owner_wallet)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
