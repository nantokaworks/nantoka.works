import { useEffect, useState } from 'react'

import { APP_LOCALE_STORAGE_KEY, APP_THEME_STORAGE_KEY } from '../constants'
import type { AppLocale } from '../constants'

export type AppLocalePreference = AppLocale | 'system'
export type AppTheme = 'light' | 'dark'
export type AppThemePreference = AppTheme | 'system'

function detectSystemLocale(): AppLocale {
  if (typeof window === 'undefined') return 'ja'
  return window.navigator.language.toLowerCase().startsWith('ja') ? 'ja' : 'en'
}

function detectSystemTheme(): AppTheme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [languagePreference, setLanguagePreference] = useState<AppLocalePreference>(() => {
    if (typeof window === 'undefined') return 'system'
    const stored = window.localStorage.getItem(APP_LOCALE_STORAGE_KEY)
    if (stored === 'system' || stored === 'ja' || stored === 'en') return stored
    return 'system'
  })

  const [themePreference, setThemePreference] = useState<AppThemePreference>(() => {
    if (typeof window === 'undefined') return 'system'
    const stored = window.localStorage.getItem(APP_THEME_STORAGE_KEY)
    if (stored === 'system' || stored === 'light' || stored === 'dark') return stored
    return 'system'
  })

  const [systemLanguage, setSystemLanguage] = useState<AppLocale>(detectSystemLocale)
  const [systemTheme, setSystemTheme] = useState<AppTheme>(detectSystemTheme)
  const activeLanguage = languagePreference === 'system' ? systemLanguage : languagePreference
  const activeTheme = themePreference === 'system' ? systemTheme : themePreference

  useEffect(() => {
    window.localStorage.setItem(APP_LOCALE_STORAGE_KEY, languagePreference)
  }, [languagePreference])

  useEffect(() => {
    window.localStorage.setItem(APP_THEME_STORAGE_KEY, themePreference)
    document.body.dataset.theme = activeTheme
    document.documentElement.dataset.theme = activeTheme
  }, [activeTheme, themePreference])

  useEffect(() => {
    const handleLanguageChange = () => setSystemLanguage(detectSystemLocale())
    window.addEventListener('languagechange', handleLanguageChange)
    return () => window.removeEventListener('languagechange', handleLanguageChange)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleThemeChange = () => setSystemTheme(mediaQuery.matches ? 'dark' : 'light')
    handleThemeChange()
    mediaQuery.addEventListener('change', handleThemeChange)
    return () => mediaQuery.removeEventListener('change', handleThemeChange)
  }, [])

  return {
    languagePreference,
    setLanguagePreference,
    themePreference,
    setThemePreference,
    activeLanguage,
    activeTheme,
  }
}
