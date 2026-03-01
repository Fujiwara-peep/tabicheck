type Props = {
  level: number | null;
  showLabel?: boolean;
};

const levelConfig = [
  { label: 'レベル0', color: 'bg-green-100 text-green-700 border-green-200', dot: 'bg-green-500' },
  { label: 'レベル1', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', dot: 'bg-yellow-500' },
  { label: 'レベル2', color: 'bg-orange-100 text-orange-700 border-orange-200', dot: 'bg-orange-500' },
  { label: 'レベル3', color: 'bg-red-100 text-red-700 border-red-200', dot: 'bg-red-500' },
  { label: 'レベル4', color: 'bg-red-900 text-white border-red-900', dot: 'bg-red-900' },
];

const levelDescription = [
  '危険なし',
  '十分注意',
  '不要不急の渡航中止',
  '渡航中止勧告',
  '退避勧告',
];

export default function SafetyBadge({ level, showLabel = true }: Props) {
  if (level === null || level === undefined) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border bg-gray-100 text-gray-500 border-gray-200">
        <span className="w-2 h-2 rounded-full bg-gray-400" />
        不明
      </span>
    );
  }

  const config = levelConfig[level] || levelConfig[0];
  const desc = levelDescription[level] || '';

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border font-medium ${config.color}`}>
      <span className={`w-2 h-2 rounded-full ${config.dot}`} />
      外務省 {config.label}
      {showLabel && ` - ${desc}`}
    </span>
  );
}
