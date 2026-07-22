import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '7px',
        }}
      >
        {/* Terminal prompt: >_ */}
        <svg
          viewBox="0 0 20 20"
          fill="none"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline
            points="4,6 9,10 4,14"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="11"
            y1="14"
            x2="16"
            y2="14"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  )
}
