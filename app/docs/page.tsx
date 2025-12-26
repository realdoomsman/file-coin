import Link from 'next/link';

export default function DocsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-20 border-b-3 border-black">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm tracking-widest uppercase mb-4 text-[#b39700]">documentation</p>
          <h1 className="text-5xl font-bold mb-6" style={{ fontFamily: 'Caveat, cursive' }}>how it works</h1>
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
            <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Caveat, cursive' }}>quick start</h2>
            <div className="sketch-border bg-white p-6">
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 sketch-border-yellow flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">upload a file</p>
                    <p className="text-gray-600 text-sm">no wallet needed. just drag and drop.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 sketch-border-yellow flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">get your link</p>
                    <p className="text-gray-600 text-sm">permanent URL you can share anywhere.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 sketch-border-yellow flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">connect wallet for more</p>
                    <p className="text-gray-600 text-sm">unlock larger uploads and private files.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Storage Tiers */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Caveat, cursive' }}>storage tiers</h2>
            <div className="space-y-4">
              <div className="sketch-border bg-white p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold">free tier</h3>
                  <span className="text-gray-500 text-sm">no wallet required</span>
                </div>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>- 200MB total storage</li>
                  <li>- 50MB max file size</li>
                  <li>- public files only</li>
                </ul>
              </div>
              
              <div className="sketch-border-yellow p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold">holder tier</h3>
                  <span className="text-sm">hold $FILE tokens</span>
                </div>
                <ul className="space-y-1 text-sm">
                  <li>- 1GB total storage</li>
                  <li>- 200MB max file size</li>
                  <li>- private file support</li>
                </ul>
              </div>
              
              <div className="sketch-border bg-white p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold">whale tier</h3>
                  <span className="text-gray-500 text-sm">major holder</span>
                </div>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>- 5GB total storage</li>
                  <li>- 500MB max file size</li>
                  <li>- priority support</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Caveat, cursive' }}>features</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sketch-border bg-white p-4">
                <h3 className="font-bold mb-2">file upload</h3>
                <p className="text-gray-600 text-sm">upload any file type. images, documents, videos, archives.</p>
              </div>
              <div className="sketch-border bg-white p-4">
                <h3 className="font-bold mb-2">permanent links</h3>
                <p className="text-gray-600 text-sm">every file gets a unique URL that doesn&apos;t expire.</p>
              </div>
              <div className="sketch-border bg-white p-4">
                <h3 className="font-bold mb-2">privacy control</h3>
                <p className="text-gray-600 text-sm">toggle files between public and private (wallet required).</p>
              </div>
              <div className="sketch-border bg-white p-4">
                <h3 className="font-bold mb-2">file explorer</h3>
                <p className="text-gray-600 text-sm">browse public files uploaded by the community.</p>
              </div>
            </div>
          </div>

          {/* API Reference */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Caveat, cursive' }}>api reference</h2>
            <div className="space-y-4">
              <div className="sketch-border bg-white p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 bg-green-100 border-2 border-black text-xs font-mono">POST</span>
                  <code className="text-sm">/api/upload</code>
                </div>
                <p className="text-gray-600 text-sm mb-3">upload a file. wallet address is optional.</p>
                <pre className="bg-gray-50 p-3 text-xs overflow-x-auto border-2 border-gray-200">
{`FormData:
  file: File (required)
  walletAddress: string (optional)`}
                </pre>
              </div>
              
              <div className="sketch-border bg-white p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 bg-blue-100 border-2 border-black text-xs font-mono">GET</span>
                  <code className="text-sm">/api/files?wallet=ADDRESS</code>
                </div>
                <p className="text-gray-600 text-sm">get all files for a wallet address.</p>
              </div>
              
              <div className="sketch-border bg-white p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 bg-blue-100 border-2 border-black text-xs font-mono">GET</span>
                  <code className="text-sm">/api/file/[id]</code>
                </div>
                <p className="text-gray-600 text-sm">get metadata for a specific file.</p>
              </div>
              
              <div className="sketch-border bg-white p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 bg-yellow-100 border-2 border-black text-xs font-mono">POST</span>
                  <code className="text-sm">/api/update-public</code>
                </div>
                <p className="text-gray-600 text-sm">toggle file visibility (requires wallet ownership).</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Caveat, cursive' }}>faq</h2>
            <div className="space-y-4">
              <div className="sketch-border bg-white p-4">
                <h3 className="font-bold mb-2">what files can i upload?</h3>
                <p className="text-gray-600 text-sm">any file type is supported - images, documents, videos, archives, etc.</p>
              </div>
              <div className="sketch-border bg-white p-4">
                <h3 className="font-bold mb-2">is my data secure?</h3>
                <p className="text-gray-600 text-sm">files are stored on supabase infrastructure. private files are only accessible to the wallet owner.</p>
              </div>
              <div className="sketch-border bg-white p-4">
                <h3 className="font-bold mb-2">how do i get more storage?</h3>
                <p className="text-gray-600 text-sm">connect your wallet and hold $FILE tokens. your tier updates automatically.</p>
              </div>
              <div className="sketch-border bg-white p-4">
                <h3 className="font-bold mb-2">can i delete files?</h3>
                <p className="text-gray-600 text-sm">yes, you can delete any file you own from your dashboard.</p>
              </div>
              <div className="sketch-border bg-white p-4">
                <h3 className="font-bold mb-2">do links expire?</h3>
                <p className="text-gray-600 text-sm">no, file links are permanent as long as the file exists.</p>
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
