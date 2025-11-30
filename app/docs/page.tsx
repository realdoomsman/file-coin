export default function DocsPage() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          📖 THE DOCS 📖
        </h1>
        <p className="text-xl text-gray-400">rtfm (read the funny manual)</p>
        <p className="text-sm text-yellow-400 mt-2">⚠️ yes u actually have to read this ⚠️</p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-3xl font-bold mb-4 text-yellow-400">🚀 HOW 2 USE 🚀</h2>
          <div className="bg-gradient-to-br from-purple-900/30 to-gray-900 p-6 rounded-lg border-2 border-purple-500">
            <ol className="list-decimal list-inside space-y-3 text-gray-300 text-lg">
              <li>connect ur solana wallet (phantom, solflare, whatever)</li>
              <li>go to the dashboard (click the button lol)</li>
              <li>click &quot;UPLOAD FILE&quot; and yeet ur file into the void</li>
              <li>profit??? (not financial advice)</li>
            </ol>
            <p className="text-sm text-gray-500 mt-4 italic">
              * if this doesn&apos;t work idk what to tell u, it works on my machine
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4 text-green-400">💾 STORAGE TIERS 💾</h2>
          <div className="bg-gradient-to-br from-green-900/30 to-gray-900 p-6 rounded-lg border-2 border-green-500">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-200 mb-2">🆓 broke boi tier</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>200MB total (like 3 memes)</li>
                  <li>50MB per file</li>
                  <li>Requirements: just show up lol</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-400 mb-2">💰 holder tier (u got some)</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>1GB total (now we talkin)</li>
                  <li>200MB per file</li>
                  <li>Requirements: hold some $FILE tokens</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-pink-400 mb-2">🐋 WHALE MODE ACTIVATED</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>5GB total (absolute unit)</li>
                  <li>500MB per file (chonky)</li>
                  <li>Requirements: bag holder status 💼</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 italic">
              * tiers update when u connect wallet. no cap.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4 text-blue-400">✨ STUFF U CAN DO ✨</h2>
          <div className="bg-gradient-to-br from-blue-900/30 to-gray-900 p-6 rounded-lg border-2 border-blue-500">
            <ul className="space-y-3 text-gray-300">
              <li><span className="font-bold text-yellow-400">📤 yeet files:</span> upload literally anything (within reason)</li>
              <li><span className="font-bold text-yellow-400">🔒 public/private:</span> share with the world or keep it secret</li>
              <li><span className="font-bold text-yellow-400">🔗 direct links:</span> permanent urls that actually work</li>
              <li><span className="font-bold text-yellow-400">🗂️ file explorer:</span> snoop on other ppls public files</li>
              <li><span className="font-bold text-yellow-400">📊 dashboard:</span> see how much space ur wasting</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4 text-orange-400">🪙 THE TOKEN THING 🪙</h2>
          <div className="bg-gradient-to-br from-orange-900/30 to-gray-900 p-6 rounded-lg border-2 border-orange-500">
            <p className="text-gray-300 mb-4">
              ok so basically we check ur wallet for $FILE tokens and give u more storage if u have some. 
              it&apos;s literally that simple. more tokens = more space. capitalism baby 📈
            </p>
            <p className="text-gray-300">
              we check every time u connect ur wallet so u can upgrade whenever. just buy tokens and refresh. 
              ez clap.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4 text-purple-400">🤓 API STUFF (for nerds) 🤓</h2>
          <div className="bg-gradient-to-br from-purple-900/30 to-gray-900 p-6 rounded-lg border-2 border-purple-500">
            <p className="text-sm text-gray-400 mb-4">if u wanna build on top of this or whatever here u go</p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-yellow-400 mb-2">POST /api/upload</h3>
                <p className="text-gray-400 text-sm mb-2">yeet a file into the cloud</p>
                <pre className="bg-black p-3 rounded text-sm text-gray-300 overflow-x-auto">
{`{
  "file": File,
  "walletAddress": "string"
}`}
                </pre>
              </div>
              <div>
                <h3 className="text-lg font-bold text-yellow-400 mb-2">GET /api/files</h3>
                <p className="text-gray-400 text-sm">get all ur files (or someone elses if u know their wallet)</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-yellow-400 mb-2">GET /api/file/[id]</h3>
                <p className="text-gray-400 text-sm">get info about one specific file</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-yellow-400 mb-2">POST /api/update-public</h3>
                <p className="text-gray-400 text-sm">make ur file public or private (toggle switch go brrr)</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4 text-pink-400">❓ FAQ (frequently asked questions) ❓</h2>
          <div className="bg-gradient-to-br from-pink-900/30 to-gray-900 p-6 rounded-lg border-2 border-pink-500 space-y-4">
            <div>
              <h3 className="font-bold text-yellow-400 mb-2">is my data safe???</h3>
              <p className="text-gray-300">probably. we use supabase. they seem legit. don&apos;t upload ur seed phrase tho.</p>
            </div>
            <div>
              <h3 className="font-bold text-yellow-400 mb-2">what files can i upload?</h3>
              <p className="text-gray-300">literally anything. jpegs, pdfs, ur tax returns, whatever. we don&apos;t judge.</p>
            </div>
            <div>
              <h3 className="font-bold text-yellow-400 mb-2">can i delete stuff?</h3>
              <p className="text-gray-300">yeah just click delete lmao. it&apos;s not that deep.</p>
            </div>
            <div>
              <h3 className="font-bold text-yellow-400 mb-2">how do i get more storage?</h3>
              <p className="text-gray-300">buy $FILE tokens. it&apos;s literally pay 2 win. we&apos;re not even hiding it.</p>
            </div>
            <div>
              <h3 className="font-bold text-yellow-400 mb-2">is this a scam?</h3>
              <p className="text-gray-300">no??? it actually works??? we&apos;re confused too tbh.</p>
            </div>
            <div>
              <h3 className="font-bold text-yellow-400 mb-2">wen moon?</h3>
              <p className="text-gray-300">soon™ (not financial advice)</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
