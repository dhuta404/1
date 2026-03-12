import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { useState, createContext, useContext } from 'react'

export const ThemeContext = createContext({ dark: false, toggle: () => {} })

export default function App({ Component, pageProps }: AppProps) {
  const [dark, setDark] = useState(false)
  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      <div className={dark ? 'dark' : ''}>
        <Component {...pageProps} />
      </div>
    </ThemeContext.Provider>
  )
}
