import Link from 'next/link'
import { useContext } from 'react'
import { ThemeContext } from '../pages/_app'

interface NavbarProps {
  activePage?: 'bulletin' | 'drafter' | 'messages' | 'account'
  showAuthLinks?: boolean
}

export default function Navbar({ activePage, showAuthLinks = false }: NavbarProps) {
  const { dark, toggle } = useContext(ThemeContext)

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-[#D8D0C4] bg-[#F5F0E8] dark:bg-zinc-900 dark:border-zinc-700">
      <Link href="/" className="font-dm font-medium text-lg tracking-tight text-black dark:text-white">
        Postd
      </Link>

      <div className="flex items-center gap-8">
        {!showAuthLinks && (
          <>
            <Link
              href="/bulletin"
              className={`text-sm font-medium ${activePage === 'bulletin' ? 'underline font-semibold' : 'text-zinc-600 dark:text-zinc-400'} hover:text-black dark:hover:text-white transition`}
            >
              Bulletin Board
            </Link>
            <Link
              href="/drafter"
              className={`text-sm font-medium ${activePage === 'drafter' ? 'underline font-semibold' : 'text-zinc-600 dark:text-zinc-400'} hover:text-black dark:hover:text-white transition`}
            >
              Message Drafter
            </Link>
            <Link
              href="/messages"
              className={`text-sm font-medium ${activePage === 'messages' ? 'underline font-semibold' : 'text-zinc-600 dark:text-zinc-400'} hover:text-black dark:hover:text-white transition`}
            >
              Messages
            </Link>
            <Link href="/account">
              <div className="w-8 h-8 rounded-full border-2 border-zinc-400 flex items-center justify-center text-zinc-500 hover:border-black transition cursor-pointer dark:border-zinc-600 dark:text-zinc-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
              </div>
            </Link>
          </>
        )}

        {showAuthLinks && (
          <Link href="/" className="text-sm text-zinc-500 hover:text-black transition">Sign in</Link>
        )}

        {/* Light/Dark toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${dark ? 'bg-zinc-600' : 'bg-[#5BC4C0]'}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${dark ? 'left-5' : 'left-0.5'}`} />
          </button>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {dark ? 'Dark Mode' : 'Light Mode'}
          </span>
        </div>
      </div>
    </nav>
  )
}
