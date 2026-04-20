import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Plus, Save, Trash2 } from 'lucide-react'
import { nanoid } from 'nanoid'
import AdminShell from '../components/AdminShell'
import { LuxuryButton, LuxuryCtaLine, LuxuryLink } from '../components/LuxuryCta'
import { AdminCheckboxField, AdminField } from '../components/AdminField'
import ImageUrlListEditor from '../components/ImageUrlListEditor'
import { useAppDialog } from '../context/dialog-context'
import { useAppData } from '../hooks/useAppData'
import { createEmptyProduct } from '../lib/store'
import type { Product, ProductColor, ProductKind, ProductStatus, Visibility } from '../types'

type TabId = 'basics' | 'type' | 'images' | 'details' | 'colors' | 'story' | 'related' | 'visibility'

const tabs: { id: TabId; label: string }[] = [
  { id: 'basics', label: 'Основна информация' },
  { id: 'type', label: 'Тип продукт' },
  { id: 'images', label: 'Изображения' },
  { id: 'details', label: 'Детайли' },
  { id: 'colors', label: 'Цветове' },
  { id: 'story', label: 'Разказ' },
  { id: 'related', label: 'Свързани продукти' },
  { id: 'visibility', label: 'Видимост' },
]

function hexForPicker(hex: string | undefined): string {
  if (hex && /^#[0-9A-Fa-f]{6}$/.test(hex)) return hex
  return '#c4a574'
}

export default function ProductEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, upsertProduct, deleteProduct } = useAppData()
  const { confirm: appConfirm } = useAppDialog()
  const isNew = id === 'new'

  const initial = useMemo(() => {
    if (isNew) return createEmptyProduct()
    return data.products.find((p) => p.id === id) ?? null
  }, [isNew, id, data.products])

  const [form, setForm] = useState<Product | null>(() => (initial ? { ...initial } : null))
  const [tab, setTab] = useState<TabId>('basics')

  if (!form) {
    return (
      <AdminShell title="Продуктът не е намерен">
        <p className="text-[#6b6575]">Този продукт не съществува.</p>
        <LuxuryLink to="/admin/products" variant="admin-text-link" className="mt-4 !inline-flex !normal-case text-[#0d1e3b]">
          Към списъка с продукти
        </LuxuryLink>
      </AdminShell>
    )
  }

  function patch<K extends keyof Product>(key: K, value: Product[K]) {
    setForm((f) => (f ? { ...f, [key]: value } : f))
  }

  function updateColorAt(index: number, partial: Partial<ProductColor>) {
    setForm((f) => {
      if (!f) return f
      const colors = [...f.colors]
      const cur = colors[index]
      if (!cur) return f
      colors[index] = { ...cur, ...partial }
      return { ...f, colors }
    })
  }

  function addColor() {
    setForm((f) => {
      if (!f) return f
      return {
        ...f,
        colors: [...f.colors, { id: `col-${nanoid(8)}`, name: '', hex: '' }],
      }
    })
  }

  function removeColorAt(index: number) {
    setForm((f) => {
      if (!f) return f
      return { ...f, colors: f.colors.filter((_, i) => i !== index) }
    })
  }

  function toggleRelatedProductId(pid: string) {
    if (!form) return
    const cur = form.relatedProductIds
    if (cur.includes(pid)) {
      patch('relatedProductIds', cur.filter((id) => id !== pid))
    } else if (cur.length < 4) {
      patch('relatedProductIds', [...cur, pid])
    }
  }

  function handleSave() {
    if (!form) return
    upsertProduct(form)
    navigate('/admin/products')
  }

  async function handleDelete() {
    if (!form) return
    const ok = await appConfirm('Да се изтрие ли този продукт? Действието е необратимо.')
    if (!ok) return
    deleteProduct(form.id)
    navigate('/admin/products')
  }

  return (
    <AdminShell
      title={isNew ? 'Нов продукт' : 'Редакция на продукт'}
      actions={
        <>
          <LuxuryLink to="/admin/products" variant="admin-outline-muted" className="inline-flex">
            <ArrowLeft size={16} />
            Назад
          </LuxuryLink>
          {!isNew ? (
            <LuxuryButton type="button" variant="admin-danger" onClick={handleDelete} className="inline-flex">
              <Trash2 size={16} />
              Изтрий
            </LuxuryButton>
          ) : null}
          <LuxuryButton type="button" variant="admin-primary" onClick={handleSave} className="inline-flex">
            <Save size={16} />
            Запази
          </LuxuryButton>
        </>
      }
    >
      <div className="mb-6 flex flex-wrap gap-2 border-b border-[#e5dfd3] pb-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`group relative overflow-hidden rounded-t-lg px-4 py-2 text-sm font-medium transition-all duration-500 hover:tracking-wide ${
              tab === t.id
                ? 'bg-white text-[#0d1e3b] shadow-sm ring-1 ring-[#e5dfd3] ring-offset-2 ring-offset-[#f4f0e8]'
                : 'text-[#6b6575] hover:text-[#1a1523]'
            }`}
          >
            {t.label}
            <LuxuryCtaLine />
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-[#e5dfd3] bg-white p-6 shadow-sm md:p-8">
        {tab === 'basics' ? (
          <div className="space-y-6 max-w-xl">
            <AdminField label="Име на продукта" hint="Както да се вижда в бутика.">
              <input
                type="text"
                value={form.name}
                onChange={(e) => patch('name', e.target.value)}
                className="w-full rounded-xl border border-[#e0d9cc] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#c5a28c]/50"
              />
            </AdminField>
            <AdminField
              label="Кратко описание"
              hint="Едно-две емоционални изречения — покана, не техническа спецификация."
            >
              <textarea
                value={form.shortDescription}
                onChange={(e) => patch('shortDescription', e.target.value)}
                rows={4}
                className="w-full resize-y rounded-xl border border-[#e0d9cc] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#c5a28c]/50"
              />
            </AdminField>
            <AdminField label="Цена (EUR)">
              <input
                type="number"
                min={0}
                step={1}
                value={form.price || ''}
                onChange={(e) => patch('price', Number(e.target.value))}
                className="w-full max-w-xs rounded-xl border border-[#e0d9cc] px-3 py-2.5 text-sm tabular-nums outline-none focus:ring-2 focus:ring-[#c5a28c]/50"
              />
            </AdminField>
            <AdminField label="Статус на наличност">
              <select
                value={form.status}
                onChange={(e) => patch('status', e.target.value as ProductStatus)}
                className="w-full max-w-md rounded-xl border border-[#e0d9cc] bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#c5a28c]/50"
              >
                <option value="available">Наличен</option>
                <option value="sold_out">Изчерпан</option>
                <option value="made_to_order">По поръчка</option>
              </select>
            </AdminField>
          </div>
        ) : null}

        {tab === 'type' ? (
          <div className="max-w-md space-y-4">
            <AdminField label="Тип продукт" hint="Как това изделие стои спрямо колекцията.">
              <select
                value={form.productType}
                onChange={(e) => patch('productType', e.target.value as ProductKind)}
                className="w-full rounded-xl border border-[#e0d9cc] bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#c5a28c]/50"
              >
                <option value="one_of_a_kind">Единствен екземпляр</option>
                <option value="limited_edition">Лимитирана серия</option>
                <option value="custom">По мярка / персонален</option>
              </select>
            </AdminField>
          </div>
        ) : null}

        {tab === 'images' ? (
          <div className="space-y-10">
            <AdminField
              label="Главно изображение (hero)"
              hint="Водещият кадър — пълна ширина на страницата на продукта."
            >
              <div className="flex flex-col gap-4 lg:flex-row">
                <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl bg-[#ebe6dc] lg:aspect-video">
                  {form.mainImage.trim() ? (
                    <img
                      src={form.mainImage}
                      alt=""
                      className="size-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-sm text-[#9a9288]">
                      Поставете URL за преглед
                    </div>
                  )}
                </div>
                <input
                  type="url"
                  value={form.mainImage}
                  onChange={(e) => patch('mainImage', e.target.value)}
                  placeholder="https://…"
                  className="h-fit w-full flex-1 rounded-xl border border-[#e0d9cc] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#c5a28c]/50 lg:min-h-[120px]"
                />
              </div>
            </AdminField>

            <ImageUrlListEditor
              label="Галерия"
              hint="Допълнителни ракурси — ритъмът създава желание."
              urls={form.gallery}
              onChange={(urls) => patch('gallery', urls)}
            />

            <div className="border-t border-[#f0ebe3] pt-10">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#8a8278]">
                По избор
              </p>
              <div className="space-y-10">
                <ImageUrlListEditor
                  label="Детайлни снимки (крупен план)"
                  hint="Шевове, метал, текстура."
                  urls={form.detailImages}
                  onChange={(urls) => patch('detailImages', urls)}
                  compact
                />
                <ImageUrlListEditor
                  label="Върху модел"
                  urls={form.onModel}
                  onChange={(urls) => patch('onModel', urls)}
                  compact
                />
                <ImageUrlListEditor
                  label="Лайфстайл"
                  urls={form.lifestyle}
                  onChange={(urls) => patch('lifestyle', urls)}
                  compact
                />
              </div>
            </div>
          </div>
        ) : null}

        {tab === 'details' ? (
          <div className="max-w-xl space-y-6">
            <AdminField label="Материали" hint="Влакна, произход, финиш — честно и кратко.">
              <textarea
                value={form.materials}
                onChange={(e) => patch('materials', e.target.value)}
                rows={5}
                className="w-full rounded-xl border border-[#e0d9cc] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#c5a28c]/50"
              />
            </AdminField>
            <div className="grid gap-3 sm:grid-cols-1">
              <AdminCheckboxField
                label="Ръчна изработка"
                inputProps={{
                  checked: form.handmade,
                  onChange: (e) => patch('handmade', e.target.checked),
                }}
              />
              <AdminCheckboxField
                label="Лимитиран"
                inputProps={{
                  checked: form.limited,
                  onChange: (e) => patch('limited', e.target.checked),
                }}
              />
              <AdminCheckboxField
                label="Готов за подарък"
                hint="Включва опаковка, подходяща за подарък."
                inputProps={{
                  checked: form.giftReady,
                  onChange: (e) => patch('giftReady', e.target.checked),
                }}
              />
            </div>
          </div>
        ) : null}

        {tab === 'colors' ? (
          <div className="max-w-2xl space-y-6">
            <p className="text-sm text-[#5c5348]">
              Добавете отделни цветови варианти с име и по желание мостра (hex). При поръчка ще може да се
              избере конкретен цвят.
            </p>
            <div className="space-y-4">
              {form.colors.map((c, index) => (
                <div
                  key={c.id}
                  className="flex flex-col gap-4 rounded-2xl border border-[#e8e4dc] bg-[#fcfbf8] p-4 sm:flex-row sm:items-end"
                >
                  <div className="min-w-0 flex-1 space-y-3">
                    <AdminField label="Име на цвета">
                      <input
                        type="text"
                        value={c.name}
                        onChange={(e) => updateColorAt(index, { name: e.target.value })}
                        placeholder="Напр. Коняк"
                        className="w-full rounded-xl border border-[#e0d9cc] bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#c5a28c]/50"
                      />
                    </AdminField>
                    <div className="flex flex-wrap items-end gap-3">
                      <AdminField label="Мостра (hex)" hint="По избор — за визуална мостра в админа.">
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={hexForPicker(c.hex)}
                            onChange={(e) => updateColorAt(index, { hex: e.target.value })}
                            className="h-10 w-14 cursor-pointer rounded-lg border border-[#e0d9cc] bg-white p-0.5"
                            title="Избор на цвят"
                          />
                          <input
                            type="text"
                            value={c.hex ?? ''}
                            onChange={(e) => {
                              const v = e.target.value.trim()
                              updateColorAt(index, { hex: v || undefined })
                            }}
                            placeholder="#8B5A3C"
                            className="w-36 rounded-xl border border-[#e0d9cc] bg-white px-3 py-2 font-mono text-sm outline-none focus:ring-2 focus:ring-[#c5a28c]/50"
                          />
                        </div>
                      </AdminField>
                    </div>
                  </div>
                  <LuxuryButton
                    type="button"
                    variant="admin-remove-row"
                    onClick={() => removeColorAt(index)}
                    className="inline-flex shrink-0 justify-center"
                  >
                    <Trash2 size={16} />
                    Премахни
                  </LuxuryButton>
                </div>
              ))}
            </div>
            <LuxuryButton type="button" variant="admin-dashed" onClick={addColor} className="inline-flex">
              <Plus size={18} strokeWidth={1.75} />
              Добави цвят
            </LuxuryButton>
          </div>
        ) : null}

        {tab === 'story' ? (
          <div className="max-w-2xl space-y-10">
            <AdminField
              label="Разказ"
              hint="Кратък цитат в колоната до снимките — едно до три изречения за настроение или вдъхновение."
            >
              <textarea
                value={form.story}
                onChange={(e) => patch('story', e.target.value)}
                rows={5}
                className="w-full rounded-xl border border-[#e0d9cc] px-3 py-2.5 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-[#c5a28c]/50"
              />
            </AdminField>

            <AdminField
              label="История на създаването"
              hint="По избор — по-дълъг текст под галерията: ателието, процес, материали, настроение. Празно поле = блокът не се показва в магазина."
            >
              <textarea
                value={form.creationStory}
                onChange={(e) => patch('creationStory', e.target.value)}
                rows={10}
                className="w-full rounded-xl border border-[#e0d9cc] px-3 py-2.5 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-[#c5a28c]/50"
              />
            </AdminField>
          </div>
        ) : null}

        {tab === 'related' ? (
          <div className="max-w-2xl">
            <p className="text-sm text-[#6b6575]">
              До <strong className="font-medium text-[#1a1523]">4</strong> модела за секцията „Свързани модели“ в магазина (под историята на създаването). Изберете от останалите продукти в каталога.
            </p>
            <p className="mt-3 text-sm font-medium text-[#0d1e3b]">
              Избрани: {form.relatedProductIds.length} / 4
            </p>
            <ul className="mt-6 max-h-[min(28rem,70vh)] space-y-2 overflow-y-auto rounded-xl border border-[#e8e4dc] bg-[#faf8f4] p-3">
              {data.products
                .filter((p) => p.id !== form.id)
                .map((p) => {
                  const checked = form.relatedProductIds.includes(p.id)
                  const disabled = !checked && form.relatedProductIds.length >= 4
                  return (
                    <li key={p.id}>
                      <label
                        className={`flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 transition ${
                          disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-white'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={disabled}
                          onChange={() => toggleRelatedProductId(p.id)}
                          className="mt-1 size-4 shrink-0 border-[#d4cfc4] text-[#0d1e3b] focus:ring-[#c5a28c]"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium text-[#1a1523]">{p.name || 'Без име'}</span>
                          <span className="text-xs text-[#8a8278]">{p.id}</span>
                        </span>
                      </label>
                    </li>
                  )
                })}
            </ul>
          </div>
        ) : null}

        {tab === 'visibility' ? (
          <div className="max-w-md space-y-6">
            <AdminField label="Видимост">
              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#e8e4dc] px-4 py-3 transition hover:bg-[#faf8f4]">
                  <input
                    type="radio"
                    name="visibility"
                    checked={form.visibility === 'draft'}
                    onChange={() => patch('visibility', 'draft' as Visibility)}
                    className="size-4 border-[#d4cfc4] text-[#0d1e3b] focus:ring-[#c5a28c]"
                  />
                  <div>
                    <p className="text-sm font-medium text-[#1a1523]">Чернова</p>
                    <p className="text-xs text-[#6b6575]">Скрита от публичния каталог.</p>
                  </div>
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#e8e4dc] px-4 py-3 transition hover:bg-[#faf8f4]">
                  <input
                    type="radio"
                    name="visibility"
                    checked={form.visibility === 'published'}
                    onChange={() => patch('visibility', 'published' as Visibility)}
                    className="size-4 border-[#d4cfc4] text-[#0d1e3b] focus:ring-[#c5a28c]"
                  />
                  <div>
                    <p className="text-sm font-medium text-[#1a1523]">Публикуван</p>
                    <p className="text-xs text-[#6b6575]">Видим там, където сайтът показва продукти.</p>
                  </div>
                </label>
              </div>
            </AdminField>
            <p className="text-xs text-[#8a8278]">
              Последна промяна: {new Date(form.updatedAt).toLocaleString('bg-BG')}
            </p>
          </div>
        ) : null}
      </div>
    </AdminShell>
  )
}
