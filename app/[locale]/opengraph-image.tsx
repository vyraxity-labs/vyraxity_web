import { ImageResponse } from 'next/og'

export const alt = 'Vyraxity — Technology, Built from Africa. Built for the World.'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#0A0A0A',
          padding: '80px',
          fontFamily: 'sans-serif',
          border: '1px solid #222222',
        }}
      >
        {/* Top wordmark / brand tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '14px',
              height: '14px',
              backgroundColor: '#F2A93B',
              borderRadius: '2px',
            }}
          />
          <span
            style={{
              color: '#F4F3EE',
              fontSize: '24px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            VYRAXITY
          </span>
        </div>

        {/* Main Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '1000px',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 600,
              color: '#F4F3EE',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Technology, built from Africa.
          </h1>
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 600,
              color: '#A4A39D',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Built for the world.
          </h1>
        </div>

        {/* Footer Meta Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '1px solid #222222',
            paddingTop: '24px',
          }}
        >
          <span
            style={{
              color: '#A4A39D',
              fontSize: '20px',
              letterSpacing: '0.05em',
            }}
          >
            vyraxity.com
          </span>
          <span
            style={{
              color: '#F2A93B',
              fontSize: '18px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Building for the long term
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
