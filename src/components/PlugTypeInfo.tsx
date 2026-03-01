type PlugData = {
  description: string;
  needsAdapter: boolean;
};

function getPlugData(rawType: string): PlugData {
  const type = rawType.toUpperCase().replace(/\s/g, '');

  if (type === 'A') {
    return { description: '縦長スリット2穴（日本と同じ形）', needsAdapter: false };
  }
  if (type === 'B' || type === 'A/B' || type === 'B/A') {
    return { description: '縦スリット2穴＋丸いアース穴', needsAdapter: false };
  }
  if (type.startsWith('C')) {
    return { description: '丸穴2つ（ヨーロッパ標準）', needsAdapter: true };
  }
  if (type === 'F' || type === 'E' || type === 'E/F' || type === 'SE') {
    return { description: '丸穴2つ＋両サイドにアース接点（Schuko）', needsAdapter: true };
  }
  if (type === 'G') {
    return { description: '大きな四角穴3つ・英国式', needsAdapter: true };
  }
  if (type === 'I' || type === 'O') {
    return { description: 'V字型に斜め穴2〜3つ・豪州式', needsAdapter: true };
  }
  return { description: '現地で形状をご確認ください', needsAdapter: true };
}

export default function PlugTypeInfo({ plugType }: { plugType: string | null | undefined }) {
  if (!plugType) return null;

  const data = getPlugData(plugType);

  return (
    <div className="mt-3 p-3 bg-gray-50 rounded-lg flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="text-sm text-gray-600">{data.description}</span>
      <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
        data.needsAdapter
          ? 'bg-red-100 text-red-700'
          : 'bg-green-100 text-green-700'
      }`}>
        {data.needsAdapter ? '⚠ 変換プラグが必要' : '✓ そのまま使えます'}
      </span>
    </div>
  );
}
