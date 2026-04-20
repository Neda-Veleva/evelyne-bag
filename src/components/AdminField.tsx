import type { InputHTMLAttributes, ReactNode } from 'react'

type AdminFieldProps = {
  label: string
  hint?: string
  className?: string
  children: ReactNode
}

type AdminCheckboxFieldProps = {
  label: string
  hint?: string
  className?: string
  inputProps: InputHTMLAttributes<HTMLInputElement>
}

export function AdminField({ label, hint, className = '', children }: AdminFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <span className="block text-sm font-medium text-[#1a1523]">{label}</span>
      {children}
      {hint ? <span className="block text-xs leading-relaxed text-[#6b6575]">{hint}</span> : null}
    </div>
  )
}

export function AdminCheckboxField({
  label,
  hint,
  className = '',
  inputProps,
}: AdminCheckboxFieldProps) {
  return (
    <div
      className={`rounded-2xl border border-[#e8e4dc] bg-white/80 px-4 py-3 ${className}`}
    >
      <label className="inline-flex cursor-pointer items-center gap-3 text-sm font-medium text-[#1a1523]">
        <input
          type="checkbox"
          className="size-4 rounded border-[#d4cfc4] text-[#8b7355] focus:ring-[#c5a28c]"
          {...inputProps}
        />
        {label}
      </label>
      {hint ? <p className="mt-2 text-xs leading-relaxed text-[#6b6575]">{hint}</p> : null}
    </div>
  )
}
