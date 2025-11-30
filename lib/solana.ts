import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection(
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com'
);

export async function getTokenBalance(
  walletAddress: string,
  tokenMintAddress: string
): Promise<number> {
  try {
    const walletPubkey = new PublicKey(walletAddress);
    const mintPubkey = new PublicKey(tokenMintAddress);

    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      walletPubkey,
      { mint: mintPubkey }
    );

    if (tokenAccounts.value.length === 0) {
      return 0;
    }

    const balance = tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount;
    return balance || 0;
  } catch (error) {
    console.error('Error fetching token balance:', error);
    return 0;
  }
}

export function getTierFromBalance(balance: number): 'free' | 'holder' | 'whale' {
  const holderMin = Number(process.env.HOLDER_TIER_MIN) || 1000;
  const whaleMin = Number(process.env.WHALE_TIER_MIN) || 10000;

  if (balance >= whaleMin) return 'whale';
  if (balance >= holderMin) return 'holder';
  return 'free';
}

export function getStorageLimits(tier: 'free' | 'holder' | 'whale') {
  const limits = {
    free: { total: 200 * 1024 * 1024, perFile: 50 * 1024 * 1024 },
    holder: { total: 1024 * 1024 * 1024, perFile: 200 * 1024 * 1024 },
    whale: { total: 5 * 1024 * 1024 * 1024, perFile: 500 * 1024 * 1024 },
  };
  return limits[tier];
}
