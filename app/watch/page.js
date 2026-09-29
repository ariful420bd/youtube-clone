'use client'
import { useEffect, useState, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import { supabase } from '@/lib/supabase'

const videoData = {
  'cat-lover-2024':   { yt: 'J---aiyznGQ', title: 'Top 10 Funniest Cat Videos Ever', ch: 'CatWorld', views: '2,314,567', subs: '1.2M' },
  'cooking-tutorial-2024': { yt: 'dQw4w9WgXcQ', title: 'Easy Cooking Tips for Beginners', ch: 'ChefMaster', views: '890,123', subs: '540K' },
  'travel-vlog-bali': { yt: 'L_jWHffIx5E', title: 'Amazing Travel Vlog - Bali 2024', ch: 'TravelDude', views: '1,502,890', subs: '820K' },
  'tech-review-phone':{ yt: '9bZkp7q19f0', title: 'iPhone 16 Pro Max Unboxing Review', ch: 'TechGuru', views: '3,100,442', subs: '2.1M' },
  'funny-pranks-best':{ yt: 'kJQP7kiw5Fk', title: 'Best Funny Pranks Compilation 2024', ch: 'PrankKing', views: '5,720,119', subs: '4.3M' },
  'music-cover-hits': { yt: 'fJ9rUzIMcZQ', title: 'Top Music Covers You Must Hear', ch: 'MusicLove', views: '2,801,556', subs: '1.7M' },
  'sports-highlights':{ yt: 'OPf0YbXqDm0', title: 'Best Football Highlights This Week', ch: 'SportsHub', views: '1,900,220', subs: '980K' },
  'diy-crafts-easy':  { yt: '3JZ_D3ELwOQ', title: 'Easy DIY Crafts For Home Decoration', ch: 'CraftIdeas', views: '780,342', subs: '310K' }
}

function WatchContent() {
  const searchParams = useSearchParams()
  const roomId = searchParams.get('v') || 'default'
  const video = videoData[roomId] || videoData['cat-lover-2024']

  return (
    <main style={{
      padding: '24px',
      maxWidth: '1700px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) 400px',
      gap: '24px'
    }}>
      {/* ---- বাম দিক: ভিডিও প্লেয়ার ---- */}
      <div>
        <div style={{
          width: '100%', aspectRatio: '16/9',
          background: '#000', borderRadius: '12px', overflow: 'hidden'
        }}>
          <iframe
            width="100%" height="100%"
            src={`https://www.youtube.com/embed/${video.yt}?autoplay=1&mute=0`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ display: 'block' }}
          />
        </div>

        <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '16px' }}>
          {video.title}
        </h1>

        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginTop: '12px', flexWrap: 'wrap', gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: '#383838'
            }} />
            <div>
              <p style={{ fontWeight: 500 }}>{video.ch}</p>
              <p style={{ color: '#aaa', fontSize: '13px' }}>{video.subs} subscribers</p>
            </div>
            <button style={{
              background: '#fff', color: '#000',
              padding: '8px 16px', borderRadius: '20px',
              border: 'none', fontWeight: 500, marginLeft: '8px'
            }}>Subscribe</button>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{
              background: '#272727', color: '#fff', border: 'none',
              padding: '8px 16px', borderRadius: '20px', fontSize: '14px'
            }}>👍 {video.views}</button>
            <button style={{
              background: '#272727', color: '#fff', border: 'none',
              padding: '8px 16px', borderRadius: '20px', fontSize: '14px'
            }}>Share</button>
          </div>
        </div>

        <div style={{
          background: '#272727', padding: '12px',
          borderRadius: '12px', marginTop: '16px',
          fontSize: '14px', lineHeight: 1.6
        }}>
          <p style={{ fontWeight: 500, marginBottom: '8px' }}>
            {video.views} views  •  Premiered 2 days ago
          </p>
          <p style={{ color: '#ccc' }}>
            Welcome to the official channel. Don't forget to like, share and subscribe for more amazing content!
          </p>
        </div>
      </div>

      {/* ---- ডান দিক: Live Chat (আসল চ্যাট এখানে) ---- */}
      <LiveChat roomId={roomId} />
    </main>
  )
}

/* ============== Live Chat কম্পোনেন্ট ============== */
function LiveChat({ roomId }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [name, setName] = useState('')
  const [nameSet, setNameSet] = useState(false)
  const [connected, setConnected] = useState(false)
  const channelRef = useRef(null)
  const bottomRef = useRef(null)
  const fileInputRef = useRef(null)
  const [recording, setRecording] = useState(false)
  const recorderRef = useRef(null)

  useEffect(() => {
    const saved = localStorage.getItem('yt_viewer_name')
    if (saved) { setName(saved); setNameSet(true) }
  }, [])

  useEffect(() => {
    if (!nameSet) return
    const channel = supabase.channel(`yt-room-${roomId}`, {
      config: { broadcast: { self: true } }
    })
    channel
      .on('broadcast', { event: 'msg' }, ({ payload }) => {
        setMessages(prev => [...prev, payload])
        setTimeout(() => {
          setMessages(prev => prev.filter(m => m.id !== payload.id))
        }, 5 * 60 * 1000) // ৫ মিনিট পর মুছে যাবে
      })
      .subscribe(status => {
        if (status === 'SUBSCRIBED') setConnected(true)
      })
    channelRef.current = channel
    return () => { supabase.removeChannel(channel) }
  }, [roomId, nameSet])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const saveName = () => {
    if (!name.trim()) return
    localStorage.setItem('yt_viewer_name', name.trim())
    setNameSet(true)
  }

  const send = (payload) => {
    if (!channelRef.current) return
    channelRef.current.send({
      type: 'broadcast',
      event: 'msg',
      payload: { id: Date.now() + Math.random(), user: name, ...payload }
    })
  }

  const sendText = () => {
    if (!input.trim()) return
    send({ kind: 'text', text: input.trim() })
    setInput('')
  }

  const sendImage = async (file) => {
    if (!file) return
    const path = `${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from('chat-files').upload(path, file)
    if (error) { alert('Upload failed. Make sure chat-files bucket is public.'); return }
    const { data } = supabase.storage.from('chat-files').getPublicUrl(path)
    send({ kind: 'image', url: data.publicUrl })
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const rec = new MediaRecorder(stream)
      const chunks = []
      rec.ondataavailable = e => chunks.push(e.data)
      rec.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' })
        const path = `voice/${Date.now()}.webm`
        const { error } = await supabase.storage.from('chat-files').upload(path, blob)
        if (!error) {
          const { data } = supabase.storage.from('chat-files').getPublicUrl(path)
          send({ kind: 'voice', url: data.publicUrl })
        }
        stream.getTracks().forEach(t => t.stop())
      }
      rec.start()
      recorderRef.current = rec
      setRecording(true)
    } catch { alert('Microphone access denied') }
  }

  const stopRecording = () => {
    recorderRef.current?.stop()
    setRecording(false)
  }

  return (
    <div style={{
      background: '#0f0f0f',
      border: '1px solid #272727',
      borderRadius: '12px',
      height: 'calc(100vh - 130px)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden', position: 'sticky', top: '80px'
    }}>
      <div style={{
        padding: '14px 16px',
        borderBottom: '1px solid #272727',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <span style={{ fontSize: '16px', fontWeight: 500 }}>Live chat</span>
        <span style={{ fontSize: '13px', color: '#aaa' }}>Top chat ▾</span>
      </div>

      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '10px'
      }}>
        {messages.length === 0 && (
          <p style={{ color: '#717171', fontSize: '13px', textAlign: 'center', marginTop: '20px' }}>
            Welcome to live chat! 👋
          </p>
        )}
        {messages.map(m => (
          <div key={m.id} style={{ fontSize: '14px', lineHeight: 1.4 }}>
            <span style={{ color: '#aaa', fontWeight: 500, marginRight: '6px' }}>
              {m.user}:
            </span>
            {m.kind === 'text' && <span>{m.text}</span>}
            {m.kind === 'image' && (
              <img src={m.url} alt="" style={{
                maxWidth: '100%', borderRadius: '8px', marginTop: '4px', display: 'block'
              }} />
            )}
            {m.kind === 'voice' && (
              <audio controls src={m.url} style={{ width: '100%', marginTop: '4px', height: '32px' }} />
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={{ padding: '12px 16px', borderTop: '1px solid #272727' }}>
        {!nameSet ? (
          <div>
            <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '8px' }}>
              Pick a display name to join chat
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveName()}
                placeholder="Your name"
                style={{
                  flex: 1, padding: '8px 14px', borderRadius: '20px',
                  background: '#121212', border: '1px solid #303030',
                  color: '#fff', outline: 'none', fontSize: '14px'
                }}
              />
              <button onClick={saveName} style={{
                background: '#3ea6ff', color: '#0f0f0f',
                border: 'none', padding: '8px 16px',
                borderRadius: '20px', fontWeight: 500
              }}>Join</button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={() => setInput(prev => prev + '😀')}
              style={{
                background: 'transparent', border: 'none',
                color: '#aaa', fontSize: '20px', padding: '4px'
              }}
            >😊</button>

            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                background: 'transparent', border: 'none',
                color: '#aaa', fontSize: '18px', padding: '4px'
              }}
            >📎</button>
            <input
              type="file" ref={fileInputRef} accept="image/*"
              style={{ display: 'none' }}
              onChange={e => sendImage(e.target.files[0])}
            />

            <button
              onClick={recording ? stopRecording : startRecording}
              style={{
                background: recording ? '#ff0000' : 'transparent',
                border: 'none', borderRadius: '50%',
                color: recording ? '#fff' : '#aaa',
                fontSize: '18px', padding: '4px',
                width: '32px', height: '32px'
              }}
            >🎤</button>

            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendText()}
              placeholder={connected ? 'Chat...' : 'Connecting...'}
              style={{
                flex: 1, padding: '8px 14px', borderRadius: '20px',
                background: '#121212', border: '1px solid #303030',
                color: '#fff', outline: 'none', fontSize: '14px'
              }}
            />

            <button onClick={sendText} style={{
              background: 'transparent', border: 'none',
              color: '#3ea6ff', fontSize: '16px', fontWeight: 500
            }}>Send</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function WatchPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div style={{padding: '24px'}}>Loading...</div>}>
        <WatchContent />
      </Suspense>
    </>
  )
}
