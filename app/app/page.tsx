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
    if (!confirm('Delete this file?')) return;
    
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
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-3">Connect Your Wallet</h1>
          <p className="text-gray-400 mb-6">
            Connect your wallet to view your dashboard and manage your files.
          </p>
          <p className="text-gray-500 text-sm">
            You can still <Link href="/upload" className="text-purple-400 hover:text-purple-300">upload files</Link> without connecting.
          </p>
        </div>
      </main>
    );
  }

  const storagePercentage = (storageUsed / storageLimit) * 100;

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-500">
            {shortenAddress(publicKey?.toBase58() || '')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {/* Storage Card */}
          <div className="sm:col-span-2 bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-sm mb-1">Storage Used</p>
                <p className="text-2xl font-bold">{formatBytes(storageUsed)}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                tier === 'whale' ? 'bg-yellow-500/20 text-yellow-400' :
                tier === 'holder' ? 'bg-purple-500/20 text-purple-400' :
                'bg-gray-800 text-gray-400'
              }`}>
                {tier === 'whale' ? 'Whale' : tier === 'holder' ? 'Holder' : 'Free'}
              </span>
            </div>
            <div className="mb-2">
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    storagePercentage > 90 ? 'bg-red-500' :
                    storagePercentage > 70 ? 'bg-yellow-500' :
                    'bg-purple-500'
                  }`}
                  style={{ width: `${Math.min(storagePercentage, 100)}%` }}
                />
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              {formatBytes(storageLimit - storageUsed)} remaining of {formatBytes(storageLimit)}
            </p>
          </div>

          {/* Files Count */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <p className="text-gray-500 text-sm mb-1">Total Files</p>
            <p className="text-2xl font-bold">{files.length}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link
            href="/upload"
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition"
          >
            Upload File
          </Link>
          <Link
            href="/explorer"
            className="px-5 py-2.5 border border-gray-700 hover:border-gray-600 rounded-lg font-medium transition"
          >
            Explorer
          </Link>
          <Link
            href="/settings"
            className="px-5 py-2.5 border border-gray-700 hover:border-gray-600 rounded-lg font-medium transition"
          >
            Settings
          </Link>
        </div>

        {/* Files Table */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="font-semibold">Your Files</h2>
          </div>
          
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : files.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-400 mb-2">No files yet</p>
              <p className="text-gray-600 text-sm mb-6">Upload your first file to get started</p>
              <Link
                href="/upload"
                className="inline-block px-5 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition"
              >
                Upload File
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50 text-left">
                  <tr>
                    <th className="px-6 py-3 text-sm font-medium text-gray-400">Name</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-400">Size</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-400">Date</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-400">Status</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-400"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {files.map((file) => (
                    <tr key={file.id} className="hover:bg-gray-800/30 transition">
                      <td className="px-6 py-4">
                        <Link href={`/file/${file.id}`} className="text-purple-400 hover:text-purple-300 transition">
                          {file.original_filename}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatBytes(file.size_bytes)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(file.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          file.is_public 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-gray-800 text-gray-500'
                        }`}>
                          {file.is_public ? 'Public' : 'Private'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-4 justify-end">
                          <Link
                            href={`/file/${file.id}`}
                            className="text-sm text-gray-400 hover:text-white transition"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => deleteFile(file.id)}
                            className="text-sm text-gray-400 hover:text-red-400 transition"
                          >
                            Delete
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
