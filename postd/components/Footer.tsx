import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="flex items-center justify-between px-8 py-4 border-t border-[#D8D0C4] bg-[#F5F0E8] dark:bg-zinc-900 dark:border-zinc-700 text-xs text-zinc-400">
      <span>© 2026 Postd</span>
      <div className="flex items-center gap-6">
        <Link href="/account" className="hover:text-black dark:hover:text-white transition">Account</Link>
        <Link href="/bulletin" className="hover:text-black dark:hover:text-white transition">Bulletin Board</Link>
        <Link href="/drafter" className="hover:text-black dark:hover:text-white transition">Message Drafter</Link>
        <Link href="/messages" className="hover:text-black dark:hover:text-white transition">Messages</Link>
      </div>
      <span>Made by Lorem Ipsum</span>
    </footer>
  )
}
