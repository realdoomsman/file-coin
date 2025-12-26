import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-sm tracking-widest uppercase mb-4 text-[#b39700]">
          hidden in plain sight since 2017
        </p>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-black" style={{ fontFamily: 'Caveat, cursive' }}>
          filecoin
        </h1>
        
        <p className="text-xl md:text-2xl mb-4 text-black leading-relaxed">
          referenced <span className="sketch-underline">3 times</span> in the original solana whitepaper.
          a forgotten token that nobody talks about.
        </p>
        
        <p className="text-lg text-gray-600 mb-10">
          until now.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/upload" className="btn-sketch">
            start uploading
          </Link>
          <Link href="/lore" className="btn-outline">
            read the story
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <a 
            href="https://solana.com/solana-whitepaper.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-black transition underline"
          >
            whitepaper proof
          </a>
          <a 
            href="https://x.com/i/communities/1994913381581484366" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-black transition underline"
          >
            community
          </a>
          <span className="font-mono text-xs text-gray-500">
            CA: M35pQqnEQJzTAz6x8JUzuQpAWCggKdkxQj7MbkHpump
          </span>
        </div>
      </section>

      {/* The Discovery */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="sketch-border-yellow p-8">
          <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Caveat, cursive' }}>the discovery</h2>
          
          <div className="space-y-4 text-lg">
            <p>
              in the SOL whitepaper, solana references a token 3 different times that nobody ever talks about.
            </p>
            <p>
              a forgotten relic from the early days... <strong>filecoin</strong>.
            </p>
            <p className="text-gray-700">
              it&apos;s literally embedded inside solana&apos;s original technical vision. written right there in the PDF.
            </p>
            <a 
              href="https://solana.com/solana-whitepaper.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-4 underline hover:text-[#b39700]"
            >
              read the whitepaper
            </a>
          </div>
        </div>
      </section>

      {/* Toly Tweet */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: 'Caveat, cursive' }}>the signal</h2>
        <p className="text-center text-gray-600 mb-8">
          toly himself posted about it. no context. no explanation.
        </p>
        
        <div className="sketch-border bg-white p-6 max-w-md mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#e6c200] border-2 border-black flex-shrink-0" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold">toly</span>
                <span className="text-gray-500 text-sm">@aaboronkov</span>
              </div>
              <p className="text-2xl">&quot;filecoin&quot;</p>
              <p className="text-gray-500 text-sm mt-2">that&apos;s it. that&apos;s the tweet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: 'Caveat, cursive' }}>how it works</h2>
        <p className="text-center text-gray-600 mb-10">
          real file storage. no wallet required to start.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="sketch-border bg-white p-6">
            <h3 className="text-xl font-bold mb-2">upload</h3>
            <p className="text-gray-700">
              drop any file. images, documents, whatever. it just works.
            </p>
          </div>
          <div className="sketch-border bg-white p-6">
            <h3 className="text-xl font-bold mb-2">share</h3>
            <p className="text-gray-700">
              get a permanent link. share it anywhere. files stay accessible.
            </p>
          </div>
          <div className="sketch-border bg-white p-6">
            <h3 className="text-xl font-bold mb-2">hold</h3>
            <p className="text-gray-700">
              connect wallet + hold $FILE for more storage and features.
            </p>
          </div>
        </div>
      </section>

      {/* Storage Tiers */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: 'Caveat, cursive' }}>storage tiers</h2>
        <p className="text-center text-gray-600 mb-10">
          everyone gets free storage. holders get more.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="sketch-border bg-white p-6">
            <h3 className="text-xl font-bold mb-1">free</h3>
            <p className="text-gray-500 text-sm mb-4">no wallet needed</p>
            <ul className="space-y-2 text-gray-700">
              <li>200MB total storage</li>
              <li>50MB per file</li>
              <li>public sharing</li>
            </ul>
          </div>
          
          <div className="sketch-border-yellow p-6">
            <h3 className="text-xl font-bold mb-1">holder</h3>
            <p className="text-gray-600 text-sm mb-4">hold $FILE tokens</p>
            <ul className="space-y-2">
              <li>1GB total storage</li>
              <li>200MB per file</li>
              <li>private files</li>
            </ul>
          </div>
          
          <div className="sketch-border bg-white p-6">
            <h3 className="text-xl font-bold mb-1">whale</h3>
            <p className="text-gray-500 text-sm mb-4">major holder</p>
            <ul className="space-y-2 text-gray-700">
              <li>5GB total storage</li>
              <li>500MB per file</li>
              <li>priority support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Caveat, cursive' }}>ready to try it?</h2>
        <p className="text-gray-600 mb-8">
          no signup. no wallet required. just upload.
        </p>
        <Link href="/upload" className="btn-sketch">
          upload your first file
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t-3 border-black py-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              filecoin - the forgotten solana reference, revived.
            </p>
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="https://solana.com/solana-whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-black underline">
                whitepaper
              </a>
              <a href="https://x.com/i/communities/1994913381581484366" target="_blank" rel="noopener noreferrer" className="hover:text-black underline">
                community
              </a>
              <Link href="/docs" className="hover:text-black underline">
                docs
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
