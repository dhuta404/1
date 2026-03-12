import { useState, useRef } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const sidebarItems = [
  { icon: 'upload', label: 'Upload' },
  { icon: 'grid', label: 'Templates' },
  { icon: 'elements', label: 'Elements' },
  { icon: 'image', label: 'Background' },
  { icon: 'drafts', label: 'Drafts' },
]

export default function DrafterPage() {
  const [activeTab, setActiveTab] = useState('Templates')
  const [recipient, setRecipient] = useState('')
  const [body, setBody] = useState('Lorem ipsum dolor sit amet consectetur. Condimentum semper aliquet auctor vitae. Diam tellus non feugiat odio tellus pharetra.\nTortor diam ut modo tellus egestas turpis vitae. Ut porttitor aenean ultrices tristique eget. Amet aliquet.\nFusce du mattis semper lobortis ut. Mauris ac et egestas sagittis sed. Ultrices et leo as amet enim quis et.\nelementum varius porttitor donec eget leo. Ac non venenatis et dolor iaculis id egestas elit.')
  const [saved, setSaved] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) setUploadedFile(f.name)
  }

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }
  const handleSend = () => { alert('Message sent!') }

  const SidebarIcon = ({ name }: { name: string }) => {
    const icons: Record<string, JSX.Element> = {
      upload: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
      grid: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
      elements: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
      image: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
      drafts: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    }
    return icons[name] || null
  }

  return (
    <>
      <Head>
        <title>Postd – Message Drafter</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen flex flex-col bg-[#F5F0E8]">
        <Navbar activePage="drafter" />

        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="w-40 border-r border-[#D8D0C4] bg-[#F5F0E8] flex flex-col py-6 gap-1 px-3">
            {sidebarItems.map(item => (
              <button
                key={item.label}
                onClick={() => {
                  setActiveTab(item.label)
                  if (item.label === 'Upload') fileRef.current?.click()
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-dm text-left transition
                  ${activeTab === item.label ? 'bg-[#5BC4C0]/10 text-[#3DA8A4] font-medium' : 'text-zinc-500 hover:text-black'}`}
              >
                <span className="text-zinc-500"><SidebarIcon name={item.icon} /></span>
                {item.label}
              </button>
            ))}
            <input ref={fileRef} type="file" className="hidden" onChange={handleUpload} />
            {uploadedFile && (
              <div className="mt-2 px-3 py-2 bg-[#5BC4C0]/10 rounded-lg">
                <p className="text-xs text-[#3DA8A4] font-dm truncate">📎 {uploadedFile}</p>
              </div>
            )}
          </div>

          {/* Canvas + form area */}
          <div className="flex-1 flex flex-col items-center px-8 py-8 gap-4">
            {/* Letter canvas */}
            <div className="relative w-full max-w-2xl">
              <div
                className="w-full bg-white border-2 border-zinc-300 rounded-sm shadow-inner"
                style={{ height: 340, background: 'repeating-linear-gradient(transparent, transparent 27px, #e5e7eb 27px, #e5e7eb 28px)' }}
              >
                {/* Resize handles */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                  <button className="w-6 h-6 bg-zinc-200 hover:bg-zinc-300 rounded flex items-center justify-center text-xs transition">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
                  </button>
                  <button className="w-6 h-6 bg-zinc-200 hover:bg-zinc-300 rounded flex items-center justify-center text-xs transition">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Recipient */}
            <div className="w-full max-w-2xl">
              <input
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
                placeholder="Dear John Doe"
                className="w-full px-4 py-2.5 border border-[#D8D0C4] rounded-lg text-sm font-dm bg-white focus:border-[#5BC4C0] outline-none"
              />
            </div>

            {/* Body */}
            <div className="w-full max-w-2xl relative">
              <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                className="w-full px-4 py-3 border border-[#D8D0C4] rounded-lg text-sm font-dm bg-white focus:border-[#5BC4C0] outline-none resize-none leading-relaxed"
                rows={7}
              />
              <p className="absolute bottom-3 right-4 text-xs text-zinc-400 font-dm">The More Formal Side 2024</p>
            </div>

            {/* Actions */}
            <div className="w-full max-w-2xl flex items-center gap-3">
              <button onClick={handleSave} className="flex items-center gap-2 text-sm font-dm text-zinc-600 hover:text-black transition">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                {saved ? 'Saved ✓' : 'Save Message'}
              </button>
              <button className="px-5 py-2 bg-[#5BC4C0] hover:bg-[#3DA8A4] text-white rounded-lg text-sm font-dm transition flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                Preview
              </button>
              <button onClick={handleSend} className="px-5 py-2 bg-[#5BC4C0] hover:bg-[#3DA8A4] text-white rounded-lg text-sm font-dm transition flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                Send
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
