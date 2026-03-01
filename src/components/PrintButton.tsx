'use client';

import { Printer } from 'lucide-react';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="print:hidden inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 font-medium text-sm rounded-xl border-2 border-blue-500 hover:bg-blue-50 active:bg-blue-100 transition-colors shadow-sm"
    >
      <Printer className="w-4 h-4" />
      印刷 / PDF保存
    </button>
  );
}
