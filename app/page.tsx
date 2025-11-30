import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-bounce inline-block transform hover:rotate-180 transition-transform duration-500">
            💾
          </div>
          <div className="text-8xl mb-6 animate-spin inline-block mx-4">
            🤡
          </div>
          <div className="text-8xl mb-6 animate-bounce inline-block transform hover:-rotate-180 transition-transform duration-500">
            💾
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-600 via-yellow-400 via-green-400 to-blue-400 text-transparent bg-clip-text animate-pulse font-comic transform hover:scale-110 transition-transform">
            f i l e c o i n
          </h1>
          
          <div className="text-3xl md:text-5xl mb-4 font-comic animate-wiggle">
            <span className="text-red-400">w</span>
            <span className="text-orange-400">e</span>
            <span className="text-yellow-400"> </span>
            <span className="text-green-400">p</span>
            <span className="text-blue-400">u</span>
            <span className="text-purple-400">t</span>
            <span className="text-pink-400"> </span>
            <span className="text-red-400">u</span>
            <span className="text-orange-400">r</span>
            <span className="text-yellow-400"> </span>
            <span className="text-green-400">f</span>
            <span className="text-blue-400">i</span>
            <span className="text-purple-400">l</span>
            <span className="text-pink-400">e</span>
            <span className="text-red-400">s</span>
            <span className="text-orange-400"> </span>
            <span className="text-yellow-400">o</span>
            <span className="text-green-400">n</span>
            <span className="text-blue-400"> </span>
            <span className="text-purple-400">t</span>
            <span className="text-pink-400">h</span>
            <span className="text-red-400">e</span>
            <span className="text-orange-400"> </span>
            <span className="text-yellow-400">b</span>
            <span className="text-green-400">l</span>
            <span className="text-blue-400">o</span>
            <span className="text-purple-400">c</span>
            <span className="text-pink-400">k</span>
            <span className="text-red-400">c</span>
            <span className="text-orange-400">h</span>
            <span className="text-yellow-400">a</span>
            <span className="text-green-400">i</span>
            <span className="text-blue-400">n</span>
          </div>
          
          <p className="text-2xl text-gray-300 mb-4 font-comic">
            (or whatever idk how it works tbh)
          </p>
          
          <div className="bg-red-600 border-4 border-yellow-400 p-4 inline-block transform rotate-2 mb-4 animate-pulse">
            <p className="text-2xl font-black text-white font-comic">
              ⚠️⚠️⚠️ THIS ACTUALLY WORKS ⚠️⚠️⚠️
            </p>
            <p className="text-lg text-yellow-200 font-comic">
              (we&apos;re shocked too)
            </p>
          </div>
          
          <p className="text-xl text-gray-400 mb-2 font-comic">
            toly said &quot;filecoin&quot; 3 times in the solana whitepaper
          </p>
          <p className="text-lg text-gray-500 mb-8 font-comic">
            nobody noticed. we did. we built this. why? idk lol
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/app"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-lg transition transform hover:scale-110 hover:rotate-1 shadow-lg"
            >
              🚀 YOLO LAUNCH APP 🚀
            </Link>
            <Link
              href="/lore"
              className="px-8 py-4 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-bold text-lg transition transform hover:scale-110 hover:-rotate-1"
            >
              📜 THE LORE (it&apos;s real)
            </Link>
            <Link
              href="/docs"
              className="px-8 py-4 border-2 border-green-500 hover:bg-green-500 hover:text-black rounded-lg font-bold text-lg transition"
            >
              📖 RTFM
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            (yes this is a real app, no we don&apos;t know why it works)
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">why does this exist???</h2>
        <p className="text-center text-gray-400 mb-12">honestly we&apos;re not sure either</p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-purple-900/50 to-gray-900 p-6 rounded-lg border-2 border-purple-500 transform hover:rotate-2 transition">
            <div className="text-4xl mb-4">📜🔍</div>
            <h3 className="text-xl font-bold mb-2 text-yellow-400">The Whitepaper Easter Egg</h3>
            <p className="text-gray-300">
              toly said &quot;filecoin&quot; THREE TIMES in the solana whitepaper. we counted. twice. maybe three times. we lost count.
            </p>
          </div>
          <div className="bg-gradient-to-br from-pink-900/50 to-gray-900 p-6 rounded-lg border-2 border-pink-500 transform hover:-rotate-2 transition">
            <div className="text-4xl mb-4">💾✨</div>
            <h3 className="text-xl font-bold mb-2 text-green-400">It Actually Works???</h3>
            <p className="text-gray-300">
              upload ur jpegs, pdfs, whatever. we store it. somehow. don&apos;t ask us how. no cap fr fr.
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900/50 to-gray-900 p-6 rounded-lg border-2 border-yellow-500 transform hover:rotate-2 transition">
            <div className="text-4xl mb-4">🪙🚀</div>
            <h3 className="text-xl font-bold mb-2 text-purple-400">Ponzinomics</h3>
            <p className="text-gray-300">
              hold $FILE tokens = more storage. it&apos;s literally that simple. we&apos;re not even joking.
            </p>
          </div>
        </div>
      </section>

      {/* Storage Tiers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">STORAGE TIERS (pay 2 win)</h2>
        <p className="text-center text-yellow-400 mb-12">⚠️ not financial advice ⚠️</p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-8 rounded-lg border-2 border-gray-600 hover:border-gray-400 transition">
            <h3 className="text-2xl font-bold mb-2">😐 Broke Tier</h3>
            <p className="text-gray-400 mb-4 text-sm">(for poors)</p>
            <ul className="space-y-2 text-gray-300">
              <li>✓ 200MB (like 2 memes)</li>
              <li>✓ 50MB per file</li>
              <li>✓ basic features</li>
              <li>✗ no respect</li>
            </ul>
            <p className="text-xs text-gray-500 mt-4">cost: $0 (ngmi)</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 p-8 rounded-lg border-2 border-purple-500 transform hover:scale-105 transition shadow-lg shadow-purple-500/50">
            <h3 className="text-2xl font-bold mb-2">😎 Holder Tier</h3>
            <p className="text-purple-400 mb-4 text-sm">(respectable)</p>
            <ul className="space-y-2 text-gray-300">
              <li>✓ 1GB (decent)</li>
              <li>✓ 200MB per file</li>
              <li>✓ priority uploads</li>
              <li>✓ some respect</li>
            </ul>
            <p className="text-xs text-purple-400 mt-4">cost: hold $FILE tokens</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 p-8 rounded-lg border-2 border-yellow-500 transform hover:scale-105 transition shadow-lg shadow-yellow-500/50 animate-pulse">
            <h3 className="text-2xl font-bold mb-2">🐋 WHALE TIER</h3>
            <p className="text-yellow-400 mb-4 text-sm">(GIGACHAD)</p>
            <ul className="space-y-2 text-gray-300">
              <li>✓ 5GB (MASSIVE)</li>
              <li>✓ 500MB per file</li>
              <li>✓ MAXIMUM FLEX</li>
              <li>✓ INFINITE RESPECT</li>
            </ul>
            <p className="text-xs text-yellow-400 mt-4">cost: LOTS of $FILE (wagmi)</p>
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm mt-8">
          * tiers are real, prices are made up, nothing matters
        </p>
      </section>

      {/* Meme Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-2 border-orange-500 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">⚠️ DISCLAIMER ⚠️</h2>
          <p className="text-xl text-gray-300 mb-4">
            this is a real app. it actually stores files. we&apos;re as surprised as you are.
          </p>
          <p className="text-gray-400 mb-4">
            built by degens, for degens. powered by copium and solana.
          </p>
          <div className="flex justify-center gap-4 text-4xl mt-6">
            <span>🤡</span>
            <span>💎</span>
            <span>🙌</span>
            <span>🚀</span>
            <span>🌙</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p className="text-lg mb-2">built on solana. inspired by autism. somehow works.</p>
            <p className="text-sm">not financial advice. not storage advice. not any advice really.</p>
            <p className="mt-4 text-xs">💾 FILE COIN 2024 💾</p>
            <p className="text-xs text-gray-600 mt-2">we are so back (or are we?)</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
