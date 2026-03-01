import Link from 'next/link';
import { Plane, Globe } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="print:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl hover:text-blue-700 transition-colors">
          <Plane className="w-6 h-6" />
          TabiCheck
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <Link
            href="/countries"
            className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Globe className="w-4 h-4" />
            国一覧
          </Link>
          <Link href="/about" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
