import { NextRequest, NextResponse } from 'next/server';
import { getCountryByCode } from '@/lib/supabase';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const countryCode = code.toUpperCase();

  const country = await getCountryByCode(countryCode);
  if (country) {
    return NextResponse.json({ data: country, source: 'database' });
  }

  return NextResponse.json(
    { error: 'この国の情報は現在準備中です' },
    { status: 404 }
  );
}
