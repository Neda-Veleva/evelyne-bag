import { Link, NavLink } from 'react-router-dom'
import { DEMO_SITE } from '../../lib/sitePaths'
import { Search, ShoppingBag, User } from 'lucide-react'
import { LuxuryCtaLine, luxuryIconButtonClass } from '../LuxuryCta'

const linkClass =
  'group relative font-noto text-sm uppercase tracking-[0.2em] text-[#4d4635] opacity-80 transition-all duration-500 hover:tracking-[0.3em] hover:opacity-100 hover:text-[#1b1c19]'

const activeLink =
  'border-b border-[#735c00] pb-1 text-[#735c00] opacity-100 hover:text-[#735c00]'

export default function SiteHeader() {
  return (
    <header>
      <nav className="fixed top-0 z-50 w-full bg-[#faf9f4]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-6 px-6 py-6 md:px-12 md:py-8">
          <div className="flex items-center gap-8 md:gap-12">
            <Link to={DEMO_SITE} className="block shrink-0 py-0.5">
              <img
                src="/evelyne-logo.svg"
                alt="Evelyne"
                className="h-10 w-auto max-w-[min(78vw,280px)] object-contain object-left sm:h-11 md:h-12 lg:h-[3.25rem]"
              />
            </Link>
            <div className="hidden items-center gap-8 md:flex">
              <NavLink
                to={`${DEMO_SITE}/products`}
                className={({ isActive }) => `${linkClass} ${isActive ? activeLink : ''}`}
              >
                Магазин
                <LuxuryCtaLine />
              </NavLink>
              <a className={linkClass} href={`${DEMO_SITE}#newsletter`}>
                Контакти
                <LuxuryCtaLine />
              </a>
            </div>
          </div>
          <div className="flex items-center gap-5 text-[#1b1c19]">
            <button type="button" className={`${luxuryIconButtonClass} opacity-90`} aria-label="Търсене">
              <Search size={22} strokeWidth={1.25} />
            </button>
            <button type="button" className={`${luxuryIconButtonClass} opacity-90`} aria-label="Количка">
              <ShoppingBag size={22} strokeWidth={1.25} />
            </button>
            <button type="button" className={`${luxuryIconButtonClass} opacity-90`} aria-label="Профил">
              <User size={22} strokeWidth={1.25} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
