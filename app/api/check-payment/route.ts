import { NextRequest, NextResponse } from 'next/server';

const SOLANA_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
const PAYMENT_WALLET = process.env.NEXT_PUBLIC_PAYMENT_WALLET || '';

export async function POST(request: NextRequest) {
  try {
    const { paymentId, expectedAmount, wallet } = await request.json();

    if (!PAYMENT_WALLET) {
      return NextResponse.json({ 
        confirmed: false, 
        error: 'Payment wallet not configured' 
      });
    }

    // Query recent transactions to the payment wallet
    const response = await fetch(SOLANA_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getSignaturesForAddress',
        params: [
          PAYMENT_WALLET,
          { limit: 20 }
        ]
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('RPC error:', data.error);
      return NextResponse.json({ confirmed: false, error: 'Failed to check transactions' });
    }

    const signatures = data.result || [];

    // Check each recent transaction
    for (const sig of signatures) {
      // Get transaction details
      const txResponse = await fetch(SOLANA_RPC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getTransaction',
          params: [
            sig.signature,
            { encoding: 'jsonParsed', maxSupportedTransactionVersion: 0 }
          ]
        })
      });

      const txData = await txResponse.json();
      const tx = txData.result;

      if (!tx || !tx.meta || tx.meta.err) continue;

      // Check if this transaction has our payment ID in the memo
      const instructions = tx.transaction?.message?.instructions || [];
      let hasMemo = false;
      
      for (const ix of instructions) {
        if (ix.program === 'spl-memo' || ix.programId === 'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr') {
          const memoData = ix.parsed || ix.data;
          if (memoData && memoData.includes(paymentId)) {
            hasMemo = true;
            break;
          }
        }
      }

      // Check the transfer amount
      const preBalances = tx.meta.preBalances || [];
      const postBalances = tx.meta.postBalances || [];
      const accountKeys = tx.transaction?.message?.accountKeys || [];

      for (let i = 0; i < accountKeys.length; i++) {
        const pubkey = accountKeys[i].pubkey || accountKeys[i];
        if (pubkey === PAYMENT_WALLET) {
          const received = (postBalances[i] - preBalances[i]) / 1e9; // Convert lamports to SOL
          
          // Check if amount matches (with small tolerance for fees)
          if (received >= expectedAmount * 0.99) {
            return NextResponse.json({
              confirmed: true,
              txSignature: sig.signature,
              amount: received,
              hasMemo
            });
          }
        }
      }
    }

    return NextResponse.json({ confirmed: false });
  } catch (error) {
    console.error('Payment check error:', error);
    return NextResponse.json({ confirmed: false, error: 'Failed to check payment' });
  }
}
