import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCountries } from '@/lib/supabase';
import CountryListClient from '@/components/CountryListClient';

export const metadata: Metadata = {
  title: '対応国一覧 | TabiCheck',
  description: 'TabiCheckが対応している全国の旅行準備情報一覧。ビザ・電源・治安・緊急連絡先などの情報を掲載。',
};

export default async function CountriesPage() {
  const countries = await getAllCountries();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">対応国一覧</h1>
        <p className="text-gray-500">{countries.length}カ国の旅行準備情報を掲載中</p>
      </div>

      <CountryListClient countries={countries} />

      <div className="mt-10 text-center">
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ← トップページへ
        </Link>
      </div>
    </main>
  );
}
