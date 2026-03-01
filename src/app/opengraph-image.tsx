import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import path from 'path';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function loadFont(): ArrayBuffer {
  const fontPath = path.join(
    process.cwd(),
    'node_modules/@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-700-normal.woff'
  );
  const buf = readFileSync(fontPath);
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

export default function Image() {
  const fontData = loadFont();

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
          background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)',
          fontFamily: 'NotoSansJP, sans-serif',
          position: 'relative',
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          }}
        />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              background: 'white',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '44px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
          >
            ✈️
          </div>
          <span style={{ fontSize: '60px', fontWeight: 700, color: 'white', letterSpacing: '-1px' }}>
            TabiCheck
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: '38px',
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
            marginBottom: '16px',
            lineHeight: 1.3,
          }}
        >
          海外旅行の準備情報を一発検索
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '20px',
            color: 'rgba(255,255,255,0.8)',
            textAlign: 'center',
            marginBottom: '52px',
            lineHeight: 1.6,
          }}
        >
          ビザ・電源・治安・通貨・緊急連絡先など旅行前の情報がすべて一画面に
        </div>

        {/* Category badges */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '900px',
          }}
        >
          {['🛂 入国要件', '🔌 電気・電源', '📱 通信・SIM', '💴 お金・決済', '🛡️ 安全・健康', '🆘 緊急連絡先'].map(
            (item) => (
              <div
                key={item}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '100px',
                  padding: '10px 22px',
                  fontSize: '17px',
                  color: 'white',
                }}
              >
                {item}
              </div>
            )
          )}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            fontSize: '18px',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '1px',
          }}
        >
          tabicheck.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'NotoSansJP', data: fontData, weight: 700 }],
    }
  );
}
