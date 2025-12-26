import { NextRequest, NextResponse } from 'next/server';
import { PublicKey, Connection, Keypair, Transaction, SystemProgram, TransactionInstruction } from '@solana/web3.js';
import { createInitializeMintInstruction, createAssociatedTokenAccountInstruction, createMintToInstruction, getAssociatedTokenAddress, MINT_SIZE, TOKEN_PROGRAM_ID, getMinimumBalanceForRentExemptMint } from '@solana/spl-token';
import { supabase } from '@/lib/supabase';
import bs58 from 'bs58';

const SOLANA_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || '';

// Helper to send and confirm transaction with timeout
async function sendAndConfirmTx(
  connection: Connection,
  transaction: Transaction,
  signers: Keypair[]
): Promise<string> {
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = signers[0].publicKey;
  transaction.sign(...signers);
  
  const signature = await connection.sendRawTransaction(transaction.serialize(), {
    skipPreflight: false,
    preflightCommitment: 'confirmed',
  });
  
  await connection.confirmTransaction({
    signature,
    blockhash,
    lastValidBlockHeight,
  }, 'confirmed');
  
  return signature;
}

// Token Metadata Program ID
const TOKEN_METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

// Helper to create metadata instruction
function createMetadataInstruction(
  metadataPDA: PublicKey,
  mint: PublicKey,
  mintAuthority: PublicKey,
  payer: PublicKey,
  updateAuthority: PublicKey,
  name: string,
  symbol: string,
  uri: string
): TransactionInstruction {
  const data = Buffer.alloc(1000);
  let offset = 0;

  // Instruction discriminator for CreateMetadataAccountV3
  data.writeUInt8(33, offset); // CreateMetadataAccountV3
  offset += 1;

  // Name (string with length prefix)
  const nameBytes = Buffer.from(name);
  data.writeUInt32LE(nameBytes.length, offset);
  offset += 4;
  nameBytes.copy(data, offset);
  offset += nameBytes.length;

  // Symbol (string with length prefix)
  const symbolBytes = Buffer.from(symbol);
  data.writeUInt32LE(symbolBytes.length, offset);
  offset += 4;
  symbolBytes.copy(data, offset);
  offset += symbolBytes.length;

  // URI (string with length prefix)
  const uriBytes = Buffer.from(uri);
  data.writeUInt32LE(uriBytes.length, offset);
  offset += 4;
  uriBytes.copy(data, offset);
  offset += uriBytes.length;

  // Seller fee basis points (u16)
  data.writeUInt16LE(0, offset);
  offset += 2;

  // Creators (Option<Vec<Creator>>) - None
  data.writeUInt8(0, offset);
  offset += 1;

  // Collection (Option<Collection>) - None
  data.writeUInt8(0, offset);
  offset += 1;

  // Uses (Option<Uses>) - None
  data.writeUInt8(0, offset);
  offset += 1;

  // Is mutable (bool)
  data.writeUInt8(1, offset);
  offset += 1;

  // Collection details (Option<CollectionDetails>) - None
  data.writeUInt8(0, offset);
  offset += 1;

  return new TransactionInstruction({
    keys: [
      { pubkey: metadataPDA, isSigner: false, isWritable: true },
      { pubkey: mint, isSigner: false, isWritable: false },
      { pubkey: mintAuthority, isSigner: true, isWritable: false },
      { pubkey: payer, isSigner: true, isWritable: true },
      { pubkey: updateAuthority, isSigner: false, isWritable: false },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    programId: TOKEN_METADATA_PROGRAM_ID,
    data: data.slice(0, offset),
  });
}

// Helper to create master edition instruction
function createMasterEditionInstruction(
  editionPDA: PublicKey,
  mint: PublicKey,
  updateAuthority: PublicKey,
  mintAuthority: PublicKey,
  payer: PublicKey,
  metadataPDA: PublicKey
): TransactionInstruction {
  const data = Buffer.alloc(20);
  let offset = 0;

  // Instruction discriminator for CreateMasterEditionV3
  data.writeUInt8(17, offset); // CreateMasterEditionV3
  offset += 1;

  // Max supply (Option<u64>) - Some(0) for unlimited
  data.writeUInt8(1, offset); // Some
  offset += 1;
  data.writeBigUInt64LE(BigInt(0), offset);
  offset += 8;

  return new TransactionInstruction({
    keys: [
      { pubkey: editionPDA, isSigner: false, isWritable: true },
      { pubkey: mint, isSigner: false, isWritable: true },
      { pubkey: updateAuthority, isSigner: true, isWritable: false },
      { pubkey: mintAuthority, isSigner: true, isWritable: false },
      { pubkey: payer, isSigner: true, isWritable: true },
      { pubkey: metadataPDA, isSigner: false, isWritable: true },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    programId: TOKEN_METADATA_PROGRAM_ID,
    data: data.slice(0, offset),
  });
}

export const maxDuration = 60; // Allow up to 60 seconds for minting

export async function POST(request: NextRequest) {
  try {
    const { fileUrl, fileName, recipientWallet, shortId } = await request.json();

    if (!WALLET_PRIVATE_KEY) {
      return NextResponse.json({ error: 'Minting not configured. Contact admin.' }, { status: 500 });
    }

    if (!recipientWallet) {
      return NextResponse.json({ error: 'Recipient wallet address required' }, { status: 400 });
    }

    // Validate recipient wallet
    let recipientPubkey: PublicKey;
    try {
      recipientPubkey = new PublicKey(recipientWallet);
    } catch {
      return NextResponse.json({ error: 'Invalid wallet address' }, { status: 400 });
    }

    // Create minimal metadata JSON
    const nftName = fileName.length > 32 ? fileName.substring(0, 29) + '...' : fileName;
    const metadata = {
      name: nftName,
      symbol: 'FILE',
      description: 'File on filecoin',
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

    // Set up connection and wallet
    const connection = new Connection(SOLANA_RPC, 'confirmed');
    const secretKey = bs58.decode(WALLET_PRIVATE_KEY);
    const payer = Keypair.fromSecretKey(secretKey);
    
    // Generate new mint keypair
    const mintKeypair = Keypair.generate();
    const mintPubkey = mintKeypair.publicKey;

    // Get associated token account for recipient
    const associatedTokenAccount = await getAssociatedTokenAddress(mintPubkey, recipientPubkey);

    // Get metadata PDA
    const [metadataPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mintPubkey.toBuffer()],
      TOKEN_METADATA_PROGRAM_ID
    );

    // Get master edition PDA
    const [masterEditionPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mintPubkey.toBuffer(), Buffer.from('edition')],
      TOKEN_METADATA_PROGRAM_ID
    );

    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    // Transaction 1: Create mint and token account, mint 1 token
    const tx1 = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: payer.publicKey,
        newAccountPubkey: mintPubkey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMintInstruction(mintPubkey, 0, payer.publicKey, payer.publicKey),
      createAssociatedTokenAccountInstruction(payer.publicKey, associatedTokenAccount, recipientPubkey, mintPubkey),
      createMintToInstruction(mintPubkey, associatedTokenAccount, payer.publicKey, 1)
    );

    await sendAndConfirmTx(connection, tx1, [payer, mintKeypair]);

    // Transaction 2: Create metadata
    const tx2 = new Transaction().add(
      createMetadataInstruction(
        metadataPDA,
        mintPubkey,
        payer.publicKey,
        payer.publicKey,
        payer.publicKey,
        nftName,
        'FILE',
        metadataUri
      )
    );

    await sendAndConfirmTx(connection, tx2, [payer]);

    // Transaction 3: Create master edition
    const tx3 = new Transaction().add(
      createMasterEditionInstruction(
        masterEditionPDA,
        mintPubkey,
        payer.publicKey,
        payer.publicKey,
        payer.publicKey,
        metadataPDA
      )
    );

    const signature = await sendAndConfirmTx(connection, tx3, [payer]);

    return NextResponse.json({
      success: true,
      mintAddress: mintPubkey.toString(),
      txSignature: signature,
      message: 'NFT minted successfully!',
    });
  } catch (error) {
    console.error('Mint error:', error);
    const message = error instanceof Error ? error.message : 'Minting failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
