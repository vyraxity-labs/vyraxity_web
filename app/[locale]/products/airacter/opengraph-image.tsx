import { ImageResponse } from 'next/og'

export const alt = 'Airacter — A Vyraxity Product'

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
          backgroundColor: '#0F121C',
          padding: '80px',
          fontFamily: 'sans-serif',
          border: '1px solid #283049',
          position: 'relative',
        }}
      >
        {/* Subtle Prism glow in top corner */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124, 92, 255, 0.25) 0%, rgba(38, 208, 206, 0.1) 60%, transparent 80%)',
          }}
        />

        {/* Top Brand Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span
            style={{
              color: '#7C5CFF',
              fontSize: '18px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            A VYRAXITY PRODUCT
          </span>
        </div>

        {/* Product Title & Tagline */}
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
              fontSize: '72px',
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Airacter
          </h1>
          <p
            style={{
              fontSize: '32px',
              fontWeight: 300,
              color: '#9CA3AF',
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            Persona-based AI with atmospheric presence and adaptive voice.
          </p>
        </div>

        {/* Footer Meta Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '1px solid #283049',
            paddingTop: '24px',
          }}
        >
          <span
            style={{
              color: '#9CA3AF',
              fontSize: '20px',
              letterSpacing: '0.05em',
            }}
          >
            vyraxity.com/products/airacter
          </span>
          <span
            style={{
              color: '#26D0CE',
              fontSize: '18px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Launching November 2026
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
