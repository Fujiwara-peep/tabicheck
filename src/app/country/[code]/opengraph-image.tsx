import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import path from 'path';
import { getCountryByCode } from '@/lib/supabase';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const SAFETY_COLORS = ['#16a34a', '#ca8a04', '#ea580c', '#dc2626', '#7f1d1d'];
const SAFETY_LABELS = ['安全', '注意', '十分注意', '渡航中止勧告', '退避勧告'];
const SAFETY_BG = ['#f0fdf4', '#fefce8', '#fff7ed', '#fef2f2', '#fdf2f8'];

function loadFont(): ArrayBuffer {
  const fontPath = path.join(
    process.cwd(),
    'node_modules/@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-700-normal.woff'
  );
  const buf = readFileSync(fontPath);
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

async function loadFlagImage(code: string): Promise<string | null> {
  try {
    const res = await fetch(`https://flagcdn.com/w160/${code.toLowerCase()}.png`);
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const b64 = Buffer.from(buf).toString('base64');
    return `data:image/png;base64,${b64}`;
  } catch {
    return null;
  }
}

type Props = {
  params: Promise<{ code: string }>;
};

export default async function Image({ params }: Props) {
  const { code } = await params;
  const [country, flagSrc] = await Promise.all([
    getCountryByCode(code.toUpperCase()),
    loadFlagImage(code),
  ]);

  const fontData = loadFont();
  const fonts = [{ name: 'NotoSansJP', data: fontData, weight: 700 as const }];

  // 未登録国の場合：汎用OGP画像
  if (!country) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            fontFamily: 'NotoSansJP, sans-serif',
          }}
        >
          <div style={{ fontSize: '96px', marginBottom: '24px' }}>🌍</div>
          <div style={{ fontSize: '48px', fontWeight: 700, color: 'white' }}>TabiCheck</div>
          <div style={{ fontSize: '24px', color: 'rgba(255,255,255,0.8)', marginTop: '16px' }}>
            海外旅行準備情報サービス
          </div>
        </div>
      ),
      { width: 1200, height: 630, fonts }
    );
  }

  const safetyLevel = country.safety_level ?? 0;
  const safetyColor = SAFETY_COLORS[safetyLevel] ?? SAFETY_COLORS[0];
  const safetyLabel = SAFETY_LABELS[safetyLevel] ?? SAFETY_LABELS[0];
  const safetyBg = SAFETY_BG[safetyLevel] ?? SAFETY_BG[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          fontFamily: 'NotoSansJP, sans-serif',
          background: 'white',
        }}
      >
        {/* 左パネル：ブランド＋国旗 */}
        <div
          style={{
            width: '340px',
            background: 'linear-gradient(180deg, #1e40af 0%, #2563eb 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            gap: '24px',
          }}
        >
          {flagSrc && (
            <img
              src={flagSrc}
              style={{
                width: '220px',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
            />
          )}
          <div
            style={{
              fontSize: '26px',
              fontWeight: 700,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            ✈️ TabiCheck
          </div>
          <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', textAlign: 'center' }}>
            日本人向け海外旅行準備情報
          </div>
        </div>

        {/* 右パネル：国情報 */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '56px 56px',
            background: '#f8fafc',
          }}
        >
          {/* 国名 */}
          <div
            style={{
              fontSize: '68px',
              fontWeight: 700,
              color: '#0f172a',
              lineHeight: 1.1,
              marginBottom: '6px',
            }}
          >
            {country.country_name_ja}
          </div>
          <div
            style={{
              fontSize: '26px',
              color: '#64748b',
              marginBottom: '36px',
              letterSpacing: '0.5px',
            }}
          >
            {country.country_name_en}
          </div>

          {/* 情報カード群 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* 危険度 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                background: 'white',
                borderRadius: '14px',
                padding: '16px 22px',
                border: `2px solid ${safetyBg}`,
              }}
            >
              <span style={{ fontSize: '26px' }}>🛡️</span>
              <span style={{ fontSize: '18px', color: '#64748b', flex: 1 }}>危険度</span>
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: safetyColor,
                  background: safetyBg,
                  padding: '4px 16px',
                  borderRadius: '100px',
                }}
              >
                Lv.{safetyLevel} {safetyLabel}
              </span>
            </div>

            {/* ビザ */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                background: 'white',
                borderRadius: '14px',
                padding: '16px 22px',
                border: '2px solid #f1f5f9',
              }}
            >
              <span style={{ fontSize: '26px' }}>🛂</span>
              <span style={{ fontSize: '18px', color: '#64748b', flex: 1 }}>ビザ</span>
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: country.visa_required ? '#dc2626' : '#16a34a',
                  background: country.visa_required ? '#fef2f2' : '#f0fdf4',
                  padding: '4px 16px',
                  borderRadius: '100px',
                }}
              >
                {country.visa_required ? '要ビザ' : 'ビザ不要'}
              </span>
            </div>

            {/* コンセント */}
            {country.plug_type && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  background: 'white',
                  borderRadius: '14px',
                  padding: '16px 22px',
                  border: '2px solid #f1f5f9',
                }}
              >
                <span style={{ fontSize: '26px' }}>🔌</span>
                <span style={{ fontSize: '18px', color: '#64748b', flex: 1 }}>コンセント</span>
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#1d4ed8',
                    background: '#eff6ff',
                    padding: '4px 16px',
                    borderRadius: '100px',
                  }}
                >
                  {country.plug_type}型 / {country.voltage}V
                </span>
              </div>
            )}
          </div>

          {/* URL */}
          <div style={{ marginTop: '24px', fontSize: '17px', color: '#94a3b8' }}>
            tabicheck.com/country/{code.toLowerCase()}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts }
  );
}
