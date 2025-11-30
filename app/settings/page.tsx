'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { shortenAddress } from '@/lib/utils';

export default function SettingsPage() {
  const { publicKey, disconnect } = useWallet();
  const [theme, setTheme] = useState('dark');

  const handleDisconnect = () => {
    disconnect();
    window.location.href = '/';
  };

  if (!publicKey) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-gray-400">Please connect your Solana wallet to access settings</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400">Manage your File Coin account</p>
      </div>

      <div className="space-y-6">
        {/* Wallet Info */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h2 className="text-xl font-bold mb-4">Wallet</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Connected Wallet</label>
              <p className="font-mono text-lg">{shortenAddress(publicKey.toBase58(), 8)}</p>
            </div>
            <button
              onClick={handleDisconnect}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
            >
              Disconnect Wallet
            </button>
          </div>
        </div>

        {/* Theme */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h2 className="text-xl font-bold mb-4">Appearance</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 block mb-2">Theme</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-gray-800 px-4 py-2 rounded-lg w-full md:w-auto"
              >
                <option value="dark">Dark</option>
                <option value="light">Light (Coming Soon)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Storage Info */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h2 className="text-xl font-bold mb-4">Storage Plan</h2>
          <p className="text-gray-400 mb-4">
            Your storage tier is determined by your $FILE token holdings. 
            Acquire more tokens to automatically upgrade your storage limits.
          </p>
          <a
            href="/app"
            className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
          >
            View Storage Usage
          </a>
        </div>

        {/* Help */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h2 className="text-xl font-bold mb-4">Help & Support</h2>
          <div className="space-y-2">
            <a href="/docs" className="block text-purple-400 hover:text-purple-300">
              → Documentation
            </a>
            <a href="/lore" className="block text-purple-400 hover:text-purple-300">
              → Read The Lore
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
