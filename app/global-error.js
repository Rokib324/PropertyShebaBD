'use client'

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#f5f5f5'
        }}>
          <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
            Something went wrong!
          </h1>
          <p style={{ marginBottom: '20px', color: '#666' }}>
            {error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={reset}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}

