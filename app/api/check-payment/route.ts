import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const SOLANA_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
const PAYMENT_WALLET = process.env.NEXT_PUBLIC_PAYMENT_WALLET || '';

export async function POST(request: NextRequest) {
  try {
    const { expectedAmount, senderWallet } = await request.json();

    if (!PAYMENT_WALLET) {
      return NextResponse.json({ 
        confirmed: false, 
        error: 'Payment wallet not configured' 
      });
    }

    if (!senderWallet) {
      return NextResponse.json({ 
        confirmed: false, 
        error: 'Sender wallet required' 
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

    // Get list of already-used transaction signatures from database
    const { data: usedTxs } = await supabase
      .from('used_payments')
      .select('tx_signature')
      .order('created_at', { ascending: false })
      .limit(100);

    const usedSignatures = new Set((usedTxs || []).map(t => t.tx_signature));

    // Check each recent transaction
    for (const sig of signatures) {
      // Skip if this transaction was already used
      if (usedSignatures.has(sig.signature)) {
        continue;
      }

      // Skip transactions older than 30 minutes
      const txTime = sig.blockTime ? sig.blockTime * 1000 : 0;
      const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;
      if (txTime && txTime < thirtyMinutesAgo) {
        continue;
      }

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

      // Check the transfer amount to our wallet AND verify sender
      const preBalances = tx.meta.preBalances || [];
      const postBalances = tx.meta.postBalances || [];
      const accountKeys = tx.transaction?.message?.accountKeys || [];

      let receivedAmount = 0;
      let correctSender = false;

      for (let i = 0; i < accountKeys.length; i++) {
        const pubkey = accountKeys[i].pubkey || accountKeys[i];
        
        // Check if our wallet received SOL
        if (pubkey === PAYMENT_WALLET) {
          const received = (postBalances[i] - preBalances[i]) / 1e9;
          if (received > 0) {
            receivedAmount = received;
          }
        }
        
        // Check if the sender is the claimed wallet (they sent SOL, so balance decreased)
        if (pubkey === senderWallet) {
          const sent = (preBalances[i] - postBalances[i]) / 1e9;
          if (sent > 0) {
            correctSender = true;
          }
        }
      }

      // Verify both: correct amount AND correct sender
      if (receivedAmount >= expectedAmount * 0.95 && correctSender) {
        // Mark this transaction as used
        await supabase
          .from('used_payments')
          .insert({ 
            tx_signature: sig.signature,
            amount: receivedAmount,
          });

        return NextResponse.json({
          confirmed: true,
          txSignature: sig.signature,
          amount: receivedAmount,
        });
      }
    }

    return NextResponse.json({ 
      confirmed: false,
      debug: {
        paymentWallet: PAYMENT_WALLET,
        senderWallet,
        transactionsFound: signatures.length,
      }
    });
  } catch (error) {
    console.error('Payment check error:', error);
    return NextResponse.json({ confirmed: false, error: 'Failed to check payment' });
  }
}
