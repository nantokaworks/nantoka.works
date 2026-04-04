import { GlobeIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useMemo } from 'react'

import { createIntroMessage, links } from './constants'
import { useRouter } from './hooks/useRouter'
import { useTheme } from './hooks/useTheme'
import type { AppLocalePreference, AppThemePreference } from './hooks/useTheme'
import { useTypewriter } from './hooks/useTypewriter'
import { Privacy } from './pages/Privacy'
import { Terms } from './pages/Terms'
import { Tokushoho } from './pages/Tokushoho'

const GITHUB_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="card-icon">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const TWITTER_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="card-icon">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const TWITCH_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="card-icon">
    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0 1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
  </svg>
)

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  GitHub: GITHUB_SVG,
  Twitter: TWITTER_SVG,
  Twitch: TWITCH_SVG,
}

function cycleLocale(current: AppLocalePreference): AppLocalePreference {
  if (current === 'system') return 'ja'
  if (current === 'ja') return 'en'
  return 'system'
}

function cycleTheme(current: AppThemePreference): AppThemePreference {
  if (current === 'system') return 'dark'
  if (current === 'dark') return 'light'
  return 'system'
}

function localeButtonLabel(pref: AppLocalePreference) {
  if (pref === 'ja') return 'JA'
  if (pref === 'en') return 'EN'
  return 'Auto'
}

const FOOTER_LINKS = [
  { label: '特定商取引法に基づく表記', href: '/tokushoho' },
  { label: 'プライバシーポリシー', href: '/privacy' },
  { label: '利用規約', href: '/terms' },
] as const

function App() {
  const { pathname, navigate } = useRouter()
  const {
    languagePreference,
    setLanguagePreference,
    themePreference,
    setThemePreference,
    activeLanguage,
    activeTheme,
  } = useTheme()

  const introChars = useMemo(() => Array.from(createIntroMessage(activeLanguage)), [activeLanguage])
  const typedChars = useTypewriter(introChars)
  const isTypingDone = typedChars.length >= introChars.length

  const topControls = (
    <div className="top-controls">
      <button
        className="top-control-icon-button"
        onClick={() => setLanguagePreference(cycleLocale(languagePreference))}
        aria-label="Language"
        title="Language"
      >
        <GlobeIcon />
        <span className="top-control-label">{localeButtonLabel(languagePreference)}</span>
      </button>
      <button
        className="top-control-icon-button"
        onClick={() => setThemePreference(cycleTheme(themePreference))}
        aria-label="Theme"
        title="Theme"
      >
        {activeTheme === 'dark' ? <MoonIcon /> : <SunIcon />}
      </button>
    </div>
  )

  if (pathname === '/tokushoho') {
    return <div className="page">{topControls}<Tokushoho onNavigate={navigate} /></div>
  }
  if (pathname === '/privacy') {
    return <div className="page">{topControls}<Privacy onNavigate={navigate} /></div>
  }
  if (pathname === '/terms') {
    return <div className="page">{topControls}<Terms onNavigate={navigate} /></div>
  }

  return (
    <div className="page">
      {topControls}

      <section className="title-area">
        <h1 className="name-main">NANTOKAWORKS</h1>
        <p className="intro-text">
          {typedChars.map((char, index) => (
            <span key={index} className="typed-char">
              {char === '\n' ? <br /> : char}
            </span>
          ))}
          <span className={`typing-caret${isTypingDone ? ' is-hidden' : ''}`}>|</span>
        </p>
      </section>

      <div className="cards">
        {links.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="card">
            {SOCIAL_ICONS[link.label]}
            <h2 className="card-title">{link.label}</h2>
          </a>
        ))}
      </div>

      <footer className="site-footer">
        <nav className="footer-links">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="footer-link"
              onClick={(e) => {
                e.preventDefault()
                navigate(link.href)
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="copyright">
          &copy; {new Date().getFullYear()} NANTOKAWORKS
        </p>
      </footer>
    </div>
  )
}

export default App
