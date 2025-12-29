'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
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
              lore
            </Link>
            <Link href="/upload" className="text-lg text-black hover:text-[#b39700] transition">
              upload
            </Link>
            <Link href="/explorer" className="text-lg text-black hover:text-[#b39700] transition">
              explorer
            </Link>
            <Link href="/docs" className="text-lg text-black hover:text-[#b39700] transition">
              docs
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://x.com/i/communities/2005455614583988287" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-[#b39700] transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <Link href="/upload" className="btn-sketch hidden md:block">
              upload
            </Link>
            
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
              <Link href="/lore" className="text-lg" onClick={() => setMobileMenuOpen(false)}>lore</Link>
              <Link href="/upload" className="text-lg" onClick={() => setMobileMenuOpen(false)}>upload</Link>
              <Link href="/explorer" className="text-lg" onClick={() => setMobileMenuOpen(false)}>explorer</Link>
              <Link href="/docs" className="text-lg" onClick={() => setMobileMenuOpen(false)}>docs</Link>
              <a 
                href="https://x.com/i/communities/2005455614583988287" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                twitter
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
