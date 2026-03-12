import { useState } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const COLORS = ['#F5A623', '#5BC4C0', '#F4A7B9']

const initialNotes = [
  { id: 1, title: 'Lorem Ipsum', body: 'Lorem ipsum dolor sit amet consectetur. Ultrices nunc quis arcu sed slt viverra. Faucibus dui tellus viverra neque ultrices. <333', color: '#F5A623', top: '8%', left: '2%', liked: false, bookmarked: false, author: 'John Doe', date: 'Feb 8' },
  { id: 2, title: 'Lorem Ipsum', body: 'Lorem ipsum dolor sit amet consectetur. Ultrices nunc quis arcu sed slt viverra. Faucibus dui tellus viverra neque ultrices. <333', color: '#5BC4C0', top: '38%', left: '28%', liked: false, bookmarked: false, author: 'John Doe', date: 'Feb 8' },
  { id: 3, title: 'Lorem Ipsum', body: 'Lorem ipsum dolor sit amet consectetur. Ultrices nunc quis arcu sed slt viverra. Faucibus dui tellus viverra neque ultrices. <333', color: '#F4A7B9', top: '10%', left: '56%', liked: false, bookmarked: false, author: 'John Doe', date: 'Feb 8' },
]

export default function BulletinPage() {
  const [notes, setNotes] = useState(initialNotes)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')
  const [newColor, setNewColor] = useState(COLORS[0])

  const toggleLike = (id: number) => setNotes(ns => ns.map(n => n.id === id ? { ...n, liked: !n.liked } : n))
  const toggleBookmark = (id: number) => setNotes(ns => ns.map(n => n.id === id ? { ...n, bookmarked: !n.bookmarked } : n))

  const addNote = () => {
    if (!newTitle.trim()) return
    setNotes(ns => [...ns, {
      id: Date.now(), title: newTitle, body: newBody, color: newColor,
      top: `${10 + Math.random() * 40}%`, left: `${5 + Math.random() * 50}%`,
      liked: false, bookmarked: false, author: 'You', date: 'Now'
    }])
    setNewTitle(''); setNewBody(''); setNewColor(COLORS[0]); setShowAddModal(false)
  }

  return (
    <>
      <Head>
        <title>Postd – Bulletin Board</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen flex flex-col bg-[#F5F0E8]">
        <Navbar activePage="bulletin" />

        <div className="px-8 pt-6 pb-2">
          <h1 className="text-3xl font-bold font-dm text-black">Bulletin Board</h1>
        </div>

        {/* Cork Board */}
        <div className="flex-1 relative mx-8 mb-6 rounded-lg overflow-hidden" style={{ minHeight: 480 }}>
          {/* Cork texture background */}
          <div className="absolute inset-0 cork-bg" />
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 15% 25%, rgba(160,100,40,0.3) 2px, transparent 2px),
              radial-gradient(circle at 45% 65%, rgba(120,70,20,0.25) 1.5px, transparent 1.5px),
              radial-gradient(circle at 75% 35%, rgba(180,120,50,0.2) 2px, transparent 2px),
              radial-gradient(circle at 30% 80%, rgba(140,90,30,0.2) 1px, transparent 1px),
              radial-gradient(circle at 85% 75%, rgba(160,110,45,0.25) 1.5px, transparent 1.5px)
            `,
            backgroundSize: '80px 80px, 60px 60px, 100px 100px, 70px 70px, 90px 90px'
          }} />

          {/* Sticky Notes */}
          {notes.map(note => (
            <div
              key={note.id}
              className="absolute sticky-shadow rounded-sm p-4 flex flex-col gap-2"
              style={{
                backgroundColor: note.color,
                top: note.top,
                left: note.left,
                width: 200,
                minHeight: 180,
                transform: `rotate(${(note.id % 3 - 1) * 1.5}deg)`,
              }}
            >
              {/* Pin */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-zinc-700 shadow-md border-2 border-zinc-500" />

              <h3 className="font-semibold text-sm text-zinc-900 font-dm mt-2">{note.title}</h3>
              <p className="text-xs text-zinc-800 leading-relaxed font-dm flex-1">{note.body}</p>

              <div className="flex items-center gap-3 mt-auto">
                <button onClick={() => toggleLike(note.id)} className="text-zinc-700 hover:text-red-600 transition">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={note.liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" className={note.liked ? 'text-red-600' : ''}>
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
                <button onClick={() => toggleBookmark(note.id)} className="text-zinc-700 hover:text-zinc-900 transition">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={note.bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {/* Add button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="absolute bottom-4 right-4 w-10 h-10 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full flex items-center justify-center shadow-lg transition text-xl"
          >
            +
          </button>
        </div>

        <Footer />

        {/* Add Note Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
              <h2 className="text-lg font-semibold mb-4 font-dm">New Note</h2>
              <input
                className="w-full border border-[#D8D0C4] rounded-lg px-3 py-2.5 text-sm font-dm mb-3 focus:border-[#5BC4C0] outline-none"
                placeholder="Title"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
              />
              <textarea
                className="w-full border border-[#D8D0C4] rounded-lg px-3 py-2.5 text-sm font-dm mb-4 focus:border-[#5BC4C0] outline-none resize-none"
                placeholder="What's on your mind?"
                rows={4}
                value={newBody}
                onChange={e => setNewBody(e.target.value)}
              />
              <div className="flex gap-3 mb-4">
                {COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => setNewColor(c)}
                    className={`w-8 h-8 rounded-full border-2 transition ${newColor === c ? 'border-zinc-800 scale-110' : 'border-transparent'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 border border-[#D8D0C4] rounded-lg text-sm font-dm text-zinc-600 hover:border-zinc-400 transition">Cancel</button>
                <button onClick={addNote} className="flex-1 py-2.5 bg-[#5BC4C0] hover:bg-[#3DA8A4] text-white rounded-lg text-sm font-dm transition">Post Note</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
