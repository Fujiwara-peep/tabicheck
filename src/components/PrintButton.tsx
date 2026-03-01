'use client';

import { Printer, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PrintButton() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(
      typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    );
  }, []);

  const handleClick = async () => {
    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch {
        // キャンセルまたは非対応の場合はフォールバック
        window.print();
      }
    } else {
      window.print();
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isMobile ? '共有・保存' : '印刷・PDF保存'}
      className="print:hidden inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
    >
      {isMobile ? (
        <>
          <Share2 className="w-4 h-4" />
          共有・保存
        </>
      ) : (
        <>
          <Printer className="w-4 h-4" />
          印刷
        </>
      )}
    </button>
  );
}
