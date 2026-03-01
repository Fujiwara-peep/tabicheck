import Link from 'next/link';
import { Plane, Globe, Search } from 'lucide-react';

export const metadata = {
  title: 'ページが見つかりません | TabiCheck',
  description: 'お探しのページが見つかりませんでした。',
};

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 px-4">
      <div className="text-center max-w-lg w-full">
        {/* 404 illustration */}
        <div className="relative inline-block mb-8">
          <div className="text-[90px] sm:text-[130px] md:text-[160px] font-black text-blue-100 dark:text-gray-700 select-none leading-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-blue-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl"
              style={{ transform: 'rotate(-12deg)' }}
            >
              <Plane className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" style={{ transform: 'rotate(12deg)' }} />
            </div>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
          ページが見つかりません
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed text-sm sm:text-base">
          お探しのページは存在しないか、<br />
          URLが間違っている可能性があります。
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            <Plane className="w-4 h-4" />
            トップページへ
          </Link>
          <Link
            href="/countries"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 transition-colors font-medium"
          >
            <Globe className="w-4 h-4" />
            国一覧を見る
          </Link>
        </div>

        {/* Popular links */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 flex items-center justify-center gap-2">
            <Search className="w-4 h-4" />
            人気の渡航先
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { code: 'kr', name: '🇰🇷 韓国' },
              { code: 'tw', name: '🇹🇼 台湾' },
              { code: 'th', name: '🇹🇭 タイ' },
              { code: 'us', name: '🇺🇸 アメリカ' },
              { code: 'sg', name: '🇸🇬 シンガポール' },
              { code: 'fr', name: '🇫🇷 フランス' },
            ].map((c) => (
              <Link
                key={c.code}
                href={`/country/${c.code}`}
                className="text-sm text-blue-600 hover:text-blue-800 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-full transition-colors font-medium"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-gray-400 dark:text-gray-600">
          TabiCheck | 日本人向け海外旅行準備情報サービス
        </p>
      </div>
    </main>
  );
}
