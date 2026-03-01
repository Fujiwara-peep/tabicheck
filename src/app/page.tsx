import Link from 'next/link';
import { Suspense } from 'react';
import { Globe } from 'lucide-react';
import SearchBox from '@/components/SearchBox';
import { getPopularCountries } from '@/lib/supabase';

export const metadata = {
  title: 'TabiCheck | 海外旅行準備情報を一発検索',
  description: '国名を入力するだけで、ビザ・電源プラグ・治安・通貨・緊急連絡先など海外旅行に必要な準備情報が全て一覧表示。日本人旅行者向けの海外渡航情報サービス。',
};

const safetyLabel = (level: number | null) => {
  if (level === null || level === undefined) return null;
  const colors = ['bg-green-100 text-green-700', 'bg-yellow-100 text-yellow-700', 'bg-orange-100 text-orange-700', 'bg-red-100 text-red-700', 'bg-red-900 text-white'];
  return { color: colors[level] || colors[0], label: `危険Lv.${level}` };
};

async function PopularCountries() {
  const countries = await getPopularCountries();

  return (
    <div className="mt-12">
      <p className="text-center text-sm font-medium text-gray-400 mb-5 tracking-wide">日本人に人気の渡航先 Top 10</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {countries.map((country) => {
          const safety = safetyLabel(country.safety_level);
          return (
            <Link
              key={country.country_code}
              href={`/country/${country.country_code.toLowerCase()}`}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="w-14 h-10 flex items-center justify-center">
                <img
                  src={`https://flagcdn.com/w80/${country.country_code.toLowerCase()}.png`}
                  alt={`${country.country_name_ja}の国旗`}
                  className="max-w-full max-h-full object-contain rounded shadow-sm drop-shadow-sm"
                />
              </div>
              <span className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors text-center">
                {country.country_name_ja}
              </span>
              <div className="flex flex-wrap justify-center gap-1">
                {country.visa_required && (
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                    ビザ必要
                  </span>
                )}
                {safety && country.safety_level !== null && country.safety_level! >= 2 && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${safety.color}`}>
                    {safety.label}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      {/* ヒーローセクション */}
      <section className="max-w-5xl mx-auto px-4 pt-10 sm:pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm px-4 py-1.5 rounded-full mb-6 font-medium">
          <img src="https://flagcdn.com/w20/jp.png" alt="日本国旗" className="h-3.5 w-auto object-contain" />
          日本人旅行者向け・完全無料
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          海外旅行の準備情報を<br />
          <span className="text-blue-600">一発で調べる</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
          ビザ・電源プラグ・治安・通貨・緊急連絡先など<br className="hidden md:block" />
          旅行前に必要な情報がすべて一画面に
        </p>

        <SearchBox />

        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="text-sm text-gray-400">または</span>
          <Link
            href="/countries"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            <Globe className="w-4 h-4" />
            国一覧から探す →
          </Link>
        </div>

        <Suspense fallback={
          <div className="mt-12 flex justify-center gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-24 h-28 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        }>
          <PopularCountries />
        </Suspense>
      </section>

      {/* 免責注意 */}
      <div className="max-w-3xl mx-auto px-4 pb-4">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800 text-center">
          ⚠️ 掲載情報は参考目的です。渡航前に必ず
          <a
            href="https://www.anzen.mofa.go.jp"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline mx-1"
          >
            外務省海外安全情報
          </a>
          で最新情報をご確認ください。
        </div>
      </div>

      {/* 特徴セクション */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">8カテゴリの情報を一画面に</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { icon: '🛂', title: '入国要件', desc: 'ビザ・ESTA・パスポート残存期間' },
            { icon: '🔌', title: '電気・電源', desc: 'コンセント形状・電圧' },
            { icon: '📱', title: '通信・SIM', desc: 'SIM購入・eSIM・Wi-Fi事情' },
            { icon: '💴', title: 'お金・決済', desc: '通貨・チップ・カード普及度' },
            { icon: '🛡️', title: '安全・健康', desc: '外務省危険レベル・水道水' },
            { icon: '🚫', title: '持ち込み禁止', desc: '国固有の禁止品・注意品' },
            { icon: '🙏', title: '文化・マナー', desc: '宗教・服装・タブー' },
            { icon: '🆘', title: '緊急連絡先', desc: '警察・救急・日本大使館' },
          ].map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center p-4 sm:p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-3xl sm:text-4xl mb-2 sm:mb-3">{item.icon}</span>
              <h3 className="font-bold text-gray-800 mb-1 text-sm sm:text-base">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
