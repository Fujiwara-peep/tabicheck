'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import type { CountrySummary } from '@/types/country';

const REGION_MAP: Record<string, string> = {
  // アジア
  JP: 'アジア', KR: 'アジア', TW: 'アジア', TH: 'アジア', SG: 'アジア',
  MY: 'アジア', ID: 'アジア', VN: 'アジア', PH: 'アジア', CN: 'アジア',
  HK: 'アジア', IN: 'アジア', LK: 'アジア', NP: 'アジア', KH: 'アジア', MM: 'アジア',
  // ヨーロッパ
  FR: 'ヨーロッパ', DE: 'ヨーロッパ', IT: 'ヨーロッパ', ES: 'ヨーロッパ',
  GB: 'ヨーロッパ', PT: 'ヨーロッパ', GR: 'ヨーロッパ', NL: 'ヨーロッパ',
  AT: 'ヨーロッパ', HR: 'ヨーロッパ', FI: 'ヨーロッパ', DK: 'ヨーロッパ', SE: 'ヨーロッパ',
  // 北米
  US: '北米', CA: '北米', MX: '北米',
  // 南米
  BR: '南米', AR: '南米',
  // アフリカ
  ZA: 'アフリカ', KE: 'アフリカ',
  // 中東
  AE: '中東', TR: '中東', IL: '中東',
  // オセアニア
  AU: 'オセアニア', NZ: 'オセアニア',
};

const REGIONS = ['すべて', 'アジア', 'ヨーロッパ', '北米', '南米', 'オセアニア', '中東', 'アフリカ'];

type Props = {
  countries: CountrySummary[];
};

export default function CountryListClient({ countries }: Props) {
  const [query, setQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState('すべて');

  const filtered = useMemo(() => {
    return countries.filter((c) => {
      const matchRegion =
        activeRegion === 'すべて' || REGION_MAP[c.country_code] === activeRegion;
      const q = query.trim().toLowerCase();
      const matchSearch =
        !q ||
        c.country_name_ja.includes(query.trim()) ||
        c.country_name_en.toLowerCase().includes(q) ||
        c.country_code.toLowerCase() === q;
      return matchRegion && matchSearch;
    });
  }, [countries, query, activeRegion]);

  return (
    <>
      {/* 検索ボックス */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="国名で絞り込む（例：タイ、France）"
          className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 text-sm bg-white transition-all"
        />
      </div>

      {/* 地域タブ */}
      <div className="flex flex-wrap gap-2 mb-5">
        {REGIONS.map((region) => (
          <button
            key={region}
            onClick={() => setActiveRegion(region)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeRegion === region
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* 件数表示 */}
      <p className="text-sm text-gray-400 mb-4">
        {filtered.length}カ国を表示
        {activeRegion !== 'すべて' && <span className="ml-1 text-blue-500">・{activeRegion}</span>}
        {query && <span className="ml-1 text-blue-500">・「{query}」</span>}
      </p>

      {/* グリッド */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {filtered.map((country) => (
            <Link
              key={country.country_code}
              href={`/country/${country.country_code.toLowerCase()}`}
              className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="w-12 h-8 sm:w-14 sm:h-10 flex items-center justify-center">
                <img
                  src={`https://flagcdn.com/w80/${country.country_code.toLowerCase()}.png`}
                  alt={`${country.country_name_ja}の国旗`}
                  className="max-w-full max-h-full object-contain rounded shadow-sm drop-shadow-sm"
                />
              </div>
              <p className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors text-sm text-center leading-tight">
                {country.country_name_ja}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">該当する国が見つかりませんでした</p>
          {query && (
            <button
              onClick={() => setQuery('')}
              className="mt-3 text-sm text-blue-500 hover:underline px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              検索をクリア
            </button>
          )}
        </div>
      )}
    </>
  );
}
