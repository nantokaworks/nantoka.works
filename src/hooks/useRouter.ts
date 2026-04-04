import { useCallback, useEffect, useState } from 'react'

export function useRouter() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback((to: string) => {
    window.history.pushState(null, '', to)
    setPathname(to)
    window.scrollTo(0, 0)
  }, [])

  return { pathname, navigate }
}
