'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatBytes } from '@/lib/utils';

export default function UploadPage() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!file || !publicKey) return;

    setUploading(true);
    setProgress(0);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('walletAddress', publicKey.toBase58());

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

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

  if (!connected) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-bounce">🔒❌🔒</div>
          <h1 className="text-4xl font-bold mb-4 text-red-400">BRUH</h1>
          <p className="text-xl text-gray-300 mb-4">u need to connect ur wallet first</p>
          <p className="text-gray-400">click the button in the top right corner</p>
          <p className="text-sm text-yellow-400 mt-4">(yes u actually need a wallet, this is web3 baby)</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          🚀 YEET UR FILES 🚀
        </h1>
        <p className="text-gray-400 text-lg">send it to the blockchain (or whatever)</p>
        <p className="text-yellow-400 text-sm mt-2">⚠️ no refunds ⚠️</p>
      </div>

      <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
        {!file ? (
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center hover:border-purple-600 transition">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-6xl mb-4 animate-bounce">📁💾📂</div>
              <p className="text-2xl font-bold mb-2 text-yellow-400">CLICK HERE TO UPLOAD</p>
              <p className="text-gray-400">or drag and drop or whatever idc</p>
              <p className="text-sm text-green-400 mt-2">(yes it actually works)</p>
            </label>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-semibold text-lg">{file.name}</p>
                  <p className="text-sm text-gray-400">{formatBytes(file.size)}</p>
                </div>
                {!uploading && (
                  <button
                    onClick={() => setFile(null)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                )}
              </div>

              {uploading && (
                <div>
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                    <div
                      className="bg-purple-600 h-3 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-400 text-center">
                    {progress === 100 ? 'Upload complete!' : 'Uploading...'}
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-red-900/20 border border-red-600 rounded p-4 mt-4">
                  <p className="text-red-400">{error}</p>
                </div>
              )}
            </div>

            {!uploading && (
              <div className="flex gap-4">
                <button
                  onClick={handleUpload}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-lg font-bold text-xl transition transform hover:scale-105"
                >
                  🚀 SEND IT 🚀
                </button>
                <button
                  onClick={() => router.push('/app')}
                  className="px-6 py-3 border-2 border-red-500 hover:bg-red-500 rounded-lg font-semibold transition"
                >
                  nah jk
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-6 rounded-lg border-2 border-purple-500">
        <h2 className="text-xl font-bold mb-4 text-yellow-400">📋 THE RULES (kinda)</h2>
        <ul className="space-y-2 text-gray-300">
          <li>✅ all file types work (probably)</li>
          <li>✅ files are private by default (we think)</li>
          <li>✅ u can make them public later (if u want)</li>
          <li>✅ storage limits = based on ur tier</li>
          <li>✅ hold $FILE tokens = more storage (pay 2 win)</li>
          <li>⚠️ don&apos;t upload anything illegal (pls)</li>
          <li>🤡 we&apos;re not responsible for anything tbh</li>
        </ul>
        <p className="text-xs text-gray-500 mt-4 italic">
          * these rules are more like guidelines really
        </p>
      </div>
    </main>
  );
}
