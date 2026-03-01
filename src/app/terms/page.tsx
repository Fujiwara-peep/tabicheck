import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '利用規約 | TabiCheck',
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">利用規約</h1>
      <p className="text-gray-400 text-sm mb-8">最終更新日: 2025年1月1日</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">第1条（サービスについて）</h2>
          <p>TabiCheck（以下「本サービス」）は、海外旅行の準備に役立つ情報を提供するウェブサービスです。本サービスの利用により、本規約に同意したものとみなします。</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">第2条（免責事項）</h2>
          <p>本サービスが提供する情報は参考目的のみです。以下の点についてご注意ください。</p>
          <ul className="list-disc ml-6 space-y-1 mt-2">
            <li>ビザ要件・入国規制は予告なく変更される場合があります</li>
            <li>本サービスの情報に誤りが含まれる場合があります</li>
            <li>本サービスの情報に基づいた行動による損害について、当サービスは責任を負いません</li>
            <li>渡航前に必ず外務省・各国大使館の公式情報をご確認ください</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">第3条（禁止事項）</h2>
          <p>本サービスの利用にあたり、以下の行為を禁止します。</p>
          <ul className="list-disc ml-6 space-y-1 mt-2">
            <li>本サービスのコンテンツの無断複製・転載</li>
            <li>本サービスへの過度なアクセス（DDoS等）</li>
            <li>本サービスを利用した違法行為</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">第4条（規約の変更）</h2>
          <p>本規約は予告なく変更される場合があります。変更後も本サービスを利用した場合、変更後の規約に同意したものとみなします。</p>
        </section>
      </div>

      <div className="mt-10">
        <Link href="/" className="text-blue-600 hover:underline text-sm">← トップページへ</Link>
      </div>
    </main>
  );
}
