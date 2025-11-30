'use client';

import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Navbar() {
  const { connected } = useWallet();

  return (
    <nav className="border-b-2 border-purple-500 bg-gradient-to-r from-black via-purple-900/20 to-black backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:from-yellow-400 hover:to-orange-600 transition">
              💾 FILE COIN 💾
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link href="/lore" className="text-yellow-400 hover:text-yellow-300 transition font-semibold">
                📜 lore
              </Link>
              <Link href="/docs" className="text-green-400 hover:text-green-300 transition font-semibold">
                📖 docs
              </Link>
              {connected && (
                <>
                  <Link href="/app" className="text-purple-400 hover:text-purple-300 transition font-semibold">
                    💎 dashboard
                  </Link>
                  <Link href="/explorer" className="text-pink-400 hover:text-pink-300 transition font-semibold">
                    👀 explorer
                  </Link>
                </>
              )}
            </div>
          </div>
          <WalletMultiButton />
        </div>
      </div>
    </nav>
  );
}
