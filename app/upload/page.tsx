'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { formatBytes } from '@/lib/utils';

// Payment wallet for NFT minting
const PAYMENT_WALLET = process.env.NEXT_PUBLIC_PAYMENT_WALLET || 'YOUR_SOLANA_WALLET_ADDRESS';
const MINT_PRICE = 0.01; // SOL

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [mintAsNft, setMintAsNft] = useState(false);
  const [recipientWallet, setRecipientWallet] = useState('');
  const [customName, setCustomName] = useState('');
  
  // Payment state for NFT
  const [showPayment, setShowPayment] = useState(false);
  const [uploadedFileData, setUploadedFileData] = useState<{url: string, shortId: string} | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'checking' | 'minting' | 'done'>('pending');
  const [mintResult, setMintResult] = useState<{mintAddress: string, txSignature: string} | null>(null);
  const [paymentTxSignature, setPaymentTxSignature] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [checkCount, setCheckCount] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
      setShowPayment(false);
      setMintResult(null);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError('');
      setShowPayment(false);
      setMintResult(null);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    // Validate wallet if minting
    if (mintAsNft && !recipientWallet) {
      setError('Enter your wallet address to receive the NFT');
      return;
    }

    setUploading(true);
    setProgress(0);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('storageType', 'cloud');
      formData.append('isPublic', isPublic.toString());
      if (customName.trim()) {
        formData.append('customName', customName.trim());
      }

      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setProgress(100);

      // If minting as NFT, show payment screen
      if (mintAsNft) {
        setUploadedFileData({ url: data.url, shortId: data.shortId });
        setShowPayment(true);
        setUploading(false);
      } else {
        setTimeout(() => {
          router.push(`/f/${data.shortId}`);
        }, 500);
      }
    } catch {
      setError('Upload failed');
      setUploading(false);
    }
  };

  const checkPaymentAndMint = async () => {
    if (!uploadedFileData || !file) return;
    
    setPaymentStatus('checking');
    setError('');
    setCheckCount(prev => prev + 1);

    try {
      // Check for payment from the recipient wallet
      const checkResponse = await fetch('/api/check-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          expectedAmount: MINT_PRICE,
          senderWallet: recipientWallet,
        }),
      });

      const checkData = await checkResponse.json();

      if (!checkData.confirmed) {
        setPaymentStatus('pending');
        if (checkCount >= 2) {
          setError('payment not found yet. transactions can take 30-60 seconds to appear. wait a bit and try again.');
        } else {
          setError('payment not found. make sure you sent exactly ' + MINT_PRICE + ' SOL from your wallet.');
        }
        return;
      }

      // Save payment tx signature
      setPaymentTxSignature(checkData.txSignature);

      // Payment confirmed, mint the NFT
      setPaymentStatus('minting');

      const mintResponse = await fetch('/api/mint-nft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileUrl: uploadedFileData.url,
          fileName: customName.trim() || file.name,
          recipientWallet,
          shortId: uploadedFileData.shortId,
        }),
      });

      // Handle empty response or timeout
      const responseText = await mintResponse.text();
      if (!responseText) {
        throw new Error('minting timed out. the nft may still be processing - check your wallet in a few minutes.');
      }

      let mintData;
      try {
        mintData = JSON.parse(responseText);
      } catch {
        throw new Error('minting response error. check your wallet - the nft may have been created.');
      }

      if (!mintResponse.ok) {
        throw new Error(mintData.error || 'Minting failed');
      }

      setMintResult({
        mintAddress: mintData.mintAddress,
        txSignature: mintData.txSignature,
      });
      setPaymentStatus('done');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setPaymentStatus('pending');
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(PAYMENT_WALLET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Success screen after minting
  if (mintResult) {
    return (
      <main className="min-h-screen py-16">
        <div className="max-w-xl mx-auto px-6">
          <div className="sketch-border bg-white p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 border-2 border-black rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 font-caveat">nft minted!</h2>
            <p className="text-gray-600 mb-6">your file is now an nft in your wallet</p>
            
            <div className="space-y-4 text-left">
              <div className="bg-gray-50 p-3 border-2 border-gray-200 rounded">
                <p className="text-xs text-gray-500 mb-1">mint address</p>
                <a 
                  href={`https://solscan.io/token/${mintResult.mintAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-blue-600 underline break-all"
                >
                  {mintResult.mintAddress}
                </a>
              </div>
              <div className="bg-gray-50 p-3 border-2 border-gray-200 rounded">
                <p className="text-xs text-gray-500 mb-1">mint transaction</p>
                <a 
                  href={`https://solscan.io/tx/${mintResult.txSignature}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-blue-600 underline break-all"
                >
                  view on solscan
                </a>
              </div>
              {paymentTxSignature && (
                <div className="bg-gray-50 p-3 border-2 border-gray-200 rounded">
                  <p className="text-xs text-gray-500 mb-1">payment transaction</p>
                  <a 
                    href={`https://solscan.io/tx/${paymentTxSignature}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-blue-600 underline break-all"
                  >
                    view on solscan
                  </a>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => router.push(`/f/${uploadedFileData?.shortId}`)}
                className="btn-sketch flex-1"
              >
                view file
              </button>
              <button
                onClick={() => {
                  setFile(null);
                  setShowPayment(false);
                  setMintResult(null);
                  setMintAsNft(false);
                  setPaymentTxSignature(null);
                  setCheckCount(0);
                }}
                className="btn-outline"
              >
                upload another
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Payment screen for NFT minting
  if (showPayment) {
    return (
      <main className="min-h-screen py-16">
        <div className="max-w-xl mx-auto px-6">
          <div className="sketch-border bg-white p-6">
            <h2 className="text-2xl font-bold mb-4 font-caveat">mint as nft</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 border-2 border-gray-200 rounded">
                <p className="text-sm text-gray-500 mb-1">file uploaded</p>
                <p className="font-bold truncate">{file?.name}</p>
              </div>

              <div className="bg-[#fff9e0] p-4 border-2 border-[#e6c200] rounded">
                <p className="text-sm text-gray-600 mb-1">mint price</p>
                <p className="text-3xl font-bold">{MINT_PRICE} SOL</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">send exactly {MINT_PRICE} SOL from your wallet to:</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={PAYMENT_WALLET}
                    readOnly
                    className="flex-1 border-2 border-black px-3 py-2 text-xs bg-gray-50 font-mono"
                  />
                  <button
                    onClick={copyAddress}
                    className="px-4 py-2 border-2 border-black bg-gray-100 hover:bg-gray-200 font-bold transition text-sm"
                  >
                    {copied ? 'copied' : 'copy'}
                  </button>
                </div>
              </div>

              <div className="bg-[#e8f5e9] p-3 border-2 border-green-300 rounded">
                <p className="text-xs text-gray-600 mb-1">nft will be sent to</p>
                <p className="font-mono text-sm break-all">{recipientWallet}</p>
              </div>

              <div className="bg-blue-50 p-3 border-2 border-blue-200 rounded">
                <p className="text-xs text-blue-800">
                  after sending, wait 30-60 seconds for the transaction to confirm on solana, then click the button below. minting takes about 15-30 seconds.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 p-3 border-2 border-red-200 rounded">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {paymentStatus === 'minting' && (
                <div className="bg-[#fff9e0] p-4 border-2 border-[#e6c200] rounded text-center">
                  <div className="animate-spin w-6 h-6 border-2 border-black border-t-transparent rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-bold">minting your nft...</p>
                  <p className="text-xs text-gray-600">this takes about 15-30 seconds</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={checkPaymentAndMint}
                  disabled={paymentStatus === 'checking' || paymentStatus === 'minting'}
                  className="btn-sketch flex-1 disabled:opacity-50"
                >
                  {paymentStatus === 'checking' ? 'checking payment...' : 
                   paymentStatus === 'minting' ? 'minting...' : 
                   'i sent the sol'}
                </button>
                <button
                  onClick={() => {
                    setShowPayment(false);
                    router.push(`/f/${uploadedFileData?.shortId}`);
                  }}
                  disabled={paymentStatus === 'minting'}
                  className="btn-outline disabled:opacity-50"
                >
                  skip
                </button>
              </div>

              <p className="text-xs text-gray-400 text-center">
                payment window: 30 minutes from now
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-16">
      <div className="max-w-xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3 font-caveat">upload a file</h1>
          <p className="text-gray-600">
            free file hosting. mint as nft for permanent ownership.
          </p>
        </div>

        {/* Upload Area */}
        <div className="sketch-border bg-white p-6">
          {!file ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-3 border-dashed rounded-lg p-12 text-center transition-all cursor-pointer ${
                isDragging 
                  ? 'border-[#e6c200] bg-[#fff9e0]' 
                  : 'border-gray-400 hover:border-gray-600'
              }`}
            >
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="w-20 h-16 mx-auto mb-6 sketch-border-yellow flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-xl font-bold mb-2">
                  drop your file here
                </p>
                <p className="text-gray-600 mb-4">
                  or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  max 50MB per file
                </p>
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              {/* File Preview */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 border-2 border-gray-300 rounded">
                <div className="w-12 h-10 sketch-border-yellow flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">{file.name}</p>
                  <p className="text-sm text-gray-600">{formatBytes(file.size)}</p>
                </div>
                {!uploading && (
                  <button
                    onClick={() => setFile(null)}
                    className="text-gray-500 hover:text-black transition p-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Custom Name */}
              {!uploading && (
                <div className="space-y-2">
                  <p className="font-bold text-sm">name (optional)</p>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder={file.name}
                    className="w-full border-2 border-black px-3 py-2 text-sm"
                  />
                  <p className="text-xs text-gray-500">leave blank to use original filename</p>
                </div>
              )}

              {/* Visibility Toggle */}
              {!uploading && (
                <div className="space-y-3">
                  <p className="font-bold text-sm">visibility</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setIsPublic(true)}
                      className={`p-4 border-2 border-black text-left transition ${
                        isPublic ? 'bg-[#fff9e0]' : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      <p className="font-bold">public</p>
                      <p className="text-sm text-gray-600">visible in explorer</p>
                    </button>
                    <button
                      onClick={() => setIsPublic(false)}
                      className={`p-4 border-2 border-black text-left transition ${
                        !isPublic ? 'bg-[#fff9e0]' : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      <p className="font-bold">private</p>
                      <p className="text-sm text-gray-600">only with link</p>
                    </button>
                  </div>
                </div>
              )}

              {/* Mint as NFT Toggle */}
              {!uploading && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm">mint as nft</p>
                      <p className="text-xs text-gray-500">{MINT_PRICE} SOL - own your file forever</p>
                    </div>
                    <button
                      onClick={() => setMintAsNft(!mintAsNft)}
                      className={`w-12 h-6 rounded-full border-2 border-black transition-colors ${
                        mintAsNft ? 'bg-[#e6c200]' : 'bg-gray-200'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white border-2 border-black rounded-full transition-transform ${
                        mintAsNft ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  {mintAsNft && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">your wallet address (to receive nft)</p>
                      <input
                        type="text"
                        value={recipientWallet}
                        onChange={(e) => setRecipientWallet(e.target.value)}
                        placeholder="paste your solana wallet address"
                        className="w-full border-2 border-black px-3 py-2 text-sm font-mono"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Progress Bar */}
              {uploading && (
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>uploading...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 border-2 border-black rounded h-4">
                    <div
                      className="bg-[#e6c200] h-full rounded transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="sketch-border bg-red-50 p-4">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {/* Actions */}
              {!uploading && (
                <div className="flex gap-3">
                  <button onClick={handleUpload} className="btn-sketch flex-1">
                    {mintAsNft ? 'upload & mint' : 'upload'}
                  </button>
                  <button onClick={() => setFile(null)} className="btn-outline">
                    cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          <div className="sketch-border bg-white p-4">
            <h3 className="font-bold mb-2">free uploads</h3>
            <p className="text-gray-600 text-sm">
              upload any file for free. share with anyone via link.
            </p>
          </div>
          <div className="sketch-border bg-white p-4">
            <h3 className="font-bold mb-2">mint as nft</h3>
            <p className="text-gray-600 text-sm">
              {MINT_PRICE} SOL to mint your file as an nft you own forever.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
