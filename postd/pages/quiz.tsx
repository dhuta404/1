import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const questions = [
  {
    question: 'Are you more energized by being alone or with others?',
    options: ['Alone', 'With others', 'Depends on my mood'],
  },
  {
    question: 'How do you like to spend your weekends?',
    options: ['Hang out with friends', 'Stay at home', 'Mix of both'],
  },
  {
    question: 'What kind of hobbies do you enjoy?',
    options: ['Creative arts', 'Sports/outdoors', 'Gaming'],
  },
  {
    question: 'Pet you are most likely to have',
    options: ['Dog', 'Cat', 'Other'],
  },
  {
    question: 'When making decisions you rely more on',
    options: ['Logic', 'Emotions', 'A mix of both'],
  },
  {
    question: 'What is your favorite vacation spot?',
    options: ['Beach', 'City', 'Nature/Mountains'],
  },
]

export default function QuizPage() {
  const router = useRouter()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))
  const [error, setError] = useState('')

  const q = questions[current]
  const selected = answers[current]

  const select = (i: number) => {
    const newAnswers = [...answers]
    newAnswers[current] = i
    setAnswers(newAnswers)
    setError('')
  }

  const next = () => {
    if (selected === null) { setError('Please select an option to continue.'); return }
    if (current < questions.length - 1) setCurrent(c => c + 1)
    else router.push('/bulletin')
  }

  const prev = () => {
    if (current > 0) setCurrent(c => c - 1)
    setError('')
  }

  return (
    <>
      <Head>
        <title>Postd – Find Your Pen Pal</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen flex flex-col bg-zinc-800">
        <Navbar showAuthLinks />

        <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
          {/* Header */}
          <div className="w-full max-w-2xl mb-8">
            <p className="text-sm text-zinc-400 font-dm mb-2">Find Your Pen Pal</p>
            <h1
              className="text-white font-playfair font-bold leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontFamily: "'Playfair Display', serif" }}
            >
              {q.question}
            </h1>
          </div>

          {/* Options */}
          <div className="w-full max-w-2xl flex flex-col gap-3 mb-8">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => select(i)}
                className={`w-full px-5 py-3 rounded-full border text-left text-sm font-dm transition
                  ${selected === i
                    ? 'bg-[#5BC4C0] border-[#5BC4C0] text-white'
                    : 'bg-transparent border-zinc-500 text-zinc-300 hover:border-[#5BC4C0] hover:text-white'
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Next button */}
          {error && <p className="text-red-400 text-xs mb-3 font-dm">{error}</p>}
          <div className="w-full max-w-2xl">
            <button
              onClick={next}
              className="px-8 py-2.5 bg-[#5BC4C0] hover:bg-[#3DA8A4] text-white rounded-full text-sm font-medium font-dm transition"
            >
              {current < questions.length - 1 ? 'Next Question' : 'Finish'}
            </button>
          </div>
        </div>

        {/* Bottom nav arrows */}
        <div className="flex justify-end gap-2 px-8 pb-6">
          <button
            onClick={prev}
            disabled={current === 0}
            className="w-10 h-10 flex items-center justify-center bg-zinc-700 hover:bg-zinc-600 disabled:opacity-30 rounded text-white transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button
            onClick={next}
            className="w-10 h-10 flex items-center justify-center bg-zinc-700 hover:bg-zinc-600 rounded text-white transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        <Footer />
      </div>
    </>
  )
}
