import { Link, type LinkProps } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

/** Обща линия като при „Открийте колекцията“ */
export function LuxuryCtaLine({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-px origin-center scale-x-0 bg-[#735c00] transition-transform duration-500 group-hover:scale-x-100 ${className}`}
    />
  )
}

/** Витрина: разширяване на междубуквие + долна линия при ховър */
const baseSite =
  'group relative inline-flex items-center justify-center gap-2 font-manrope transition-all duration-500 hover:tracking-[0.3em]'

/** Администрация: без „luxury“ tracking; само цвят/фон */
const baseAdmin =
  'relative inline-flex items-center justify-center gap-2 font-manrope transition-colors duration-200'

const variants = {
  /** Тъмен плътен — херо / основен CTA */
  primary: `${baseSite} bg-[#1c1b1b] px-10 py-5 text-sm uppercase tracking-[0.2em] text-[#e5e2e1]`,
  /** Светъл контур върху тъмен фон */
  'outline-light': `${baseSite} border border-[#faf9f4]/20 bg-transparent px-12 py-6 text-sm uppercase tracking-[0.2em] text-[#faf9f4] hover:bg-[#faf9f4] hover:text-[#1c1b1b]`,
  /** Тъмен контур върху светъл фон */
  'outline-dark': `${baseSite} border border-[#1b1c19] bg-transparent px-8 py-4 text-xs uppercase tracking-widest text-[#1b1c19] hover:bg-[#1b1c1b] hover:text-[#faf9f4]`,
  /** Вторичен контур */
  'outline-muted': `${baseSite} border border-[#d0c5af]/50 bg-transparent px-8 py-5 text-sm uppercase tracking-[0.12em] text-[#1b1c19] hover:border-[#735c00]`,
  /** Текстов линк */
  ghost: `${baseSite} border-0 bg-transparent px-0 py-1 text-xs uppercase tracking-widest text-[#735c00]`,
  /** Назад / тих текст с икона */
  'ghost-quiet': `${baseSite} border-0 bg-transparent px-0 py-1 text-xs normal-case tracking-widest text-[#4d4635] hover:text-[#735c00]`,
  /** Цветови опции на продукт */
  swatch: `${baseSite} border px-3 py-2 text-sm normal-case !tracking-normal hover:!tracking-normal`,
  /** Админ: основен */
  'admin-primary': `${baseAdmin} rounded-full border border-transparent bg-[#0d1e3b] px-4 py-2 text-sm font-medium normal-case tracking-normal text-[#f4f0e8] shadow-sm hover:bg-[#162a4d]`,
  /** Админ: вторичен бял */
  'admin-outline': `${baseAdmin} rounded-full border border-[#d4cfc4] bg-white px-4 py-2 text-sm font-medium normal-case tracking-normal text-[#0d1e3b] shadow-sm hover:bg-[#f4f0e8]`,
  'admin-outline-muted': `${baseAdmin} rounded-full border border-[#d4cfc4] px-4 py-2 text-sm font-medium normal-case tracking-normal text-[#3d3830] hover:bg-white`,
  'admin-danger': `${baseAdmin} rounded-full border border-[#e8d4d4] px-4 py-2 text-sm font-medium normal-case tracking-normal text-[#8b4545] hover:bg-[#fdf5f5]`,
  /** Сегмент Преглед / Редакция */
  'admin-segment': `${baseAdmin} rounded-full px-3 py-1.5 text-sm font-medium normal-case tracking-normal`,
  /** Начертан бутон */
  'admin-dashed': `${baseAdmin} rounded-xl border border-dashed border-[#c5b8a4] px-4 py-2.5 text-sm font-medium normal-case text-[#5c5348] hover:border-[#8b7355] hover:bg-white`,
  'admin-remove-row': `${baseAdmin} rounded-xl border border-[#e8d4d4] px-4 py-2.5 text-sm font-medium normal-case text-[#8b4545] hover:bg-[#fdf5f5] sm:self-end`,
  /** Текстов линк в карти (табло) */
  'admin-text-link': `${baseAdmin} border-0 bg-transparent px-0 py-0 text-sm font-medium normal-case tracking-normal text-[#0d1e3b] hover:opacity-80`,
  /** Редакция в таблица */
  'admin-table-link': `${baseAdmin} rounded-lg border border-transparent bg-transparent px-2 py-1 text-sm font-medium normal-case tracking-normal text-[#0d1e3b] hover:bg-[#f0ebe3]`,
  'admin-mini-remove': `${baseAdmin} rounded-lg px-2 py-1 text-xs font-medium normal-case text-[#8b5a5a] hover:bg-[#f5e8e8]`,
} as const

function showCtaUnderline(variant: keyof typeof variants) {
  return !variant.startsWith('admin-')
}

export type LuxuryVariant = keyof typeof variants

type Common = {
  variant?: LuxuryVariant
  className?: string
  children: ReactNode
}

export function LuxuryLink({ variant = 'primary', className = '', children, ...props }: Common & LinkProps) {
  return (
    <Link className={`${variants[variant]} ${className}`} {...props}>
      {children}
      {showCtaUnderline(variant) ? <LuxuryCtaLine /> : null}
    </Link>
  )
}

export function LuxuryAnchor({
  variant = 'primary',
  className = '',
  children,
  ...props
}: Common & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${variants[variant]} ${className}`} {...props}>
      {children}
      {showCtaUnderline(variant) ? <LuxuryCtaLine /> : null}
    </a>
  )
}

type BtnProps = Common & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>

export function LuxuryButton({ variant = 'primary', className = '', children, type = 'button', ...props }: BtnProps) {
  return (
    <button type={type} className={`${variants[variant]} ${className}`} {...props}>
      {children}
      {showCtaUnderline(variant) ? <LuxuryCtaLine /> : null}
    </button>
  )
}

/** Иконки в хедъра / UI: мащаб + цвят, без tracking на текста */
export const luxuryIconButtonClass =
  'rounded-full p-2 text-[#1b1c19] transition-all duration-500 hover:scale-110 hover:text-[#735c00]'

/** Иконки в тъмната админ странична лента */
export const luxuryIconButtonAdminClass =
  'rounded-lg p-2 text-[#e5ccb3] transition-all duration-500 hover:scale-110 hover:text-[#f0dcc8]'
