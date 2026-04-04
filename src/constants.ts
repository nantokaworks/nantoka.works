export type AppLocale = 'ja' | 'en'

export const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/ichi0g0y',
  },
  {
    label: 'Twitter',
    href: 'https://x.com/ichi0g0y',
  },
  {
    label: 'Twitch',
    href: 'https://www.twitch.tv/ichi0g0y',
  },
] as const

export const TYPE_START_DELAY_MS = 360
export const BASE_TYPE_SPEED_MS = 24
export const TYPE_SPEED_RANDOM_MS = 42
export const PUNCTUATION_PAUSE_MS = 130

export const APP_LOCALE_STORAGE_KEY = 'app-locale'
export const APP_THEME_STORAGE_KEY = 'app-theme'

export function getGreetingByHour(date: Date, locale: AppLocale) {
  const hour = date.getHours()

  if (locale === 'en') {
    if (hour >= 4 && hour < 11) return 'Good morning'
    if (hour >= 11 && hour < 18) return 'Hello'
    return 'Good evening'
  }

  if (hour >= 4 && hour < 11) return 'おはようございます'
  if (hour >= 11 && hour < 18) return 'こんにちは'
  return 'こんばんは'
}

export function createIntroMessage(locale: AppLocale) {
  const greeting = getGreetingByHour(new Date(), locale)

  if (locale === 'en') {
    return `${greeting},\n\nWelcome to NANTOKAWORKS.\n\nA casual programmer based in Japan. Building vibe-coded projects on GitHub, streaming work chats and games on Twitch.\n\nFeel free to say hi anytime.`
  }

  return `${greeting}、\n\nNANTOKAWORKS へようこそ。\n\n日本在住のライトプログラマー。GitHubではバイブコーディングを中心に制作し、Twitchでは作業雑談やゲーム配信を不定期で行っています。\n\n気になったら気軽に声をかけてください。`
}
