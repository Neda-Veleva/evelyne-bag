import { useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { DEMO_SITE } from '../lib/sitePaths'
import { ExternalLink, LayoutDashboard, Menu, Package, ShoppingBag, X } from 'lucide-react'
import { LuxuryCtaLine, luxuryIconButtonAdminClass } from './LuxuryCta'

type Props = {
  children: ReactNode
  title?: string
  actions?: ReactNode
}

const nav = [
  { to: '/admin', label: 'Табло', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Продукти', icon: Package, end: false },
  { to: '/admin/orders', label: 'Поръчки', icon: ShoppingBag, end: false },
]

export default function AdminShell({ children, title, actions }: Props) {
  const location = useLocation()
  /** Desktop: wide drawer vs icon strip */
  const [desktopWide, setDesktopWide] = useState(true)
  /** Mobile overlay */
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (path: string, end?: boolean) => {
    if (end) return location.pathname === path
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  const showLabels = desktopWide || mobileOpen

  return (
    <div className="min-h-screen bg-[#f4f0e8]">
      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-[#0d1020]/40 backdrop-blur-[2px] md:hidden"
          aria-label="Затвори менюто"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed top-0 left-0 z-40 flex h-full flex-col bg-[#0d1e3b] text-white transition-all duration-300 ease-out md:transition-[width] ${
          mobileOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'
        } w-64 max-md:shadow-2xl md:translate-x-0 ${desktopWide ? 'md:w-64' : 'md:w-[4.5rem]'}`}
      >
        <div className="flex flex-shrink-0 items-center justify-between border-b border-[#203565] p-5">
          {showLabels ? (
            <div className="min-w-0">
              <img
                src="/evelyne-logo.svg"
                alt="Evelyne"
                className="h-8 w-auto max-w-[156px] object-contain object-left"
                style={{ filter: 'brightness(0) invert(92%) sepia(12%)' }}
              />
              <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#8fa3c4]">
                Администрация на ателието
              </p>
            </div>
          ) : (
            <>
              <img
                src="/evelyne-logo.svg"
                alt="Evelyne"
                className="h-5 w-auto max-w-[3rem] shrink-0 object-contain object-left"
                style={{ filter: 'brightness(0) invert(92%) sepia(12%)' }}
              />
              <span className="sr-only">Evelyne Bags</span>
            </>
          )}
          <button
            type="button"
            onClick={() => {
              if (window.matchMedia('(max-width: 767px)').matches) {
                setMobileOpen(false)
              } else {
                setDesktopWide((v) => !v)
              }
            }}
            className={`shrink-0 hover:bg-[#203565] ${luxuryIconButtonAdminClass}`}
            aria-label={
              mobileOpen
                ? 'Затвори менюто'
                : desktopWide
                  ? 'Свий страничната лента'
                  : 'Разгъни страничната лента'
            }
          >
            {mobileOpen || desktopWide ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <a
            href={DEMO_SITE}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="group relative mb-1 flex items-center gap-3 overflow-hidden rounded-lg px-4 py-3 text-sm font-medium text-[#e5ccb3] transition-all duration-500 hover:bg-[#203565] hover:tracking-wide"
            title={!showLabels ? 'Виж сайта' : undefined}
          >
            <ExternalLink size={20} strokeWidth={1.75} />
            {showLabels ? <span>Виж сайта</span> : null}
            <LuxuryCtaLine className="opacity-90" />
          </a>
          {nav.map((item) => {
            const Icon = item.icon
            const active = isActive(item.to, item.end)
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`group relative flex items-center gap-3 overflow-hidden rounded-lg px-4 py-3 text-sm font-medium transition-all duration-500 hover:tracking-wide ${
                  active
                    ? 'bg-[#c5a28c] text-[#0d1e3b]'
                    : 'text-[#e5ccb3] hover:bg-[#203565]'
                }`}
                title={!showLabels ? item.label : undefined}
              >
                <Icon size={20} strokeWidth={1.75} />
                {showLabels ? <span>{item.label}</span> : null}
                <LuxuryCtaLine className="opacity-90" />
              </Link>
            )
          })}
        </nav>
      </aside>

      <main
        className={`min-h-screen transition-all duration-300 md:transition-[margin] ${
          desktopWide ? 'md:ml-64' : 'md:ml-[4.5rem]'
        }`}
      >
        <header className="sticky top-0 z-20 border-b border-[#e5dfd3] bg-[#f4f0e8]/90 px-4 py-4 backdrop-blur-md md:px-10">
          <div className="flex w-full flex-col gap-3">
            <div className="flex flex-wrap items-start gap-3 sm:items-center sm:justify-between">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <button
                  type="button"
                  className="shrink-0 rounded-lg border border-[#e5dfd3] bg-white/80 p-2 text-[#1a1523] shadow-sm transition-all duration-500 hover:scale-110 hover:border-[#c5a28c]/50 md:hidden"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Отвори менюто"
                >
                  <Menu size={20} />
                </button>
                {title ? (
                  <h1 className="min-w-0 font-serif text-xl font-normal tracking-tight text-[#1a1523] sm:text-2xl">
                    {title}
                  </h1>
                ) : null}
              </div>
              {actions ? (
                <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
                  {actions}
                </div>
              ) : null}
            </div>
          </div>
        </header>
        <div className="w-full px-4 py-6 md:px-10 md:py-8">{children}</div>
      </main>
    </div>
  )
}
