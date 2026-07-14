import { ImageResponse } from 'next/og'

// Gegenereerde favicon: blauw vierkant met witte 'F' — sluit aan op het
// Inter-woordmerk (§13: voorlopig woordmerk, later vervangbaar door echt logo).
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#2563eb',
          color: '#ffffff',
          fontSize: 22,
          fontWeight: 700,
          borderRadius: 6,
          fontFamily: 'sans-serif',
        }}
      >
        F
      </div>
    ),
    size,
  )
}
