import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | TabiCheck',
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">プライバシーポリシー</h1>
      <p className="text-gray-400 text-sm mb-8">最終更新日: 2025年1月1日</p>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">収集する情報</h2>
          <p>本サービスは以下の情報を収集する場合があります。</p>
          <ul className="list-disc ml-6 space-y-1 mt-2">
            <li>アクセスログ（IPアドレス、ブラウザ情報、アクセス日時）</li>
            <li>検索キーワード（国名など）</li>
            <li>Google Analytics によるアクセス解析情報</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Cookieについて</h2>
          <p>本サービスは以下の目的でCookieを使用します。</p>
          <ul className="list-disc ml-6 space-y-1 mt-2">
            <li>アクセス解析（Google Analytics）</li>
            <li>広告配信（Google AdSense）</li>
          </ul>
          <p className="mt-2">
            ブラウザの設定からCookieを無効化できますが、一部のサービスが正常に動作しない場合があります。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Google Analytics</h2>
          <p>
            本サービスはGoogle Analytics（Googleが提供するアクセス解析ツール）を使用しています。
            Google Analyticsはデータ収集のためにCookieを使用します。
            詳細は<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Googleプライバシーポリシー</a>をご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">第三者への提供</h2>
          <p>法令に基づく場合を除き、収集した情報を第三者に提供することはありません。</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">お問い合わせ</h2>
          <p>プライバシーポリシーに関するお問い合わせは、サービス内のお問い合わせフォームよりご連絡ください。</p>
        </section>
      </div>

      <div className="mt-10">
        <Link href="/" className="text-blue-600 hover:underline text-sm">← トップページへ</Link>
      </div>
    </main>
  );
}
