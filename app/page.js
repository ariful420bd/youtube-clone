import Link from 'next/link'
import Header from '@/components/Header'

const videos = [
  { id: 'cat-lover-2024', yt: 'J---aiyznGQ', title: 'Top 10 Funniest Cat Videos Ever', ch: 'CatWorld', views: '2.3M views', time: '3 days ago', thumb: 'https://i.ytimg.com/vi/J---aiyznGQ/hqdefault.jpg' },
  { id: 'cooking-tutorial-2024', yt: 'dQw4w9WgXcQ', title: 'Easy Cooking Tips for Beginners', ch: 'ChefMaster', views: '890K views', time: '1 week ago', thumb: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg' },
  { id: 'travel-vlog-bali', yt: 'L_jWHffIx5E', title: 'Amazing Travel Vlog - Bali 2024', ch: 'TravelDude', views: '1.5M views', time: '5 days ago', thumb: 'https://i.ytimg.com/vi/L_jWHffIx5E/hqdefault.jpg' },
  { id: 'tech-review-phone', yt: '9bZkp7q19f0', title: 'iPhone 16 Pro Max Unboxing Review', ch: 'TechGuru', views: '3.1M views', time: '2 days ago', thumb: 'https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg' },
  { id: 'funny-pranks-best', yt: 'kJQP7kiw5Fk', title: 'Best Funny Pranks Compilation 2024', ch: 'PrankKing', views: '5.7M views', time: '1 day ago', thumb: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg' },
  { id: 'music-cover-hits', yt: 'fJ9rUzIMcZQ', title: 'Top Music Covers You Must Hear', ch: 'MusicLove', views: '2.8M views', time: '4 days ago', thumb: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg' },
  { id: 'sports-highlights', yt: 'OPf0YbXqDm0', title: 'Best Football Highlights This Week', ch: 'SportsHub', views: '1.9M views', time: '6 hours ago', thumb: 'https://i.ytimg.com/vi/OPf0YbXqDm0/hqdefault.jpg' },
  { id: 'diy-crafts-easy', yt: '3JZ_D3ELwOQ', title: 'Easy DIY Crafts For Home Decoration', ch: 'CraftIdeas', views: '780K views', time: '2 weeks ago', thumb: 'https://i.ytimg.com/vi/3JZ_D3ELwOQ/hqdefault.jpg' }
]

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ padding: '24px', maxWidth: '1800px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px 16px'
        }}>
          {videos.map(v => (
            <Link key={v.id} href={`/watch?v=${v.id}`}>
              <div style={{ cursor: 'pointer' }}>
                <img
                  src={v.thumb}
                  alt={v.title}
                  style={{
                    width: '100%', aspectRatio: '16/9',
                    objectFit: 'cover', borderRadius: '12px',
                    display: 'block'
                  }}
                />
                <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: '#383838', flexShrink: 0
                  }} />
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 500, lineHeight: 1.3, marginBottom: '4px' }}>
                      {v.title}
                    </h3>
                    <p style={{ color: '#aaa', fontSize: '13px' }}>{v.ch}</p>
                    <p style={{ color: '#aaa', fontSize: '13px' }}>{v.views} • {v.time}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

