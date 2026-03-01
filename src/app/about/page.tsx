import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, CheckCircle, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'TabiCheckについて | 海外旅行準備情報サービス',
  description: 'TabiCheckは日本人旅行者向けの海外旅行準備情報サービスです。情報の信頼性・更新方針についてご説明します。',
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">TabiCheckについて</h1>
      <p className="text-gray-500 mb-10">日本人旅行者のための旅行準備情報サービス</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">このサービスとは</h2>
          <p className="text-gray-600 leading-relaxed">
            TabiCheckは、海外旅行前に「ビザ 日本人 〇〇」「〇〇 電源プラグ」「〇〇 持ち込み禁止」のような
            検索を目的地の数だけ繰り返している日本人旅行者のためのサービスです。
            国名を入力するだけで、旅行前に必要な準備情報がすべて一画面に表示されます。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">表示する情報の8カテゴリ</h2>
          <ul className="space-y-2">
            {[
              '① 入国要件（ビザ・ESTA・パスポート残存期間）',
              '② 電気・電源（コンセント形状・電圧）',
              '③ 通信・SIM（現地SIM・eSIM・Wi-Fi環境）',
              '④ お金・決済（通貨・チップ・クレジットカード）',
              '⑤ 安全・健康（外務省危険レベル・水道水・予防接種）',
              '⑥ 持ち込み禁止・注意品',
              '⑦ 文化・マナー',
              '⑧ 緊急連絡先（警察・救急・日本大使館）',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">情報の信頼性について</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800">確認済み情報</p>
                <p className="text-sm text-green-700 mt-1">
                  主要40カ国以上を手動で調査・確認した情報です。外務省・各国大使館の公式情報を参照しています。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-orange-800">情報未確認</p>
                <p className="text-sm text-orange-700 mt-1">
                  掲載情報が未検証の国です。渡航前に必ず外務省・各国大使館の公式情報をご確認ください。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">情報ソース（優先順位）</h2>
          <ol className="space-y-2">
            {[
              { label: '外務省「海外安全情報」', url: 'https://www.anzen.mofa.go.jp' },
              { label: '各国在日大使館の公式サイト', url: null },
              { label: 'IATA Travel Centre（ビザ情報）', url: null },
              { label: '各国観光局・政府公式サイト', url: null },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700">
                <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i + 1}
                </span>
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                    {item.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  item.label
                )}
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">免責事項</h2>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-900 leading-relaxed">
            <p>
              本サービスの情報は参考目的のみです。ビザ要件・入国規制は政治情勢により急変する場合があります。
              渡航前に必ず外務省の公式情報および関係機関にてご確認ください。
              情報の誤りによる損害について、当サービスは一切の責任を負いません。
            </p>
          </div>
        </section>
      </div>

      <div className="mt-10 flex gap-4">
        <Link href="/" className="text-blue-600 hover:underline text-sm">← トップページへ</Link>
        <Link href="/countries" className="text-blue-600 hover:underline text-sm">国一覧を見る</Link>
      </div>
    </main>
  );
}
