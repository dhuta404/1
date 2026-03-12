import { useState } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const inboxMessages = [
  { id: 1, from: 'Jane Doe', preview: 'Dear John, Lorem ipsum dolor sit amet...', date: 'Feb 10', read: false },
  { id: 2, from: 'Alice Smith', preview: 'Hey! I saw your post on the bulletin...', date: 'Feb 8', read: true },
  { id: 3, from: 'Bob Lee', preview: 'Lorem ipsum dolor sit amet consectetur...', date: 'Feb 6', read: true },
]

const outboxMessages = [
  { id: 1, to: 'Jane Doe', preview: 'Dear Jane, Lorem ipsum dolor sit amet...', date: 'Feb 9', status: 'Delivered' },
  { id: 2, to: 'Alice Smith', preview: 'Hi Alice! I loved your note about...', date: 'Feb 7', status: 'Delivered' },
]

export default function MessagesPage() {
  const [folder, setFolder] = useState<'inbox' | 'outbox'>('inbox')
  const [selected, setSelected] = useState<number | null>(null)

  const messages = folder === 'inbox' ? inboxMessages : outboxMessages

  // Stacked letter preview (right panel)
  const letterContent = selected !== null
    ? (folder === 'inbox'
        ? inboxMessages.find(m => m.id === selected)
        : outboxMessages.find(m => m.id === selected))
    : null

  return (
    <>
      <Head>
        <title>Postd – Messages</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen flex flex-col bg-[#F5F0E8]">
        <Navbar activePage="messages" />

        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="w-40 border-r border-[#D8D0C4] bg-[#F5F0E8] flex flex-col py-6 gap-1 px-3">
            <button
              onClick={() => { setFolder('inbox'); setSelected(null) }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-dm text-left transition
                ${folder === 'inbox' ? 'bg-[#5BC4C0]/10 text-[#3DA8A4] font-medium' : 'text-zinc-500 hover:text-black'}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
              Inbox
            </button>
            <button
              onClick={() => { setFolder('outbox'); setSelected(null) }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-dm text-left transition
                ${folder === 'outbox' ? 'bg-[#5BC4C0]/10 text-[#3DA8A4] font-medium' : 'text-zinc-500 hover:text-black'}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
              Outbox
            </button>
          </div>

          {/* Message list */}
          <div className="w-64 border-r border-[#D8D0C4] flex flex-col py-4 px-0">
            <h2 className="text-sm font-semibold font-dm px-4 mb-3 text-zinc-700 capitalize">{folder}</h2>
            {messages.map(msg => (
              <button
                key={msg.id}
                onClick={() => setSelected(msg.id)}
                className={`w-full text-left px-4 py-3 border-b border-[#D8D0C4] transition
                  ${selected === msg.id ? 'bg-[#5BC4C0]/10' : 'hover:bg-zinc-100'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-dm font-medium ${!('read' in msg) || (msg as typeof inboxMessages[0]).read ? 'text-zinc-600' : 'text-black font-semibold'}`}>
                    {'from' in msg ? msg.from : (msg as typeof outboxMessages[0]).to}
                  </span>
                  <span className="text-xs text-zinc-400 font-dm">{msg.date}</span>
                </div>
                <p className="text-xs text-zinc-500 font-dm truncate">{msg.preview}</p>
                {'status' in msg && (
                  <span className="text-xs text-[#5BC4C0] font-dm">{(msg as typeof outboxMessages[0]).status}</span>
                )}
              </button>
            ))}
          </div>

          {/* Letter preview - stacked paper effect */}
          <div className="flex-1 flex items-center justify-center p-8">
            {letterContent ? (
              <div className="relative w-full max-w-xl">
                {/* Stack layers */}
                <div className="absolute top-3 left-3 w-full h-full bg-white border border-zinc-200 rounded shadow-sm" style={{ transform: 'rotate(2deg)' }} />
                <div className="absolute top-1.5 left-1.5 w-full h-full bg-white border border-zinc-200 rounded shadow-sm" style={{ transform: 'rotate(1deg)' }} />
                {/* Main letter */}
                <div className="relative bg-white border border-zinc-300 rounded shadow-md p-10 min-h-80"
                  style={{ background: 'repeating-linear-gradient(transparent, transparent 27px, #e5e7eb 27px, #e5e7eb 28px)' }}>
                  <p className="text-sm font-dm text-zinc-800 leading-relaxed">
                    {letterContent.preview}
                  </p>
                  <p className="text-sm font-dm text-zinc-700 leading-relaxed mt-4">
                    Lorem ipsum dolor sit amet consectetur. Condimentum semper aliquet auctor vitae. Diam tellus non feugiat odio tellus pharetra. Tortor diam ut modo tellus egestas turpis vitae.
                  </p>
                  <p className="text-xs text-zinc-400 font-dm absolute bottom-4 right-6">The More Formal Side 2024</p>
                </div>
              </div>
            ) : (
              /* Default stacked letters (no selection) */
              <div className="relative w-full max-w-xl h-80">
                {[4, 3, 2, 1, 0].map(i => (
                  <div
                    key={i}
                    className="absolute w-full bg-white border border-zinc-200 rounded shadow"
                    style={{
                      top: i * 6,
                      left: i * 4,
                      height: 260,
                      transform: `rotate(${(i - 2) * 1.5}deg)`,
                      background: 'repeating-linear-gradient(transparent, transparent 27px, #e5e7eb 27px, #e5e7eb 28px)',
                      zIndex: i,
                    }}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <p className="text-sm text-zinc-400 font-dm">Select a message to read</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
