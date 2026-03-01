import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://tabicheck.com'),
  title: {
    default: 'TabiCheck | 海外旅行準備情報を一発検索',
    template: '%s | TabiCheck',
  },
  description: '国名を入力するだけで、ビザ・電源プラグ・治安・通貨・緊急連絡先など海外旅行に必要な準備情報が全て一覧表示。日本人旅行者向けの無料サービス。',
  keywords: ['海外旅行', '旅行準備', 'ビザ', '電源プラグ', '治安', '緊急連絡先', '日本人'],
  authors: [{ name: 'TabiCheck' }],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'TabiCheck',
    title: 'TabiCheck | 海外旅行準備情報を一発検索',
    description: '国名を入力するだけで、ビザ・電源プラグ・治安・通貨・緊急連絡先など海外旅行に必要な準備情報が全て一覧表示。',
    url: 'https://tabicheck.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TabiCheck | 海外旅行準備情報を一発検索',
    description: '国名を入力するだけで旅行準備情報が全て表示されるサービス。',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: '3cVJy4GaL6h_591JWdNoaOd52d5Qp8wejIuicJs3wEo',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}})();` }} />
      </head>
      <body className={`${notoSansJP.className} antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
