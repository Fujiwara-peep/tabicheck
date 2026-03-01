'use client';

import { useState, useRef, useEffect } from 'react';
import { Share2, Link2, Check } from 'lucide-react';

interface ShareButtonProps {
  countryName: string;
  countryCode: string;
}

export default function ShareButton({ countryName, countryCode }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const url = `https://tabicheck.vercel.app/country/${countryCode.toLowerCase()}`;
  const shareText = `${countryName}の旅行前チェックリスト｜ビザ・電源・治安・緊急連絡先まとめ ✈️`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(url);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement('textarea');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 1500);
  };

  return (
    <div className="relative print:hidden" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="シェアメニューを開く"
        className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <Share2 className="w-4 h-4" />
        シェア
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-2 z-20 flex flex-col gap-1.5 min-w-[180px]">
          {/* LINE */}
          <a
            href={`https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 bg-[#06C755] text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            LINEでシェア
          </a>

          {/* X */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 bg-black text-white text-sm font-bold rounded-lg hover:opacity-80 transition-opacity"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Xでポスト
          </a>

          {/* URLコピー */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-2.5 px-3 py-2.5 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-green-600 font-semibold">コピーしました!</span>
              </>
            ) : (
              <>
                <Link2 className="w-4 h-4 flex-shrink-0" />
                URLをコピー
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
