import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Navbar from '../components/Navbar'

function isTCDEmail(email: string) {
  return /^[^\s@]+@tcd\.ie$/.test(email.trim().toLowerCase())
}

export default function LoginPage() {
  const router = useRouter()
  const [tab, setTab] = useState<'signup' | 'signin'>('signup')

  // Sign up state
  const [suName, setSuName] = useState('')
  const [suEmail, setSuEmail] = useState('')
  const [suPassword, setSuPassword] = useState('')
  const [suAgree, setSuAgree] = useState(false)
  const [showSuPw, setShowSuPw] = useState(false)

  // Sign in state
  const [siEmail, setSiEmail] = useState('')
  const [siPassword, setSiPassword] = useState('')
  const [showSiPw, setShowSiPw] = useState(false)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | '' } | null>(null)

  const showToast = (msg: string, type: 'success' | 'error' | '' = '') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const setErr = (key: string, msg: string) => setErrors(e => ({ ...e, [key]: msg }))
  const clearErr = (key: string) => setErrors(e => { const n = { ...e }; delete n[key]; return n })

  const handleSignup = () => {
    const newErrors: Record<string, string> = {}
    if (!suName.trim() || suName.trim().split(' ').length < 2)
      newErrors.suName = 'Please enter your full name (first + last).'
    if (!isTCDEmail(suEmail))
      newErrors.suEmail = 'Must be a valid @tcd.ie email address.'
    if (suPassword.length < 8)
      newErrors.suPassword = 'Password must be at least 8 characters.'
    if (!suAgree)
      newErrors.suAgree = 'You must agree to the terms.'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return
    showToast('Account created! Setting up your profile…', 'success')
    setTimeout(() => router.push('/quiz'), 1800)
  }

  const handleSignin = () => {
    const newErrors: Record<string, string> = {}
    if (!isTCDEmail(siEmail))
      newErrors.siEmail = 'Please enter your @tcd.ie email.'
    if (!siPassword)
      newErrors.siPassword = 'Please enter your password.'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return
    showToast('Signing you in…', 'success')
    setTimeout(() => router.push('/bulletin'), 1800)
  }

  return (
    <>
      <Head>
        <title>Postd – Find Your Pen Pal</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen flex flex-col bg-[#F5F0E8]">
        {/* NAV */}
        <Navbar showAuthLinks />

        {/* BODY */}
        <div className="flex flex-1">
          {/* LEFT */}
          <div className="flex-1 bg-white flex flex-col justify-center px-16 py-16">
            <p className="text-sm text-zinc-500 mb-4 font-dm">Lorem ipsum dolor sit amet</p>
            <h1
              className="font-playfair italic text-black leading-tight mb-6"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', fontFamily: "'Playfair Display', serif" }}
            >
              Lorem ipsum<br />dolor sit amet<br />consectetur.
            </h1>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-sm font-dm">
              Lorem ipsum dolor sit amet consectetur. Donec praesent consequat arcu id convallis dignissim a diam. Quam elementum eu.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex-1 bg-[#F5F0E8] flex flex-col justify-center px-16 py-16">
            <h2 className="text-2xl font-medium mb-1 font-dm">Sign up</h2>
            <p className="text-sm text-zinc-500 mb-6 font-dm">
              or create your account or{' '}
              <button onClick={() => setTab('signin')} className="text-[#5BC4C0] underline">sign in</button>
            </p>

            {tab === 'signup' ? (
              <div className="flex flex-col gap-4 max-w-sm">
                {/* Name */}
                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1 font-dm">Your Name</label>
                  <input
                    type="text"
                    placeholder="Placeholder"
                    value={suName}
                    onChange={e => { setSuName(e.target.value); clearErr('suName') }}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm font-dm bg-white focus:border-[#5BC4C0] transition ${errors.suName ? 'border-red-400' : 'border-[#D8D0C4]'}`}
                  />
                  {errors.suName && <p className="text-xs text-red-500 mt-1">{errors.suName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1 font-dm">Email</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5BC4C0]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
                    </span>
                    <input
                      type="email"
                      placeholder="Placeholder"
                      value={suEmail}
                      onChange={e => { setSuEmail(e.target.value); clearErr('suEmail') }}
                      className={`w-full pl-8 pr-3 py-2.5 border rounded-lg text-sm font-dm bg-white focus:border-[#5BC4C0] transition ${errors.suEmail ? 'border-red-400' : 'border-[#D8D0C4]'}`}
                    />
                  </div>
                  {errors.suEmail && <p className="text-xs text-red-500 mt-1">{errors.suEmail}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1 font-dm">Password</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </span>
                    <input
                      type={showSuPw ? 'text' : 'password'}
                      placeholder="Placeholder"
                      value={suPassword}
                      onChange={e => { setSuPassword(e.target.value); clearErr('suPassword') }}
                      className={`w-full pl-8 pr-10 py-2.5 border rounded-lg text-sm font-dm bg-white focus:border-[#5BC4C0] transition ${errors.suPassword ? 'border-red-400' : 'border-[#D8D0C4]'}`}
                    />
                    <button onClick={() => setShowSuPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {showSuPw ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                      </svg>
                    </button>
                  </div>
                  {errors.suPassword && <p className="text-xs text-red-500 mt-1">{errors.suPassword}</p>}
                </div>

                {/* Agree */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={suAgree}
                    onChange={e => { setSuAgree(e.target.checked); clearErr('suAgree') }}
                    className="mt-0.5 accent-[#5BC4C0] cursor-pointer"
                  />
                  <label htmlFor="agree" className="text-xs text-zinc-500 leading-relaxed font-dm cursor-pointer">
                    I agree to Postd&apos;s <span className="text-[#5BC4C0]">Conditions of Use</span> and <span className="text-[#5BC4C0]">Privacy Notice</span>
                  </label>
                </div>
                {errors.suAgree && <p className="text-xs text-red-500 -mt-2">{errors.suAgree}</p>}

                <button
                  onClick={handleSignup}
                  className="w-full py-3 bg-[#5BC4C0] hover:bg-[#3DA8A4] text-white rounded-lg text-sm font-medium font-dm transition"
                >
                  Create Account
                </button>
                <button className="w-full py-3 border border-[#D8D0C4] hover:border-[#5BC4C0] rounded-lg text-sm font-dm text-zinc-700 transition bg-white">
                  Login with Trinity Email
                </button>
              </div>
            ) : (
              /* SIGN IN */
              <div className="flex flex-col gap-4 max-w-sm">
                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1 font-dm">Email</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5BC4C0]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
                    </span>
                    <input
                      type="email"
                      placeholder="yourname@tcd.ie"
                      value={siEmail}
                      onChange={e => { setSiEmail(e.target.value); clearErr('siEmail') }}
                      className={`w-full pl-8 pr-3 py-2.5 border rounded-lg text-sm font-dm bg-white focus:border-[#5BC4C0] transition ${errors.siEmail ? 'border-red-400' : 'border-[#D8D0C4]'}`}
                    />
                  </div>
                  {errors.siEmail && <p className="text-xs text-red-500 mt-1">{errors.siEmail}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1 font-dm">Password</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </span>
                    <input
                      type={showSiPw ? 'text' : 'password'}
                      placeholder="Your password"
                      value={siPassword}
                      onChange={e => { setSiPassword(e.target.value); clearErr('siPassword') }}
                      className={`w-full pl-8 pr-10 py-2.5 border rounded-lg text-sm font-dm bg-white focus:border-[#5BC4C0] transition ${errors.siPassword ? 'border-red-400' : 'border-[#D8D0C4]'}`}
                    />
                    <button onClick={() => setShowSiPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                  </div>
                  {errors.siPassword && <p className="text-xs text-red-500 mt-1">{errors.siPassword}</p>}
                </div>
                <button
                  onClick={handleSignin}
                  className="w-full py-3 bg-[#5BC4C0] hover:bg-[#3DA8A4] text-white rounded-lg text-sm font-medium font-dm transition mt-2"
                >
                  Sign In
                </button>
                <button className="w-full py-3 border border-[#D8D0C4] hover:border-[#5BC4C0] rounded-lg text-sm font-dm text-zinc-700 transition bg-white">
                  Login with Trinity Email
                </button>
                <p className="text-center text-xs text-zinc-500 font-dm">
                  Don&apos;t have an account?{' '}
                  <button onClick={() => setTab('signup')} className="text-[#5BC4C0] font-medium underline">Sign up</button>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* TOAST */}
        {toast && (
          <div className={`fixed bottom-6 right-6 px-5 py-3 rounded-xl text-sm text-white font-dm shadow-lg z-50 transition-all ${toast.type === 'success' ? 'bg-[#3DA8A4]' : toast.type === 'error' ? 'bg-red-500' : 'bg-zinc-800'}`}>
            {toast.msg}
          </div>
        )}
      </div>
    </>
  )
}
