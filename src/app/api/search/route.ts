import { NextRequest, NextResponse } from 'next/server';
import { searchCountries } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') || '';

  if (query.length < 1) {
    return NextResponse.json({ data: [] });
  }

  const results = await searchCountries(query);
  return NextResponse.json({ data: results });
}
