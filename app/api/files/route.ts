import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getTokenBalance, getTierFromBalance, getStorageLimits } from '@/lib/solana';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('wallet');

    if (!walletAddress) {
      return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
    }

    // Get user data
    let { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', walletAddress)
      .single();

    // Create user if doesn't exist
    if (!user) {
      const { data: newUser } = await supabase
        .from('users')
        .insert({ wallet_address: walletAddress, total_storage_used: 0, tier: 'free' })
        .select()
        .single();
      user = newUser;
    }

    // Get files
    const { data: files, error: filesError } = await supabase
      .from('files')
      .select('*')
      .eq('owner_wallet', walletAddress)
      .order('created_at', { ascending: false });

    if (filesError) throw filesError;

    // Check token balance and update tier
    const tokenMint = process.env.NEXT_PUBLIC_FILE_TOKEN_MINT || '';
    const balance = tokenMint ? await getTokenBalance(walletAddress, tokenMint) : 0;
    const tier = getTierFromBalance(balance);
    const limits = getStorageLimits(tier);

    // Update tier if changed
    if (user && user.tier !== tier) {
      await supabase
        .from('users')
        .update({ tier })
        .eq('wallet_address', walletAddress);
    }

    return NextResponse.json({
      files: files || [],
      storageUsed: user?.total_storage_used || 0,
      storageLimit: limits.total,
      tier,
    });
  } catch (error) {
    console.error('Error fetching files:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch files';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
