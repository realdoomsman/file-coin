import { NextRequest, NextResponse } from 'next/server';
import { PublicKey } from '@solana/web3.js';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplTokenMetadata, createNft } from '@metaplex-foundation/mpl-token-metadata';
import { generateSigner, keypairIdentity, percentAmount, publicKey } from '@metaplex-foundation/umi';
import { supabase } from '@/lib/supabase';
import bs58 from 'bs58';

const SOLANA_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const { fileUrl, fileName, fileSize, recipientWallet, shortId } = await request.json();

    if (!WALLET_PRIVATE_KEY) {
      return NextResponse.json({ error: 'Minting not configured. Contact admin.' }, { status: 500 });
    }

    if (!recipientWallet) {
      return NextResponse.json({ error: 'Recipient wallet address required' }, { status: 400 });
    }

    // Validate recipient wallet
    try {
      new PublicKey(recipientWallet);
    } catch {
      return NextResponse.json({ error: 'Invalid wallet address' }, { status: 400 });
    }

    // Create minimal metadata JSON
    const metadata = {
      name: fileName.length > 32 ? fileName.substring(0, 29) + '...' : fileName,
      symbol: 'FILE',
      description: `File on filecoin`,
      image: fileUrl,
      external_url: `https://coinfile.fun/f/${shortId}`,
    };

    // Upload metadata JSON to Supabase storage
    const metadataFileName = `metadata/${shortId}.json`;
    const { error: uploadError } = await supabase.storage
      .from('files')
      .upload(metadataFileName, JSON.stringify(metadata), {
        contentType: 'application/json',
        upsert: true,
      });

    if (uploadError) {
      console.error('Metadata upload error:', uploadError);
      return NextResponse.json({ error: 'Failed to upload metadata' }, { status: 500 });
    }

    // Get public URL for metadata
    const { data: urlData } = supabase.storage.from('files').getPublicUrl(metadataFileName);
    const metadataUri = urlData.publicUrl;

    // Set up Umi with the minting wallet
    const umi = createUmi(SOLANA_RPC).use(mplTokenMetadata());
    const secretKey = bs58.decode(WALLET_PRIVATE_KEY);
    const mintWallet = umi.eddsa.createKeypairFromSecretKey(secretKey);
    umi.use(keypairIdentity(mintWallet));

    // Generate a new mint address
    const mint = generateSigner(umi);

    // Create the NFT
    const { signature } = await createNft(umi, {
      mint,
      name: metadata.name,
      symbol: 'FILE',
      uri: metadataUri,
      sellerFeeBasisPoints: percentAmount(0),
      tokenOwner: publicKey(recipientWallet),
    }).sendAndConfirm(umi);

    const txSignature = bs58.encode(signature);

    return NextResponse.json({
      success: true,
      mintAddress: mint.publicKey.toString(),
      txSignature,
      message: 'NFT minted successfully!',
    });
  } catch (error) {
    console.error('Mint error:', error);
    const message = error instanceof Error ? error.message : 'Minting failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
