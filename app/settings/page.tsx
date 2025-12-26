'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [theme, setTheme] = useState('light');

  return (
    <main className="min-h-screen py-16">
      <div className="max-w-2xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 font-caveat">settings</h1>
          <p className="text-gray-600">manage your preferences</p>
        </div>

        <div className="space-y-6">
          {/* Theme */}
          <div className="sketch-border bg-white p-6">
            <h2 className="text-xl font-bold mb-4">appearance</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 block mb-2">theme</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="border-2 border-black px-4 py-2 w-full"
                >
                  <option value="light">sketchy (default)</option>
                  <option value="dark">dark (coming soon)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Storage Info */}
          <div className="sketch-border bg-white p-6">
            <h2 className="text-xl font-bold mb-4">storage</h2>
            <p className="text-gray-600 mb-4">
              filecoin offers free file hosting. upload any file up to 50MB.
            </p>
            <a
              href="/upload"
              className="btn-sketch inline-block"
            >
              upload a file
            </a>
          </div>

          {/* Help */}
          <div className="sketch-border bg-white p-6">
            <h2 className="text-xl font-bold mb-4">help</h2>
            <div className="space-y-2">
              <a href="/docs" className="block text-gray-700 hover:text-black underline">
                documentation
              </a>
              <a href="/lore" className="block text-gray-700 hover:text-black underline">
                read the lore
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
