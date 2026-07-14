import { ImageResponse } from 'next/og'
import { site } from '@/content/site'

export const alt = site.meta.title
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Gegenereerde OG-image: merknaam + tagline in de app-huisstijl (blauw). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #2563eb 0%, #172554 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: '-0.03em' }}>
          {site.brand.name}
        </div>
        <div style={{ marginTop: 24, fontSize: 44, fontWeight: 600, color: '#dbeafe', maxWidth: 900 }}>
          Van offerte tot betaalde factuur, vanop de werf.
        </div>
        <div style={{ marginTop: 40, fontSize: 28, color: '#bfdbfe' }}>
          De app voor zelfstandige elektriciens in België
        </div>
      </div>
    ),
    size,
  )
}
