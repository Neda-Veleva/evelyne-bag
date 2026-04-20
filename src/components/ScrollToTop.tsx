import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** При навигация връща скрола в началото (SPA по подразбиране запазва позицията). */
export default function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, search])

  return null
}
