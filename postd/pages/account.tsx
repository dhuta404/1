import { useState } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const sidebarItems = [
  { icon: '⚙️', label: 'General' },
  { icon: '🔔', label: 'Notifications' },
  { icon: '🔒', label: 'Password' },
]

const activityNotes = [
  { id: 1, title: 'Lorem Ipsum', body: 'Lorem ipsum dolor sit amet consectetur...', color: '#5BC4C0', author: 'John Doe', date: 'Feb 8', liked: false, bookmarked: false },
  { id: 2, title: 'Lorem Ipsum', body: 'Lorem ipsum dolor sit amet consectetur...', color: '#F5A623', author: 'John Doe', date: 'Feb 8', liked: false, bookmarked: false },
  { id: 3, title: 'Lorem Ipsum', body: 'Lorem ipsum dolor sit amet consectetur...', color: '#F4A7B9', author: 'John Doe', date: 'Feb 8', liked: false, bookmarked: false },
  { id: 4, title: 'Lorem Ipsum', body: 'Lorem ipsum dolor sit amet consectetur...', color: '#F5A623', author: 'John Doe', date: 'Feb 8', liked: false, bookmarked: false },
  { id: 5, title: 'Lorem Ipsum', body: 'Lorem ipsum dolor sit amet consectetur...', color: '#5BC4C0', author: 'John Doe', date: 'Feb 8', liked: false, bookmarked: false },
  { id: 6, title: 'Lorem Ipsum', body: 'Lorem ipsum dolor sit amet consectetur...', color: '#F4A7B9', author: 'John Doe', date: 'Feb 8', liked: false, bookmarked: false },
]

export default function AccountPage() {
  const [active, setActive] = useState('General')
  const [view, setView] = useState<'my' | 'external'>('my')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [studentId, setStudentId] = useState('')
  const [bio, setBio] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <>
      <Head>
        <title>Postd – Account</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen flex flex-col bg-[#F5F0E8]">
        <Navbar activePage="account" />

        {/* View toggle */}
        <div className="px-8 pt-4 flex gap-4">
          <button onClick={() => setView('my')} className={`text-sm font-dm px-4 py-1.5 rounded-full transition ${view === 'my' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-black'}`}>My Account</button>
          <button onClick={() => setView('external')} className={`text-sm font-dm px-4 py-1.5 rounded-full transition ${view === 'external' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-black'}`}>Profile View</button>
        </div>

        {view === 'my' ? (
          /* MY ACCOUNT */
          <div className="flex flex-1 gap-0">
            {/* Sidebar */}
            <div className="w-48 border-r border-[#D8D0C4] px-4 py-8 flex flex-col gap-1">
              {sidebarItems.map(item => (
                <button
                  key={item.label}
                  onClick={() => setActive(item.label)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-dm text-left transition
                    ${active === item.label ? 'bg-[#5BC4C0]/10 text-[#3DA8A4] font-medium' : 'text-zinc-500 hover:text-black'}`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>

            {/* Main */}
            <div className="flex-1 px-12 py-8">
              <h1 className="text-2xl font-semibold font-dm mb-1">My Account</h1>
              <p className="text-xs text-zinc-400 font-dm mb-6">My Account &gt; {active}</p>
              <div className="border-b border-[#D8D0C4] mb-8" />

              {/* Avatar upload */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-[#D8D0C4] flex items-center justify-center cursor-pointer hover:bg-[#c8c0b4] transition relative overflow-hidden group">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  </div>
                </div>
                <span className="text-sm font-dm text-zinc-600">Jane Doe</span>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-lg">
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1 font-dm">First Name</label>
                  <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Placeholder" className="w-full px-3 py-2.5 border border-[#D8D0C4] rounded-lg text-sm font-dm bg-white focus:border-[#5BC4C0] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1 font-dm">Last Name</label>
                  <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Placeholder" className="w-full px-3 py-2.5 border border-[#D8D0C4] rounded-lg text-sm font-dm bg-white focus:border-[#5BC4C0] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1 font-dm">Email</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Placeholder" className="w-full px-3 py-2.5 border border-[#D8D0C4] rounded-lg text-sm font-dm bg-white focus:border-[#5BC4C0] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1 font-dm">TCD Student ID</label>
                  <input value={studentId} onChange={e => setStudentId(e.target.value)} placeholder="Placeholder" className="w-full px-3 py-2.5 border border-[#D8D0C4] rounded-lg text-sm font-dm bg-white focus:border-[#5BC4C0] outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-zinc-500 mb-1 font-dm">Lorem Ipsum</label>
                  <input value={bio} onChange={e => setBio(e.target.value)} placeholder="Placeholder" className="w-full px-3 py-2.5 border border-[#D8D0C4] rounded-lg text-sm font-dm bg-white focus:border-[#5BC4C0] outline-none" />
                </div>
              </div>

              <button onClick={handleSave} className="mt-6 px-6 py-2.5 bg-[#5BC4C0] hover:bg-[#3DA8A4] text-white rounded-lg text-sm font-dm transition">
                {saved ? 'Saved ✓' : 'Save Changes'}
              </button>
            </div>
          </div>
        ) : (
          /* EXTERNAL PROFILE VIEW */
          <div className="flex-1 px-8 py-8 max-w-2xl">
            <div className="w-16 h-16 rounded-full bg-[#C8956C] mb-4 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center text-white text-xl font-semibold">J</div>
            </div>
            <div className="flex items-center gap-3 mb-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            </div>
            <h2 className="text-xl font-semibold font-dm mb-0.5">Jane Doe</h2>
            <p className="text-xs text-zinc-400 font-dm mb-3">She/Her</p>
            <p className="text-sm text-zinc-600 font-dm leading-relaxed mb-1 max-w-xs">
              Lorem ipsum dolor sit amet consectetur. Tortor velicula elementum phareta ante, sed. Lorem ipsum dolor sit amet consectetur.
            </p>
            <p className="text-xs text-zinc-400 font-dm mb-8">src. August 5 at. It turpis massa id est.</p>

            <h3 className="text-base font-semibold font-dm mb-4">Activity</h3>
            <div className="border-b border-[#D8D0C4] mb-6" />

            <div className="grid grid-cols-3 gap-4">
              {activityNotes.map(note => (
                <div key={note.id} className="rounded-lg p-4 flex flex-col gap-2 relative" style={{ backgroundColor: note.color, minHeight: 160 }}>
                  <div className="flex items-center justify-between text-xs text-zinc-700 font-dm mb-1">
                    <div className="flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                      {note.author}
                    </div>
                    <span>{note.date}</span>
                    <button className="text-zinc-600 hover:text-zinc-900">✕</button>
                  </div>
                  <h4 className="font-semibold text-xs font-dm text-zinc-900">{note.title}</h4>
                  <p className="text-xs text-zinc-800 font-dm leading-relaxed flex-1">{note.body}</p>
                  <div className="flex gap-2 mt-auto">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  )
}
