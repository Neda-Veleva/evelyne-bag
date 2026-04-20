import { Plus, Trash2 } from 'lucide-react'
import { LuxuryButton } from './LuxuryCta'

type Props = {
  label: string
  hint?: string
  urls: string[]
  onChange: (urls: string[]) => void
  compact?: boolean
}

export default function ImageUrlListEditor({ label, hint, urls, onChange, compact }: Props) {
  function updateAt(index: number, value: string) {
    const next = [...urls]
    next[index] = value
    onChange(next)
  }

  function removeAt(index: number) {
    onChange(urls.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <div>
        <span className="block text-sm font-medium text-[#1a1523]">{label}</span>
        {hint ? <p className="mt-1 text-xs text-[#6b6575]">{hint}</p> : null}
      </div>
      <div className="space-y-3">
        {urls.map((url, i) => (
          <div
            key={`${i}-${url.slice(0, 24)}`}
            className="flex flex-col gap-3 rounded-2xl border border-[#e8e4dc] bg-white p-3 sm:flex-row sm:items-start"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#ebe6dc] sm:aspect-square sm:w-28 sm:shrink-0">
              {url.trim() ? (
                <img
                  src={url}
                  alt=""
                  className="size-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).style.opacity = '0.35'
                  }}
                />
              ) : (
                <div className="flex size-full items-center justify-center text-xs text-[#9a9288]">
                  Преглед
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <input
                type="url"
                value={url}
                onChange={(e) => updateAt(i, e.target.value)}
                placeholder="https://…"
                className="w-full rounded-xl border border-[#e0d9cc] bg-white px-3 py-2 text-sm text-[#1a1523] outline-none ring-[#c5a28c]/40 placeholder:text-[#a8a0b0] focus:ring-2"
              />
              <LuxuryButton
                type="button"
                variant="admin-mini-remove"
                onClick={() => removeAt(i)}
                className="inline-flex items-center gap-1.5"
              >
                <Trash2 size={14} />
                Премахни
              </LuxuryButton>
            </div>
          </div>
        ))}
      </div>
      <LuxuryButton
        type="button"
        variant="admin-dashed"
        onClick={() => onChange([...urls, ''])}
        className={`inline-flex items-center gap-2 ${compact ? 'w-full justify-center' : ''}`}
      >
        <Plus size={18} strokeWidth={1.75} />
        Добави URL на изображение
      </LuxuryButton>
    </div>
  )
}
