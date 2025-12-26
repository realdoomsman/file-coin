import Link from 'next/link';

export default function DocsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-24 border-b border-gray-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-purple-400 text-sm tracking-[0.2em] uppercase mb-4">Documentation</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h1>
          <p className="text-xl text-gray-400">
            Everything you need to know about using $FILECOIN.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          
          {/* Quick Start */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-medium">1</span>
                  <div>
                    <p className="font-medium text-white">Upload a file</p>
                    <p className="text-gray-500 text-sm">No wallet needed. Just drag and drop.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-medium">2</span>
                  <div>
                    <p className="font-medium text-white">Get your link</p>
                    <p className="text-gray-500 text-sm">Permanent URL you can share anywhere.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-medium">3</span>
                  <div>
                    <p className="font-medium text-white">Connect wallet for more</p>
                    <p className="text-gray-500 text-sm">Unlock larger uploads and private files.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Storage Tiers */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Storage Tiers</h2>
            <div className="space-y-4">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-white">Free Tier</h3>
                  <span className="text-gray-500 text-sm">No wallet required</span>
                </div>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• 200MB total storage</li>
                  <li>• 50MB max file size</li>
                  <li>• Public files only</li>
                </ul>
              </div>
              
              <div className="bg-gray-900/50 border border-purple-500/30 rounded-xl p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-purple-400">Holder Tier</h3>
                  <span className="text-gray-500 text-sm">Hold $FILE tokens</span>
                </div>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• 1GB total storage</li>
                  <li>• 200MB max file size</li>
                  <li>• Private file support</li>
                </ul>
              </div>
              
              <div className="bg-gray-900/50 border border-yellow-500/30 rounded-xl p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-yellow-500">Whale Tier</h3>
                  <span className="text-gray-500 text-sm">Major holder</span>
                </div>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• 5GB total storage</li>
                  <li>• 500MB max file size</li>
                  <li>• Priority support</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Features</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-5">
                <h3 className="font-medium text-white mb-2">File Upload</h3>
                <p className="text-gray-500 text-sm">Upload any file type. Images, documents, videos, archives.</p>
              </div>
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-5">
                <h3 className="font-medium text-white mb-2">Permanent Links</h3>
                <p className="text-gray-500 text-sm">Every file gets a unique URL that doesn&apos;t expire.</p>
              </div>
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-5">
                <h3 className="font-medium text-white mb-2">Privacy Control</h3>
                <p className="text-gray-500 text-sm">Toggle files between public and private (wallet required).</p>
              </div>
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-5">
                <h3 className="font-medium text-white mb-2">File Explorer</h3>
                <p className="text-gray-500 text-sm">Browse public files uploaded by the community.</p>
              </div>
            </div>
          </div>

          {/* API Reference */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">API Reference</h2>
            <div className="space-y-4">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-mono rounded">POST</span>
                  <code className="text-gray-300 text-sm">/api/upload</code>
                </div>
                <p className="text-gray-500 text-sm mb-3">Upload a file. Wallet address is optional.</p>
                <pre className="bg-black/50 p-3 rounded text-xs text-gray-400 overflow-x-auto">
{`FormData:
  file: File (required)
  walletAddress: string (optional)`}
                </pre>
              </div>
              
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-mono rounded">GET</span>
                  <code className="text-gray-300 text-sm">/api/files?wallet=ADDRESS</code>
                </div>
                <p className="text-gray-500 text-sm">Get all files for a wallet address.</p>
              </div>
              
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-mono rounded">GET</span>
                  <code className="text-gray-300 text-sm">/api/file/[id]</code>
                </div>
                <p className="text-gray-500 text-sm">Get metadata for a specific file.</p>
              </div>
              
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-mono rounded">POST</span>
                  <code className="text-gray-300 text-sm">/api/update-public</code>
                </div>
                <p className="text-gray-500 text-sm">Toggle file visibility (requires wallet ownership).</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            <div className="space-y-4">
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-5">
                <h3 className="font-medium text-white mb-2">What files can I upload?</h3>
                <p className="text-gray-500 text-sm">Any file type is supported — images, documents, videos, archives, etc.</p>
              </div>
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-5">
                <h3 className="font-medium text-white mb-2">Is my data secure?</h3>
                <p className="text-gray-500 text-sm">Files are stored on Supabase infrastructure. Private files are only accessible to the wallet owner.</p>
              </div>
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-5">
                <h3 className="font-medium text-white mb-2">How do I get more storage?</h3>
                <p className="text-gray-500 text-sm">Connect your wallet and hold $FILE tokens. Your tier updates automatically.</p>
              </div>
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-5">
                <h3 className="font-medium text-white mb-2">Can I delete files?</h3>
                <p className="text-gray-500 text-sm">Yes, you can delete any file you own from your dashboard.</p>
              </div>
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-5">
                <h3 className="font-medium text-white mb-2">Do links expire?</h3>
                <p className="text-gray-500 text-sm">No, file links are permanent as long as the file exists.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-gray-400 mb-6">Ready to get started?</p>
            <Link
              href="/upload"
              className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition"
            >
              Upload Your First File
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
