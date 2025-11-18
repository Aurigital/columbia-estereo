import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Columbia Estéreo 92.7 FM - La Romántica'
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
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fafafa',
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              background: 'linear-gradient(135deg, #D90043 0%, #FFB700 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 40,
              boxShadow: '0 10px 30px rgba(217, 0, 67, 0.3)',
            }}
          >
            <span
              style={{
                color: 'white',
                fontSize: 48,
                fontWeight: 700,
              }}
            >
              92.7
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              style={{
                color: '#000000',
                fontSize: 64,
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              Columbia Estéreo
            </span>
            <span
              style={{
                color: '#FF3D34',
                fontSize: 24,
                fontWeight: 400,
                marginTop: 8,
              }}
            >
              La Romántica de Costa Rica
            </span>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
            marginTop: 20,
          }}
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #D90043 0%, #FFB700 100%)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: 20,
              fontSize: 18,
            }}
          >
            Música Romántica
          </span>
          <span
            style={{
              backgroundColor: '#FF3D34',
              color: 'white',
              padding: '8px 16px',
              borderRadius: 20,
              fontSize: 18,
            }}
          >
            Noticias
          </span>
          <span
            style={{
              backgroundColor: '#000000',
              color: 'white',
              padding: '8px 16px',
              borderRadius: 20,
              fontSize: 18,
            }}
          >
            En Vivo 24/7
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 