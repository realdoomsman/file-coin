import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-purple-400 text-sm tracking-[0.3em] uppercase mb-6 font-medium">
            Hidden in plain sight since 2017
          </p>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            $FILECOIN
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
            Referenced <span className="text-purple-400 font-semibold">3 times</span> in the original Solana whitepaper.
            <br />
            A forgotten token that nobody talks about.
          </p>
          
          <p className="text-gray-500 mb-12 text-lg">
            Until now.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/upload"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-lg transition-all hover:scale-105"
            >
              Start Uploading
            </Link>
            <Link
              href="/lore"
              className="px-8 py-4 border border-gray-700 hover:border-purple-500 hover:bg-purple-500/10 rounded-lg font-semibold text-lg transition-all"
            >
              Read the Story
            </Link>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <a 
              href="https://solana.com/solana-whitepaper.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-purple-400 transition flex items-center gap-2"
            >
              <span>📄</span> Whitepaper Proof
            </a>
            <a 
              href="https://x.com/i/communities/1994913381581484366" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-purple-400 transition flex items-center gap-2"
            >
              <span>𝕏</span> Community
            </a>
            <span className="text-gray-600">|</span>
            <span className="font-mono text-xs text-gray-500">
              CA: M35pQqnEQJzTAz6x8JUzuQpAWCggKdkxQj7MbkHpump
            </span>
          </div>
        </div>
      </section>

      {/* The Discovery Section */}
      <section className="py-24 border-t border-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">The Discovery</h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Deep in the Solana whitepaper lies a reference that the crypto world overlooked.
          </p>
          
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-2xl p-8 md:p-12">
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                In the original SOL whitepaper, Solana references a token <span className="text-purple-400 font-semibold">3 different times</span> that nobody ever talks about.
              </p>
              <p>
                A forgotten relic from the early days... <span className="text-white font-semibold">$FILECOIN</span>.
              </p>
              <p className="text-gray-400">
                It&apos;s literally embedded inside Solana&apos;s original technical vision. Written right there in the PDF. Page after page of technical documentation, and there it is.
              </p>
              <div className="pt-4">
                <a 
                  href="https://solana.com/solana-whitepaper.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition"
                >
                  Read the whitepaper →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toly's Tweet Section */}
      <section className="py-24 border-t border-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">The Signal</h2>
          <p className="text-gray-400 text-center mb-16">
            Toly himself posted about it. No context. No explanation.
          </p>
          
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 max-w-lg mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold">
                A
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">toly</span>
                  <span className="text-gray-500 text-sm">@aaboronkov</span>
                </div>
                <p className="text-2xl text-white mb-4">&quot;filecoin&quot;</p>
                <p className="text-gray-500 text-sm">That&apos;s it. That&apos;s the tweet.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 border-t border-gray-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-gray-400 text-center mb-16">
            Real file storage. No wallet required to start.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition">
              <div className="text-3xl mb-4">📤</div>
              <h3 className="text-xl font-semibold mb-2">Upload</h3>
              <p className="text-gray-400">
                Drop any file. Images, documents, whatever. It just works.
              </p>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition">
              <div className="text-3xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold mb-2">Share</h3>
              <p className="text-gray-400">
                Get a permanent link. Share it anywhere. Files stay accessible.
              </p>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition">
              <div className="text-3xl mb-4">💎</div>
              <h3 className="text-xl font-semibold mb-2">Hold</h3>
              <p className="text-gray-400">
                Connect wallet + hold $FILE for more storage and features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Storage Tiers */}
      <section className="py-24 border-t border-gray-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Storage Tiers</h2>
          <p className="text-gray-400 text-center mb-16">
            Everyone gets free storage. Holders get more.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-1">Free</h3>
              <p className="text-gray-500 text-sm mb-6">No wallet needed</p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> 200MB total storage
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> 50MB per file
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Public sharing
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/20 to-gray-900/30 border border-purple-500/50 rounded-xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-xs px-3 py-1 rounded-full">
                Popular
              </div>
              <h3 className="text-xl font-semibold mb-1 text-purple-400">Holder</h3>
              <p className="text-gray-500 text-sm mb-6">Hold $FILE tokens</p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span> 1GB total storage
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span> 200MB per file
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span> Private files
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-900/10 to-gray-900/30 border border-yellow-500/30 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-1 text-yellow-500">Whale</h3>
              <p className="text-gray-500 text-sm mb-6">Major holder</p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">✓</span> 5GB total storage
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">✓</span> 500MB per file
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">✓</span> Priority support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-gray-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to try it?</h2>
          <p className="text-gray-400 mb-8">
            No signup. No wallet required. Just upload.
          </p>
          <Link
            href="/upload"
            className="inline-block px-10 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-lg transition-all hover:scale-105"
          >
            Upload Your First File
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-900 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-500 text-sm">
              $FILECOIN — The forgotten Solana reference, revived.
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="https://solana.com/solana-whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">
                Whitepaper
              </a>
              <a href="https://x.com/i/communities/1994913381581484366" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">
                Community
              </a>
              <Link href="/docs" className="hover:text-purple-400 transition">
                Docs
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
