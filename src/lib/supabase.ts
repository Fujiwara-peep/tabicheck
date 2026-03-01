import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Country, CountrySummary } from '@/types/country';

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url === 'your_supabase_project_url') {
    throw new Error('Supabase environment variables are not configured.');
  }
  _client = createClient(url, key);
  return _client;
}

export async function getCountryByCode(code: string): Promise<Country | null> {
  try {
    const upperCode = code.toUpperCase();
    const { data, error } = await getClient()
      .from('countries')
      .select('*')
      .eq('country_code', upperCode)
      .limit(1);
    if (error) {
      console.error('[getCountryByCode] error:', JSON.stringify(error));
      return null;
    }
    if (!data || data.length === 0) {
      console.error('[getCountryByCode] no data for code:', upperCode);
      return null;
    }
    return data[0] as Country;
  } catch (e) {
    console.error('[getCountryByCode] exception:', e);
    return null;
  }
}

export async function searchCountries(query: string): Promise<CountrySummary[]> {
  try {
    const { data, error } = await getClient()
      .from('countries')
      .select('id, country_name_ja, country_name_en, country_code, country_flag_emoji, visa_required, safety_level, is_manually_verified')
      .or(`country_name_ja.ilike.%${query}%,country_name_en.ilike.%${query}%,country_code.ilike.%${query}%`)
      .limit(10);
    if (error || !data) return [];
    return data as CountrySummary[];
  } catch {
    return [];
  }
}

export async function getAllCountries(): Promise<CountrySummary[]> {
  try {
    const { data, error } = await getClient()
      .from('countries')
      .select('id, country_name_ja, country_name_en, country_code, country_flag_emoji, visa_required, safety_level, is_manually_verified')
      .order('country_name_ja');
    if (error || !data) return [];
    return data as CountrySummary[];
  } catch {
    return [];
  }
}

export async function getPopularCountries(): Promise<CountrySummary[]> {
  const popularCodes = ['KR', 'TW', 'TH', 'US', 'HK', 'SG', 'FR', 'IT', 'VN', 'AU'];
  try {
    const { data, error } = await getClient()
      .from('countries')
      .select('id, country_name_ja, country_name_en, country_code, country_flag_emoji, visa_required, safety_level, is_manually_verified')
      .in('country_code', popularCodes);
    if (error || !data) return [];
    const sorted = popularCodes
      .map(code => data.find((c) => c.country_code === code))
      .filter(Boolean);
    return sorted as CountrySummary[];
  } catch {
    return [];
  }
}
