import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="print:hidden bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <p className="font-bold text-gray-700 dark:text-gray-200 mb-1">TabiCheck</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">日本人向け海外旅行準備情報サービス</p>
          </div>
          <nav className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/countries" className="hover:text-blue-600 transition-colors">国一覧</Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">このサービスについて</Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">利用規約</Link>
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">プライバシーポリシー</Link>
          </nav>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
            掲載情報は参考目的です。渡航前に必ず
            <a
              href="https://www.anzen.mofa.go.jp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mx-1"
            >
              外務省海外安全情報
            </a>
            で最新情報をご確認ください。
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-2">
            &copy; {new Date().getFullYear()} TabiCheck. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
