'use client';

import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';

export default function Navbar() {
  const { connected } = useWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-900 bg-black/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-lg font-semibold text-white hover:text-purple-400 transition">
            $FILECOIN
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/lore" className="text-gray-400 hover:text-white transition text-sm">
              Story
            </Link>
            <Link href="/upload" className="text-gray-400 hover:text-white transition text-sm">
              Upload
            </Link>
            <Link href="/explorer" className="text-gray-400 hover:text-white transition text-sm">
              Explorer
            </Link>
            {connected && (
              <Link href="/app" className="text-gray-400 hover:text-white transition text-sm">
                Dashboard
              </Link>
            )}
            <Link href="/docs" className="text-gray-400 hover:text-white transition text-sm">
              Docs
            </Link>
          </div>

          {/* Wallet Button */}
          <div className="flex items-center gap-4">
            <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-lg !h-10 !text-sm !font-medium" />
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-900">
            <div className="flex flex-col gap-4">
              <Link 
                href="/lore" 
                className="text-gray-400 hover:text-white transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Story
              </Link>
              <Link 
                href="/upload" 
                className="text-gray-400 hover:text-white transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Upload
              </Link>
              <Link 
                href="/explorer" 
                className="text-gray-400 hover:text-white transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explorer
              </Link>
              {connected && (
                <Link 
                  href="/app" 
                  className="text-gray-400 hover:text-white transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <Link 
                href="/docs" 
                className="text-gray-400 hover:text-white transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
