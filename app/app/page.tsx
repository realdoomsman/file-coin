'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { shortenAddress, formatBytes, formatDate } from '@/lib/utils';
import { FileRecord } from '@/lib/supabase';

export default function AppPage() {
  const { publicKey, connected } = useWallet();
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [storageUsed, setStorageUsed] = useState(0);
  const [tier, setTier] = useState<'free' | 'holder' | 'whale'>('free');
  const [storageLimit, setStorageLimit] = useState(200 * 1024 * 1024);

  useEffect(() => {
    if (connected && publicKey) {
      fetchUserData();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, publicKey]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/api/files?wallet=${publicKey?.toBase58()}`);
      const data = await response.json();
      
      setFiles(data.files || []);
      setStorageUsed(data.storageUsed || 0);
      setTier(data.tier || 'free');
      setStorageLimit(data.storageLimit || 200 * 1024 * 1024);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (fileId: string) => {
    if (!confirm('delete this file?')) return;
    
    try {
      await fetch(`/api/file/${fileId}`, { method: 'DELETE' });
      fetchUserData();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  if (!connected) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-16 mx-auto mb-6 sketch-border bg-white flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Caveat, cursive' }}>connect your wallet</h1>
          <p className="text-gray-600 mb-6">
            connect your wallet to view your dashboard and manage your files.
          </p>
          <p className="text-gray-500 text-sm">
            you can still <Link href="/upload" className="underline hover:text-black">upload files</Link> without connecting.
          </p>
        </div>
      </main>
    );
  }

  const storagePercentage = (storageUsed / storageLimit) * 100;

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Caveat, cursive' }}>dashboard</h1>
          <p className="text-gray-600 font-mono text-sm">
            {shortenAddress(publicKey?.toBase58() || '')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {/* Storage Card */}
          <div className="sm:col-span-2 sketch-border bg-white p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-600 text-sm mb-1">storage used</p>
                <p className="text-2xl font-bold">{formatBytes(storageUsed)}</p>
              </div>
              <span className={`px-3 py-1 text-sm font-bold border-2 border-black ${
                tier === 'whale' ? 'bg-[#e6c200]' :
                tier === 'holder' ? 'bg-[#fff176]' :
                'bg-gray-100'
              }`}>
                {tier}
              </span>
            </div>
            <div className="mb-2">
              <div className="w-full bg-gray-200 border-2 border-black rounded h-4">
                <div
                  className={`h-full rounded transition-all ${
                    storagePercentage > 90 ? 'bg-red-500' :
                    storagePercentage > 70 ? 'bg-yellow-500' :
                    'bg-[#e6c200]'
                  }`}
                  style={{ width: `${Math.min(storagePercentage, 100)}%` }}
                />
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              {formatBytes(storageLimit - storageUsed)} remaining of {formatBytes(storageLimit)}
            </p>
          </div>

          {/* Files Count */}
          <div className="sketch-border bg-white p-6">
            <p className="text-gray-600 text-sm mb-1">total files</p>
            <p className="text-2xl font-bold">{files.length}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link href="/upload" className="btn-sketch">
            upload file
          </Link>
          <Link href="/explorer" className="btn-outline">
            explorer
          </Link>
          <Link href="/settings" className="btn-outline">
            settings
          </Link>
        </div>

        {/* Files Table */}
        <div className="sketch-border bg-white overflow-hidden">
          <div className="px-6 py-4 border-b-2 border-black">
            <h2 className="font-bold text-lg">your files</h2>
          </div>
          
          {loading ? (
            <div className="p-12 text-center">
              <p className="text-gray-600">loading...</p>
            </div>
          ) : files.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-12 mx-auto mb-4 sketch-border bg-gray-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-700 mb-2">no files yet</p>
              <p className="text-gray-500 text-sm mb-6">upload your first file to get started</p>
              <Link href="/upload" className="btn-sketch">
                upload file
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-left border-b-2 border-black">
                  <tr>
                    <th className="px-6 py-3 text-sm font-bold">name</th>
                    <th className="px-6 py-3 text-sm font-bold">size</th>
                    <th className="px-6 py-3 text-sm font-bold">date</th>
                    <th className="px-6 py-3 text-sm font-bold">status</th>
                    <th className="px-6 py-3 text-sm font-bold"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {files.map((file) => (
                    <tr key={file.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <Link href={`/file/${file.id}`} className="underline hover:text-[#b39700] transition">
                          {file.original_filename}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatBytes(file.size_bytes)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(file.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs border-2 border-black ${
                          file.is_public 
                            ? 'bg-green-100' 
                            : 'bg-gray-100'
                        }`}>
                          {file.is_public ? 'public' : 'private'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-4 justify-end">
                          <Link
                            href={`/file/${file.id}`}
                            className="text-sm underline hover:text-[#b39700] transition"
                          >
                            view
                          </Link>
                          <button
                            onClick={() => deleteFile(file.id)}
                            className="text-sm underline text-red-600 hover:text-red-800 transition"
                          >
                            delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
