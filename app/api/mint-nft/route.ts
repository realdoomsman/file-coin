import { NextRequest, NextResponse } from 'next/server';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { 
  mplTokenMetadata,
  createNft,
  TokenStandard
} from '@metaplex-foundation/mpl-token-metadata';
import { 
  generateSigner, 
  keypairIdentity, 
  percentAmount,
  publicKey
} from '@metaplex-foundation/umi';
import bs58 from 'bs58';

const SOLANA_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const { 
      fileUrl, 
      fileName, 
      fileSize, 
      recipientWallet,
      shortId 
    } = await request.json();

    if (!WALLET_PRIVATE_KEY) {
      return NextResponse.json({ 
        error: 'Minting not configured. Contact admin.' 
      }, { status: 500 });
    }

    if (!recipientWallet) {
      return NextResponse.json({ 
        error: 'Recipient wallet address required' 
      }, { status: 400 });
    }

    // Validate recipient wallet
    try {
      new PublicKey(recipientWallet);
    } catch {
      return NextResponse.json({ 
        error: 'Invalid wallet address' 
      }, { status: 400 });
    }

    // Set up Umi with the minting wallet
    const umi = createUmi(SOLANA_RPC).use(mplTokenMetadata());
    
    // Decode the private key and create keypair
    const secretKey = bs58.decode(WALLET_PRIVATE_KEY);
    const mintWallet = umi.eddsa.createKeypairFromSecretKey(secretKey);
    umi.use(keypairIdentity(mintWallet));

    // Create the NFT metadata
    const metadata = {
      name: fileName.length > 32 ? fileName.substring(0, 29) + '...' : fileName,
      symbol: 'FILE',
      description: `File stored on filecoin. Size: ${formatBytes(fileSize)}`,
      image: fileUrl,
      external_url: `https://coinfile.fun/f/${shortId}`,
      attributes: [
        { trait_type: 'File Name', value: fileName },
        { trait_type: 'File Size', value: formatBytes(fileSize) },
        { trait_type: 'Storage', value: 'Permanent' },
        { trait_type: 'Platform', value: 'filecoin' }
      ],
      properties: {
        files: [{ uri: fileUrl, type: 'application/octet-stream' }],
        category: 'file'
      }
    };

    // Upload metadata to a JSON hosting service or use the file URL
    // For simplicity, we'll create a data URI with the metadata
    const metadataUri = `data:application/json;base64,${Buffer.from(JSON.stringify(metadata)).toString('base64')}`;

    // Generate a new mint address
    const mint = generateSigner(umi);

    // Create the NFT
    const { signature } = await createNft(umi, {
      mint,
      name: metadata.name,
      symbol: 'FILE',
      uri: metadataUri,
      sellerFeeBasisPoints: percentAmount(0), // No royalties
      tokenOwner: publicKey(recipientWallet),
      tokenStandard: TokenStandard.NonFungible,
    }).sendAndConfirm(umi);

    // Convert signature to base58
    const txSignature = bs58.encode(signature);

    return NextResponse.json({
      success: true,
      mintAddress: mint.publicKey.toString(),
      txSignature,
      message: 'NFT minted successfully!'
    });

  } catch (error) {
    console.error('Mint error:', error);
    const message = error instanceof Error ? error.message : 'Minting failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
