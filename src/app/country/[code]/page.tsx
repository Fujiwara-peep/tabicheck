import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { getCountryByCode } from '@/lib/supabase';
import SafetyBadge from '@/components/SafetyBadge';
import PlugTypeInfo from '@/components/PlugTypeInfo';
import PrintButton from '@/components/PrintButton';
import ShareButton from '@/components/ShareButton';
import type { Country } from '@/types/country';

type Props = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const country = await getCountryByCode(code);
  if (!country) {
    return { title: 'TabiCheck | 国が見つかりません' };
  }
  const title = `${country.country_name_ja}旅行準備ガイド | ビザ・電源・治安まとめ | TabiCheck`;
  const description = `${country.country_name_ja}への旅行準備情報。ビザ要件・電源プラグ（${country.plug_type || ''}型）・危険レベル・緊急連絡先など日本人旅行者向け情報を一覧表示。`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'ja_JP',
      siteName: 'TabiCheck',
      url: `/country/${code}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
        <span className="text-2xl">{icon}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 py-2.5 border-b border-gray-50 last:border-0">
      <dt className="text-sm text-gray-500 flex-shrink-0 w-24 sm:w-36">{label}</dt>
      <dd className="text-sm text-gray-800 flex-1 min-w-0">{value || '情報なし'}</dd>
    </div>
  );
}

function BoolBadge({
  value, trueLabel, falseLabel, positiveWhenTrue = false,
}: {
  value: boolean | null;
  trueLabel: string;
  falseLabel: string;
  positiveWhenTrue?: boolean;
}) {
  if (value === null || value === undefined) return <span className="text-gray-400">不明</span>;
  const isGood = positiveWhenTrue ? value : !value;
  return value
    ? <span className={`inline-flex items-center gap-1 font-medium ${isGood ? 'text-green-600' : 'text-red-600'}`}>
        {isGood ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
        {trueLabel}
      </span>
    : <span className={`inline-flex items-center gap-1 font-medium ${isGood ? 'text-green-600' : 'text-amber-600'}`}>
        {isGood ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
        {falseLabel}
      </span>;
}

function MofaLink({ countryNameEn }: { countryNameEn: string }) {
  return (
    <a
      href={`https://www.anzen.mofa.go.jp/info/pcinfectionspothazardinfo_${countryNameEn.split(' ')[0].toLowerCase()}.html`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline mt-3"
    >
      <ExternalLink className="w-3 h-3" />
      外務省公式サイトで確認する
    </a>
  );
}

export default async function CountryPage({ params }: Props) {
  const { code } = await params;
  const countryCode = code.toUpperCase();

  const country: Country | null = await getCountryByCode(countryCode);

  // データベースにない国は「準備中」ページを表示
  if (!country) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">🌍</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">この国の情報は準備中です</h1>
        <p className="text-gray-500 mb-2">国コード: <span className="font-mono font-bold">{countryCode}</span></p>
        <p className="text-gray-500 mb-8">
          現在、40カ国以上の情報を掲載しています。<br />
          対応国は順次拡大予定です。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            別の国を検索する
          </Link>
          <Link
            href="/countries"
            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            対応国一覧を見る
          </Link>
        </div>
        <div className="mt-10 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800 max-w-md mx-auto">
          ⚠️ お急ぎの場合は
          <a
            href="https://www.anzen.mofa.go.jp"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline mx-1"
          >
            外務省海外安全情報
          </a>
          をご確認ください
        </div>
      </main>
    );
  }

  const c = country;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* ページヘッダー */}
      <div className="mb-8">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-20 h-14 flex items-center justify-center flex-shrink-0">
            <img
              src={`https://flagcdn.com/w80/${c.country_code.toLowerCase()}.png`}
              alt={`${c.country_name_ja}の国旗`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-md"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{c.country_name_ja}</h1>
            <p className="text-gray-500 text-sm">{c.country_name_en}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 print:hidden">
            <ShareButton countryName={c.country_name_ja} countryCode={c.country_code} />
            <PrintButton />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <SafetyBadge level={c.safety_level} />
          {c.is_manually_verified ? (
            <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full border border-green-200">
              <CheckCircle className="w-3 h-3" />確認済み情報
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full border border-orange-200">
              <Info className="w-3 h-3" />情報未確認
            </span>
          )}
          {c.last_updated && (
            <span className="text-xs text-gray-400">最終確認: {c.last_updated}</span>
          )}
        </div>
      </div>

      {/* 免責注意 */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 mb-8">
        ⚠️ 情報は参考目的です。渡航前に必ず
        <a
          href="https://www.anzen.mofa.go.jp"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline mx-1"
        >
          外務省海外安全情報
        </a>
        で最新情報をご確認ください。
      </div>

      {/* 8カテゴリ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* カテゴリ① 入国要件 */}
        <InfoCard icon="🛂" title="入国要件">
          <dl>
            <InfoRow
              label="ビザ要否"
              value={<BoolBadge value={c.visa_required} trueLabel="ビザ必要" falseLabel="ビザ不要" />}
            />
            {c.visa_on_arrival && (
              <InfoRow
                label="ビザオンアライバル"
                value={<span className="text-blue-600 font-medium">取得可能</span>}
              />
            )}
            {c.esta_required && (
              <InfoRow
                label="電子渡航認証"
                value={<span className="text-amber-600 font-medium">事前申請が必要</span>}
              />
            )}
            <InfoRow
              label="パスポート残存期間"
              value={c.passport_validity_months ? `${c.passport_validity_months}ヶ月以上` : null}
            />
            <InfoRow
              label="帰国便チケット"
              value={<BoolBadge value={c.return_ticket_required} trueLabel="提示が必要" falseLabel="不要" />}
            />
          </dl>
          {c.visa_notes && (
            <p className="text-sm text-gray-600 mt-3 p-3 bg-blue-50 rounded-lg">{c.visa_notes}</p>
          )}
          {c.entry_documents && (
            <p className="text-sm text-gray-600 mt-2 p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">必要書類:</span> {c.entry_documents}
            </p>
          )}
          <MofaLink countryNameEn={c.country_name_en} />
        </InfoCard>

        {/* カテゴリ② 電気・電源 */}
        <InfoCard icon="🔌" title="電気・電源">
          <dl>
            <InfoRow
              label="コンセント形状"
              value={c.plug_type ? (
                <span className="font-mono font-bold text-blue-700">{c.plug_type}型</span>
              ) : null}
            />
            <InfoRow
              label="電圧"
              value={c.voltage ? (
                <span>
                  {c.voltage}V
                  {c.voltage !== 100 && (
                    <span className="text-amber-600 ml-1 text-xs">（日本は100V）</span>
                  )}
                </span>
              ) : null}
            />
          </dl>
          <PlugTypeInfo plugType={c.plug_type} />
          {c.voltage && c.voltage !== 100 && (
            <div className="mt-3 p-3 bg-amber-50 rounded-lg text-sm text-amber-800">
              ⚠️ 日本（100V）と電圧が異なります。持参する電化製品が対応しているか確認してください。
            </div>
          )}
          <a
            href="https://www.iata.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-3"
          >
            <ExternalLink className="w-3 h-3" />外務省公式サイトで確認する
          </a>
        </InfoCard>

        {/* カテゴリ③ 通信・SIM */}
        <InfoCard icon="📱" title="通信・SIM">
          <dl>
            <InfoRow
              label="空港でのSIM購入"
              value={<BoolBadge value={c.sim_airport_available} trueLabel="購入可能" falseLabel="要事前準備" positiveWhenTrue />}
            />
            <InfoRow
              label="eSIM"
              value={<BoolBadge value={c.esim_supported} trueLabel="対応" falseLabel="非対応" positiveWhenTrue />}
            />
            <InfoRow label="Wi-Fi環境" value={c.wifi_quality} />
          </dl>
          {c.esim_supported && (
            <div className="mt-3 p-3 bg-green-50 rounded-lg text-sm text-green-800">
              ✅ eSIM対応。AiraloなどのeSIMサービスで事前購入がおすすめ。
            </div>
          )}
        </InfoCard>

        {/* カテゴリ④ お金・決済 */}
        <InfoCard icon="💴" title="お金・決済">
          <dl>
            <InfoRow
              label="通貨"
              value={c.currency_name ? `${c.currency_name}（${c.currency_code}）` : null}
            />
            <InfoRow label="カード利用" value={c.card_usage} />
          </dl>
          {c.tip_culture && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
              <span className="font-medium">チップ:</span> {c.tip_culture}
            </div>
          )}
          {c.exchange_notes && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
              <span className="font-medium">両替:</span> {c.exchange_notes}
            </div>
          )}
        </InfoCard>

        {/* カテゴリ⑤ 安全・健康 */}
        <InfoCard icon="🛡️" title="安全・健康">
          <div className="mb-4">
            <SafetyBadge level={c.safety_level} showLabel={true} />
          </div>
          <dl>
            <InfoRow
              label="水道水"
              value={<BoolBadge value={c.tap_water_safe} trueLabel="飲める" falseLabel="飲めない（ペットボトル推奨）" positiveWhenTrue />}
            />
            <InfoRow
              label="海外旅行保険"
              value={c.insurance_required
                ? <span className="text-red-600 font-medium">入国条件として必須</span>
                : '任意（強く推奨）'}
            />
            {c.vaccination_required && c.vaccination_required !== 'なし' && (
              <InfoRow label="必要な予防接種" value={c.vaccination_required} />
            )}
          </dl>
          {c.safety_notes && (
            <p className="text-sm text-gray-600 mt-3 p-3 bg-orange-50 rounded-lg">{c.safety_notes}</p>
          )}
          <MofaLink countryNameEn={c.country_name_en} />
        </InfoCard>

        {/* カテゴリ⑥ 持ち込み禁止・注意品 */}
        <InfoCard icon="🚫" title="持ち込み禁止・注意品">
          {c.prohibited_items ? (
            <p className="text-sm text-gray-700 leading-relaxed">{c.prohibited_items}</p>
          ) : (
            <p className="text-sm text-gray-400">特筆すべき制限なし（一般的な税関ルールを遵守）</p>
          )}
          <a
            href="https://www.customs.go.jp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-3"
          >
            <ExternalLink className="w-3 h-3" />税関公式サイトで確認する
          </a>
        </InfoCard>

        {/* カテゴリ⑦ 文化・マナー */}
        <InfoCard icon="🙏" title="文化・マナー">
          {c.culture_notes ? (
            <p className="text-sm text-gray-700 leading-relaxed">{c.culture_notes}</p>
          ) : (
            <p className="text-sm text-gray-400">情報なし</p>
          )}
        </InfoCard>

        {/* カテゴリ⑧ 緊急連絡先 */}
        <InfoCard icon="🆘" title="緊急連絡先">
          <dl>
            <InfoRow label="警察" value={c.emergency_police ? <span className="font-mono font-bold text-lg text-red-600">{c.emergency_police}</span> : null} />
            <InfoRow label="救急" value={c.emergency_ambulance ? <span className="font-mono font-bold text-lg text-red-600">{c.emergency_ambulance}</span> : null} />
            <InfoRow label="消防" value={c.emergency_fire ? <span className="font-mono font-bold text-lg text-red-600">{c.emergency_fire}</span> : null} />
            <InfoRow label="日本大使館" value={c.embassy_phone ? <span className="font-mono font-bold">{c.embassy_phone}</span> : null} />
          </dl>
          {c.embassy_address && (
            <p className="text-xs text-gray-500 mt-3 p-2 bg-gray-50 rounded">{c.embassy_address}</p>
          )}
          <a
            href={`https://www.mofa.go.jp/mofaj/area/index.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-3"
          >
            <ExternalLink className="w-3 h-3" />外務省で大使館情報を確認する
          </a>
        </InfoCard>
      </div>

      {/* アフィリエイトリンク */}
      <div className="print:hidden mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="https://www.airalo.com"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:shadow-md transition-all"
        >
          <span className="text-2xl">📱</span>
          <div>
            <p className="font-medium text-blue-800 text-sm">eSIMを事前購入</p>
            <p className="text-xs text-blue-600">Airalo - 現地到着後すぐ使える</p>
          </div>
          <ExternalLink className="w-4 h-4 text-blue-400 ml-auto" />
        </a>
        <a
          href="https://www.booking.com"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 border border-indigo-200 rounded-xl hover:shadow-md transition-all"
        >
          <span className="text-2xl">🏨</span>
          <div>
            <p className="font-medium text-indigo-800 text-sm">ホテルを予約</p>
            <p className="text-xs text-indigo-600">Booking.com - 世界最大規模</p>
          </div>
          <ExternalLink className="w-4 h-4 text-indigo-400 ml-auto" />
        </a>
        <a
          href="https://www.sonysonpo.co.jp"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl hover:shadow-md transition-all"
        >
          <span className="text-2xl">🛡️</span>
          <div>
            <p className="font-medium text-green-800 text-sm">海外旅行保険</p>
            <p className="text-xs text-green-600">ソニー損保 - おすすめ</p>
          </div>
          <ExternalLink className="w-4 h-4 text-green-400 ml-auto" />
        </a>
      </div>

      {/* ページ下部リンク */}
      <div className="print:hidden mt-10 text-center">
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ← 別の国を調べる
        </Link>
        <span className="text-gray-300 mx-3">|</span>
        <Link href="/countries" className="text-blue-600 hover:underline text-sm">
          全対応国一覧
        </Link>
      </div>
    </main>
  );
}
