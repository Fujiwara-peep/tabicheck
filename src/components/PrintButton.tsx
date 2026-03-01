'use client';

import { Printer } from 'lucide-react';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      aria-label="印刷・PDF保存"
      className="print:hidden inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <Printer className="w-4 h-4" />
      印刷
    </button>
  );
}
