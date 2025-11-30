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
    if (!confirm('Are you sure you want to delete this file?')) return;
    
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
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-6 animate-spin">🔒🤡🔒</div>
          <h1 className="text-4xl font-bold mb-4 text-red-400">NGMI</h1>
          <p className="text-xl text-gray-300 mb-4">u gotta connect ur wallet first anon</p>
          <p className="text-gray-400">click that button up there 👆</p>
          <p className="text-sm text-yellow-400 mt-6">
            (this is literally a web3 app, what did u expect???)
          </p>
        </div>
      </main>
    );
  }

  const storagePercentage = (storageUsed / storageLimit) * 100;

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          💎 UR DASHBOARD 💎
        </h1>
        <p className="text-gray-400 text-lg">
          gm {shortenAddress(publicKey?.toBase58() || '')} 🫡
        </p>
        <p className="text-sm text-yellow-400 mt-1">
          (yes ur actually connected, crazy right?)
        </p>
      </div>

      {/* Storage Usage Card */}
      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-lg border-2 border-purple-500 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-yellow-400">📊 UR STORAGE 📊</h2>
          <span className={`px-4 py-2 rounded-full text-sm font-bold animate-pulse ${
            tier === 'whale' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black' :
            tier === 'holder' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
            'bg-gray-800 text-gray-400'
          }`}>
            {tier === 'whale' ? '🐋 WHALE 🐋' : tier === 'holder' ? '😎 HOLDER 😎' : '😐 BROKE 😐'}
          </span>
        </div>
        <div className="mb-2">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>{formatBytes(storageUsed)} used</span>
            <span>{formatBytes(storageLimit)} total</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all ${
                storagePercentage > 90 ? 'bg-red-600' :
                storagePercentage > 70 ? 'bg-yellow-600' :
                'bg-purple-600'
              }`}
              style={{ width: `${Math.min(storagePercentage, 100)}%` }}
            />
          </div>
        </div>
        <p className="text-sm text-gray-300 mt-4 font-semibold">
          {tier === 'free' && '💸 buy some $FILE tokens to upgrade ur tier (pay 2 win baby)'}
          {tier === 'holder' && '😎 respectable. u got the holder tier. not bad anon.'}
          {tier === 'whale' && '🐋 GIGACHAD DETECTED. MAXIMUM STORAGE UNLOCKED. WAGMI.'}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Link
          href="/upload"
          className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-lg font-bold text-lg transition transform hover:scale-105"
        >
          🚀 UPLOAD FILE 🚀
        </Link>
        <Link
          href="/explorer"
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-lg transition transform hover:scale-105"
        >
          👀 SPY ON OTHERS 👀
        </Link>
        <Link
          href="/settings"
          className="px-8 py-4 border-2 border-yellow-500 hover:bg-yellow-500 hover:text-black rounded-lg font-bold text-lg transition"
        >
          ⚙️ SETTINGS
        </Link>
      </div>

      {/* Files Table */}
      <div className="bg-gradient-to-br from-gray-900 to-purple-900/20 rounded-lg border-2 border-purple-500 overflow-hidden">
        <div className="p-6 border-b-2 border-purple-500 bg-black/50">
          <h2 className="text-3xl font-bold text-yellow-400">📁 UR FILES 📁</h2>
          <p className="text-sm text-gray-400 mt-1">(the stuff u uploaded)</p>
        </div>
        
        {loading ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4 animate-spin">⏳</div>
            <p className="text-gray-400 text-xl">loading ur stuff...</p>
          </div>
        ) : files.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">📁❌</div>
            <p className="text-2xl text-gray-300 mb-2 font-bold">bruh u got no files</p>
            <p className="text-gray-400 mb-6">upload something already</p>
            <Link
              href="/upload"
              className="inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-lg font-bold text-lg transition transform hover:scale-105"
            >
              🚀 UPLOAD UR FIRST FILE 🚀
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Size</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Visibility</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {files.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <Link href={`/file/${file.id}`} className="text-purple-400 hover:text-purple-300">
                        {file.original_filename}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {formatBytes(file.size_bytes)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {formatDate(file.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        file.is_public ? 'bg-green-900/30 text-green-400' : 'bg-gray-800 text-gray-400'
                      }`}>
                        {file.is_public ? 'Public' : 'Private'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/file/${file.id}`}
                          className="text-sm text-purple-400 hover:text-purple-300"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => deleteFile(file.id)}
                          className="text-sm text-red-400 hover:text-red-300"
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
    </main>
  );
}
