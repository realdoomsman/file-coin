'use client';

import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';

export default function Navbar() {
  const { connected } = useWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b-3 border-black bg-[#fffef5]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-black hover:text-[#b39700] transition">
            filecoin
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/lore" className="text-lg text-black hover:text-[#b39700] transition">
              story
            </Link>
            <Link href="/upload" className="text-lg text-black hover:text-[#b39700] transition">
              upload
            </Link>
            <Link href="/explorer" className="text-lg text-black hover:text-[#b39700] transition">
              explorer
            </Link>
            {connected && (
              <Link href="/app" className="text-lg text-black hover:text-[#b39700] transition">
                dashboard
              </Link>
            )}
            <Link href="/docs" className="text-lg text-black hover:text-[#b39700] transition">
              docs
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <WalletMultiButton />
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-black"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t-2 border-black">
            <div className="flex flex-col gap-4">
              <Link href="/lore" className="text-lg" onClick={() => setMobileMenuOpen(false)}>story</Link>
              <Link href="/upload" className="text-lg" onClick={() => setMobileMenuOpen(false)}>upload</Link>
              <Link href="/explorer" className="text-lg" onClick={() => setMobileMenuOpen(false)}>explorer</Link>
              {connected && <Link href="/app" className="text-lg" onClick={() => setMobileMenuOpen(false)}>dashboard</Link>}
              <Link href="/docs" className="text-lg" onClick={() => setMobileMenuOpen(false)}>docs</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
