import Link from 'next/link'

export default function Header() {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      padding: '10px 20px',
      gap: '20px',
      background: '#0f0f0f',
      borderBottom: '1px solid #272727',
      position: 'sticky', top: 0, zIndex: 100
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <div style={{
          width: '36px', height: '25px', background: '#FF0000',
          borderRadius: '6px', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: '13px'
        }}>▶</div>
        <span style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '-1px' }}>
          YouTube
        </span>
      </Link>
      <div style={{ flex: 1, maxWidth: '600px', display: 'flex', justifyContent: 'center' }}>
        <input
          placeholder="Search"
          style={{
            width: '100%', padding: '8px 16px',
            background: '#121212', color: '#fff',
            border: '1px solid #303030', borderRadius: '20px',
            outline: 'none', fontSize: '14px'
          }}
        />
      </div>
      <div style={{
        width: '32px', height: '32px', borderRadius: '50%',
        background: '#383838', display: 'flex',
        alignItems: 'center', justifyContent: 'center', fontSize: '14px'
      }}>👤</div>
    </header>
  )
}
