import Link from 'next/link';

export default function LorePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-24 border-b border-gray-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-purple-400 text-sm tracking-[0.2em] uppercase mb-4">The Origin Story</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">The Forgotten Reference</h1>
          <p className="text-xl text-gray-400">
            How a buried whitepaper mention became something real.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <article className="prose prose-invert prose-lg max-w-none">
            
            {/* Chapter 1 */}
            <div className="mb-16">
              <p className="text-purple-400 text-sm tracking-wider uppercase mb-2">Chapter 1</p>
              <h2 className="text-2xl font-bold mb-6 text-white">The Whitepaper</h2>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                In the original Solana whitepaper, published in 2017, there&apos;s something most people missed. 
                Buried in the technical documentation, Solana references a token <strong className="text-white">three different times</strong> that 
                nobody ever talks about.
              </p>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                A forgotten relic from the early days: <strong className="text-purple-400">$FILECOIN</strong>.
              </p>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                It&apos;s literally embedded inside Solana&apos;s original technical vision. Written right there in the PDF. 
                Not hidden, not encrypted — just overlooked by everyone who read it.
              </p>
              
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 my-8">
                <p className="text-gray-400 text-sm mb-2">Source</p>
                <a 
                  href="https://solana.com/solana-whitepaper.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition break-all"
                >
                  solana.com/solana-whitepaper.pdf
                </a>
                <p className="text-gray-500 text-sm mt-3">
                  Search for &quot;filecoin&quot; in the document. It&apos;s there.
                </p>
              </div>
            </div>

            {/* Chapter 2 */}
            <div className="mb-16">
              <p className="text-purple-400 text-sm tracking-wider uppercase mb-2">Chapter 2</p>
              <h2 className="text-2xl font-bold mb-6 text-white">The Tweet</h2>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                Years later, Anatoly Yakovenko — Solana&apos;s co-founder — posted something cryptic on Twitter.
              </p>
              
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 my-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-white">toly</span>
                      <span className="text-gray-500 text-sm">@aaboronkov</span>
                    </div>
                    <p className="text-2xl text-white">&quot;filecoin&quot;</p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                No context. No explanation. No follow-up. Just one word and then silence.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                Was it alpha? A joke? A prophecy? Nobody knew. But the community remembered.
              </p>
            </div>

            {/* Chapter 3 */}
            <div className="mb-16">
              <p className="text-purple-400 text-sm tracking-wider uppercase mb-2">Chapter 3</p>
              <h2 className="text-2xl font-bold mb-6 text-white">The Revival</h2>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                So we built it.
              </p>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                Not trying to compete with IPFS or Arweave. This is different. This is a tribute to the 
                forgotten reference — a meme that became functional, a joke that actually works.
              </p>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                $FILECOIN is real file storage on Solana. Upload anything. Get a permanent link. 
                Hold the token for more storage.
              </p>
              
              <ul className="space-y-3 text-gray-300 my-8">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">→</span>
                  <span>The whitepaper mentioned it (3 times)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">→</span>
                  <span>Toly tweeted about it (cryptically)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">→</span>
                  <span>It&apos;s embedded in Solana&apos;s DNA</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">→</span>
                  <span>Now it actually exists</span>
                </li>
              </ul>
            </div>

            {/* Chapter 4 */}
            <div className="mb-16">
              <p className="text-purple-400 text-sm tracking-wider uppercase mb-2">Chapter 4</p>
              <h2 className="text-2xl font-bold mb-6 text-white">The Mission</h2>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                $FILECOIN proves that memes can have utility. That the best ideas sometimes come from 
                the most unexpected places. That a forgotten whitepaper reference can become something real.
              </p>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                Upload your files. Hold the token. Become part of the story.
              </p>
              
              <p className="text-xl text-white font-medium mt-8">
                The storage network that shouldn&apos;t exist, but does.
              </p>
            </div>

          </article>

          {/* Links */}
          <div className="border-t border-gray-800 pt-12 mt-12">
            <h3 className="text-lg font-semibold mb-6">Links</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <a 
                href="https://solana.com/solana-whitepaper.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-purple-500/50 transition"
              >
                <p className="font-medium text-white mb-1">Solana Whitepaper</p>
                <p className="text-gray-500 text-sm">Read the original document</p>
              </a>
              <a 
                href="https://x.com/i/communities/1994913381581484366" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-purple-500/50 transition"
              >
                <p className="font-medium text-white mb-1">Twitter Community</p>
                <p className="text-gray-500 text-sm">Join the discussion</p>
              </a>
            </div>
            
            <div className="mt-6 p-4 bg-gray-900/30 rounded-lg">
              <p className="text-gray-500 text-sm mb-1">Contract Address</p>
              <p className="font-mono text-sm text-gray-400 break-all">
                M35pQqnEQJzTAz6x8JUzuQpAWCggKdkxQj7MbkHpump
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link
              href="/upload"
              className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all hover:scale-105"
            >
              Try It Out
            </Link>
            <p className="text-gray-500 text-sm mt-4">
              No wallet required to start
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
