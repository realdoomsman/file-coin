import Link from 'next/link';

export default function LorePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-20 border-b-3 border-black">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm tracking-widest uppercase mb-4 text-[#b39700]">the origin story</p>
          <h1 className="text-5xl font-bold mb-6" style={{ fontFamily: 'Caveat, cursive' }}>the forgotten reference</h1>
          <p className="text-xl text-gray-600">
            how a buried whitepaper mention became something real.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6">
          
          {/* Chapter 1 */}
          <div className="mb-16">
            <p className="text-sm tracking-widest uppercase mb-2 text-[#b39700]">chapter 1</p>
            <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Caveat, cursive' }}>the whitepaper</h2>
            
            <div className="space-y-4 text-lg">
              <p>
                in the original solana whitepaper, published in 2017, there&apos;s something most people missed. 
                buried in the technical documentation, solana references a token <strong>three different times</strong> that 
                nobody ever talks about.
              </p>
              
              <p>
                a forgotten relic from the early days: <strong>filecoin</strong>.
              </p>
              
              <p className="text-gray-700">
                it&apos;s literally embedded inside solana&apos;s original technical vision. written right there in the PDF. 
                not hidden, not encrypted - just overlooked by everyone who read it.
              </p>
              
              <div className="sketch-border bg-white p-4 my-6">
                <p className="text-gray-600 text-sm mb-2">source</p>
                <a 
                  href="https://solana.com/solana-whitepaper.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:text-[#b39700] break-all"
                >
                  solana.com/solana-whitepaper.pdf
                </a>
                <p className="text-gray-500 text-sm mt-2">
                  search for &quot;filecoin&quot; in the document. it&apos;s there.
                </p>
              </div>
            </div>
          </div>

          {/* Chapter 2 */}
          <div className="mb-16">
            <p className="text-sm tracking-widest uppercase mb-2 text-[#b39700]">chapter 2</p>
            <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Caveat, cursive' }}>the tweet</h2>
            
            <div className="space-y-4 text-lg">
              <p>
                years later, anatoly yakovenko - solana&apos;s co-founder - posted something cryptic on twitter.
              </p>
              
              <div className="sketch-border bg-white p-6 my-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#e6c200] border-2 border-black flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold">toly</span>
                      <span className="text-gray-500 text-sm">@aaboronkov</span>
                    </div>
                    <p className="text-2xl">&quot;filecoin&quot;</p>
                  </div>
                </div>
              </div>
              
              <p>
                no context. no explanation. no follow-up. just one word and then silence.
              </p>
              
              <p className="text-gray-700">
                was it alpha? a joke? a prophecy? nobody knew. but the community remembered.
              </p>
            </div>
          </div>

          {/* Chapter 3 */}
          <div className="mb-16">
            <p className="text-sm tracking-widest uppercase mb-2 text-[#b39700]">chapter 3</p>
            <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Caveat, cursive' }}>the revival</h2>
            
            <div className="space-y-4 text-lg">
              <p>
                so we built it.
              </p>
              
              <p>
                not trying to compete with IPFS or arweave. this is different. this is a tribute to the 
                forgotten reference - a meme that became functional, a joke that actually works.
              </p>
              
              <p>
                filecoin is real file storage on solana. upload anything. get a permanent link. 
                hold the token for more storage.
              </p>
              
              <ul className="space-y-2 my-6">
                <li>- the whitepaper mentioned it (3 times)</li>
                <li>- toly tweeted about it (cryptically)</li>
                <li>- it&apos;s embedded in solana&apos;s DNA</li>
                <li>- now it actually exists</li>
              </ul>
            </div>
          </div>

          {/* Chapter 4 */}
          <div className="mb-16">
            <p className="text-sm tracking-widest uppercase mb-2 text-[#b39700]">chapter 4</p>
            <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Caveat, cursive' }}>the mission</h2>
            
            <div className="space-y-4 text-lg">
              <p>
                filecoin proves that memes can have utility. that the best ideas sometimes come from 
                the most unexpected places. that a forgotten whitepaper reference can become something real.
              </p>
              
              <p>
                upload your files. hold the token. become part of the story.
              </p>
              
              <p className="text-xl font-bold mt-8">
                the storage network that shouldn&apos;t exist, but does.
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="border-t-3 border-black pt-12 mt-12">
            <h3 className="text-xl font-bold mb-6">links</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <a 
                href="https://solana.com/solana-whitepaper.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="sketch-border bg-white p-4 hover:bg-gray-50 transition"
              >
                <p className="font-bold mb-1">solana whitepaper</p>
                <p className="text-gray-600 text-sm">read the original document</p>
              </a>
              <a 
                href="https://x.com/i/communities/1994913381581484366" 
                target="_blank" 
                rel="noopener noreferrer"
                className="sketch-border bg-white p-4 hover:bg-gray-50 transition"
              >
                <p className="font-bold mb-1">twitter community</p>
                <p className="text-gray-600 text-sm">join the discussion</p>
              </a>
            </div>
            
            <div className="mt-6 sketch-border bg-white p-4">
              <p className="text-gray-600 text-sm mb-1">contract address</p>
              <p className="font-mono text-sm break-all">
                M35pQqnEQJzTAz6x8JUzuQpAWCggKdkxQj7MbkHpump
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link href="/upload" className="btn-sketch">
              try it out
            </Link>
            <p className="text-gray-500 text-sm mt-4">
              no wallet required to start
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
