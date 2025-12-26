import Link from 'next/link';

export default function DocsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-20 border-b-3 border-black">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm tracking-widest uppercase mb-4 text-[#b39700]">documentation</p>
          <h1 className="text-5xl font-bold mb-6 font-caveat">how it works</h1>
          <p className="text-xl text-gray-600">
            everything you need to know about using filecoin.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6">
          
          {/* Quick Start */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 font-caveat">quick start</h2>
            <div className="sketch-border bg-white p-6">
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 sketch-border-yellow flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">upload a file</p>
                    <p className="text-gray-600 text-sm">drag and drop any file up to 50MB.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 sketch-border-yellow flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">get your link</p>
                    <p className="text-gray-600 text-sm">short URL you can share anywhere.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 sketch-border-yellow flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">mint as nft (optional)</p>
                    <p className="text-gray-600 text-sm">0.01 SOL to own your file as an nft forever.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 font-caveat">features</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sketch-border bg-white p-4">
                <h3 className="font-bold mb-2">free uploads</h3>
                <p className="text-gray-600 text-sm">upload any file up to 50MB completely free.</p>
              </div>
              <div className="sketch-border bg-white p-4">
                <h3 className="font-bold mb-2">short links</h3>
                <p className="text-gray-600 text-sm">every file gets a short URL like /f/abc12345.</p>
              </div>
              <div className="sketch-border bg-white p-4">
                <h3 className="font-bold mb-2">public or private</h3>
                <p className="text-gray-600 text-sm">choose if your file shows in the explorer or not.</p>
              </div>
              <div className="sketch-border bg-white p-4">
                <h3 className="font-bold mb-2">nft minting</h3>
                <p className="text-gray-600 text-sm">mint your file as an nft for 0.01 SOL.</p>
              </div>
              <div className="sketch-border bg-white p-4">
                <h3 className="font-bold mb-2">custom names</h3>
                <p className="text-gray-600 text-sm">give your files custom display names.</p>
              </div>
              <div className="sketch-border bg-white p-4">
                <h3 className="font-bold mb-2">file explorer</h3>
                <p className="text-gray-600 text-sm">browse public files uploaded by everyone.</p>
              </div>
            </div>
          </div>

          {/* NFT Minting */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 font-caveat">nft minting</h2>
            <div className="sketch-border bg-white p-6 space-y-4">
              <p className="text-gray-600">turn your uploaded file into an nft you own forever.</p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-[#b39700]">1.</span>
                  <p>toggle "mint as nft" when uploading</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#b39700]">2.</span>
                  <p>enter your solana wallet address</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#b39700]">3.</span>
                  <p>send 0.01 SOL from that wallet to the payment address</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#b39700]">4.</span>
                  <p>click "i sent the sol" and wait for minting</p>
                </div>
              </div>
              <div className="bg-[#fff9e0] p-3 border-2 border-[#e6c200] rounded mt-4">
                <p className="text-sm">the nft will be sent to the wallet you paid from. it includes your file as the image and links back to filecoin.</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 font-caveat">faq</h2>
            <div className="space-y-4">
              <div className="sketch-border bg-white p-4">
                <h3 className="font-bold mb-2">what files can i upload?</h3>
                <p className="text-gray-600 text-sm">any file type - images, documents, videos, audio, archives, etc.</p>
              </div>
              <div className="sketch-border bg-white p-4">
                <h3 className="font-bold mb-2">do links expire?</h3>
                <p className="text-gray-600 text-sm">no, file links are permanent.</p>
              </div>
              <div className="sketch-border bg-white p-4">
                <h3 className="font-bold mb-2">why mint as nft?</h3>
                <p className="text-gray-600 text-sm">proves ownership on the blockchain. the nft lives in your wallet forever.</p>
              </div>
              <div className="sketch-border bg-white p-4">
                <h3 className="font-bold mb-2">what wallet do i need?</h3>
                <p className="text-gray-600 text-sm">any solana wallet - phantom, solflare, backpack, etc.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-8 border-t-3 border-black">
            <p className="text-gray-600 mb-6">ready to get started?</p>
            <Link href="/upload" className="btn-sketch">
              upload your first file
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
