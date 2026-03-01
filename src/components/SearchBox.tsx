'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import type { CountrySummary } from '@/types/country';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CountrySummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 1) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const json = await res.json();
        setResults(json.data || []);
        setIsOpen(true);
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (country: CountrySummary) => {
    setIsOpen(false);
    setQuery('');
    router.push(`/country/${country.country_code.toLowerCase()}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) handleSelect(results[0]);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setIsOpen(true)}
            placeholder="国名を入力（例：タイ、フランス、US）"
            className="w-full pl-12 pr-12 py-4 text-lg border-2 border-blue-200 rounded-2xl shadow-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all bg-white"
            aria-label="国名検索"
            autoComplete="off"
          />
          {isLoading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </form>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden">
          {results.map((country) => (
            <button
              key={country.country_code}
              onClick={() => handleSelect(country)}
              className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-blue-50 transition-colors text-left border-b border-gray-50 last:border-0"
            >
              <div className="w-10 h-7 flex items-center justify-center flex-shrink-0">
                <img
                  src={`https://flagcdn.com/w40/${country.country_code.toLowerCase()}.png`}
                  alt={`${country.country_name_ja}の国旗`}
                  className="max-w-full max-h-full object-contain rounded drop-shadow-sm"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-base">{country.country_name_ja}</p>
                <p className="text-xs text-gray-400">{country.country_name_en}</p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                {country.visa_required && (
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                    ビザ必要
                  </span>
                )}
                {country.safety_level !== null && country.safety_level !== undefined && country.safety_level >= 2 && (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                    危険Lv.{country.safety_level}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && query.length > 0 && results.length === 0 && !isLoading && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl p-6 text-center text-gray-400">
          <span className="text-2xl block mb-2">🔍</span>
          「{query}」は見つかりませんでした
        </div>
      )}
    </div>
  );
}
