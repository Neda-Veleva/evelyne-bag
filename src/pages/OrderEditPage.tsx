import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Eye, Pencil, Save, Trash2 } from 'lucide-react'
import AdminShell from '../components/AdminShell'
import { LuxuryButton, LuxuryLink } from '../components/LuxuryCta'
import { AdminField } from '../components/AdminField'
import { useAppDialog } from '../context/dialog-context'
import { useAppData } from '../hooks/useAppData'
import { createEmptyOrder } from '../lib/store'
import { formatDateTime, formatMoneyEUR } from '../lib/format'
import type { AppData, Order, OrderStatus, OrderType } from '../types'

const statusStyle: Record<OrderStatus, string> = {
  new: 'bg-[#e8eef6] text-[#1e3a5f]',
  in_progress: 'bg-[#f5edd8] text-[#6b5420]',
  completed: 'bg-[#e8f2ea] text-[#2d5a3d]',
  cancelled: 'bg-[#f0e8e8] text-[#7a4545]',
}

const statusLabel: Record<OrderStatus, string> = {
  new: 'Нова',
  in_progress: 'В процес',
  completed: 'Завършена',
  cancelled: 'Отменена',
}

const orderTypeLabel: Record<OrderType, string> = {
  direct_purchase: 'Директна покупка',
  custom_order: 'Персонална поръчка',
}

type ViewMode = 'preview' | 'edit'

function OrderPreview({
  form,
  data,
  onEdit,
}: {
  form: Order
  data: AppData
  onEdit: () => void
}) {
  const product = data.products.find((p) => p.id === form.productId)
  const selectedColor =
    product && form.productColorId
      ? product.colors.find((c) => c.id === form.productColorId)
      : undefined

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e5dfd3] bg-[#faf8f4] shadow-sm">
      <div className="border-b border-[#ebe6dc] bg-white px-6 py-5 md:px-8 md:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a8278]">
              Номер на поръчката
            </p>
            <p className="mt-1 font-mono text-xl font-medium text-[#1a1523]">{form.id}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${statusStyle[form.status]}`}
            >
              {statusLabel[form.status]}
            </span>
            <LuxuryButton type="button" variant="admin-outline" onClick={onEdit} className="inline-flex">
              <Pencil size={16} />
              Редакция
            </LuxuryButton>
          </div>
        </div>
      </div>

      <div className="grid gap-px bg-[#ebe6dc] md:grid-cols-2">
        <section className="bg-white p-6 md:p-8">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#8a8278]">
            Клиент
          </h3>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-[#6b6575]">Име</dt>
              <dd className="mt-0.5 font-medium text-[#1a1523]">{form.customerName.trim() || '—'}</dd>
            </div>
            <div>
              <dt className="text-[#6b6575]">Имейл</dt>
              <dd className="mt-0.5">
                {form.email.trim() ? (
                  <a href={`mailto:${form.email}`} className="font-medium text-[#0d1e3b] underline">
                    {form.email}
                  </a>
                ) : (
                  '—'
                )}
              </dd>
            </div>
            <div>
              <dt className="text-[#6b6575]">Телефон</dt>
              <dd className="mt-0.5 font-medium text-[#1a1523]">
                {form.phone?.trim() ? (
                  <a href={`tel:${form.phone.replace(/\s/g, '')}`} className="text-[#0d1e3b] underline">
                    {form.phone}
                  </a>
                ) : (
                  '—'
                )}
              </dd>
            </div>
          </dl>
        </section>

        <section className="bg-white p-6 md:p-8">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#8a8278]">
            Продукт
          </h3>
          {product ? (
            <div className="flex gap-4">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-[#ebe6dc]">
                {product.mainImage ? (
                  <img
                    src={product.mainImage}
                    alt=""
                    className="size-full object-cover"
                    loading="lazy"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-[#1a1523]">{product.name || 'Без заглавие'}</p>
                <p className="mt-1 text-sm text-[#5c5348]">{formatMoneyEUR(product.price)}</p>
                {product.colors.length > 0 ? (
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-[#6b6575]">Цвят:</span>
                    {selectedColor ? (
                      <>
                        {selectedColor.hex ? (
                          <span
                            className="inline-block size-5 shrink-0 rounded border border-[#e0d9cc] shadow-inner"
                            style={{ backgroundColor: selectedColor.hex }}
                            title={selectedColor.name}
                          />
                        ) : null}
                        <span className="font-medium text-[#1a1523]">{selectedColor.name}</span>
                      </>
                    ) : (
                      <span className="text-[#8a8278]">не е избран</span>
                    )}
                  </div>
                ) : null}
                <LuxuryLink
                  to={`/admin/products/${product.id}`}
                  variant="admin-text-link"
                  className="mt-3 !inline-flex !normal-case text-sm font-medium text-[#0d1e3b]"
                >
                  Отвори продукта
                </LuxuryLink>
              </div>
            </div>
          ) : (
            <p className="text-sm text-[#8b5a5a]">Продуктът не е намерен или е премахнат.</p>
          )}
        </section>
      </div>

      <div className="border-t border-[#ebe6dc] bg-white px-6 py-5 md:px-8">
        <dl className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-[#6b6575]">Тип поръчка</dt>
            <dd className="mt-0.5 font-medium text-[#1a1523]">{orderTypeLabel[form.orderType]}</dd>
          </div>
          <div>
            <dt className="text-[#6b6575]">Създадена на</dt>
            <dd className="mt-0.5 font-medium text-[#1a1523]">{formatDateTime(form.createdAt)}</dd>
          </div>
        </dl>
      </div>

      {form.adminNotes.trim() ? (
        <div className="border-t border-[#ebe6dc] bg-[#fcfbf8] px-6 py-5 md:px-8">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8a8278]">
            Бележки за администратора
          </h3>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#3d3830]">{form.adminNotes}</p>
        </div>
      ) : null}
    </div>
  )
}

export default function OrderEditPage() {
  const rawId = useParams().id
  const id = rawId ? decodeURIComponent(rawId) : undefined
  const navigate = useNavigate()
  const { data, upsertOrder, deleteOrder } = useAppData()
  const { alert: appAlert, confirm: appConfirm } = useAppDialog()
  const isNew = id === 'new'

  const initial = useMemo(() => {
    if (isNew) {
      const firstPid = data.products[0]?.id ?? ''
      return createEmptyOrder(firstPid, data.orders)
    }
    return data.orders.find((o) => o.id === id) ?? null
  }, [isNew, id, data.orders, data.products])

  const [form, setForm] = useState<Order | null>(() => (initial ? { ...initial } : null))
  const [view, setView] = useState<ViewMode>(() => (isNew ? 'edit' : 'preview'))

  if (!form) {
    return (
      <AdminShell title="Поръчката не е намерена">
        <p className="text-[#6b6575]">Тази поръчка не съществува.</p>
        <LuxuryLink to="/admin/orders" variant="admin-text-link" className="mt-4 !inline-flex !normal-case text-[#0d1e3b]">
          Към списъка с поръчки
        </LuxuryLink>
      </AdminShell>
    )
  }

  function patch<K extends keyof Order>(key: K, value: Order[K]) {
    setForm((f) => (f ? { ...f, [key]: value } : f))
  }

  const selectedProduct = data.products.find((p) => p.id === form.productId)

  async function handleSave() {
    if (!form) return
    if (!data.products.some((p) => p.id === form.productId)) {
      await appAlert('Моля, изберете валиден продукт.')
      return
    }
    upsertOrder(form)
    navigate('/admin/orders')
  }

  async function handleDelete() {
    if (!form) return
    const ok = await appConfirm('Да се изтрие ли тази поръчка?')
    if (!ok) return
    deleteOrder(form.id)
    navigate('/admin/orders')
  }

  return (
    <AdminShell
      title={isNew ? 'Нова поръчка' : `Поръчка ${form.id}`}
      actions={
        <>
          <LuxuryLink to="/admin/orders" variant="admin-outline-muted" className="inline-flex">
            <ArrowLeft size={16} />
            Назад
          </LuxuryLink>
          <div className="flex rounded-full border border-[#e0d9cc] bg-[#f0ebe3] p-0.5">
            <LuxuryButton
              type="button"
              variant="admin-segment"
              onClick={() => setView('preview')}
              className={`inline-flex gap-1.5 ${
                view === 'preview'
                  ? 'bg-white text-[#0d1e3b] shadow-sm'
                  : 'text-[#5c5348] hover:text-[#1a1523]'
              }`}
            >
              <Eye size={16} />
              Преглед
            </LuxuryButton>
            <LuxuryButton
              type="button"
              variant="admin-segment"
              onClick={() => setView('edit')}
              className={`inline-flex gap-1.5 ${
                view === 'edit'
                  ? 'bg-white text-[#0d1e3b] shadow-sm'
                  : 'text-[#5c5348] hover:text-[#1a1523]'
              }`}
            >
              <Pencil size={16} />
              Редакция
            </LuxuryButton>
          </div>
          {view === 'edit' ? (
            <>
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
          ) : null}
        </>
      }
    >
      {view === 'preview' ? (
        <OrderPreview form={form} data={data} onEdit={() => setView('edit')} />
      ) : (
        <div className="space-y-8">
          <section className="rounded-2xl border border-[#e5dfd3] bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-lg font-medium text-[#1a1523]">Клиент</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {isNew ? (
                <AdminField label="Номер на поръчката" hint="Генерира се автоматично за нови поръчки.">
                  <input
                    type="text"
                    readOnly
                    value={form.id}
                    className="w-full cursor-not-allowed rounded-xl border border-[#e8e4dc] bg-[#faf8f4] px-3 py-2.5 font-mono text-sm text-[#5c5348]"
                  />
                </AdminField>
              ) : (
                <AdminField label="Номер на поръчката">
                  <input
                    type="text"
                    readOnly
                    value={form.id}
                    className="w-full cursor-default rounded-xl border border-[#e8e4dc] bg-[#faf8f4] px-3 py-2.5 font-mono text-sm text-[#1a1523]"
                  />
                </AdminField>
              )}
              <AdminField label="Име на клиента">
                <input
                  type="text"
                  value={form.customerName}
                  onChange={(e) => patch('customerName', e.target.value)}
                  className="w-full rounded-xl border border-[#e0d9cc] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#c5a28c]/50"
                />
              </AdminField>
              <AdminField label="Имейл">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => patch('email', e.target.value)}
                  className="w-full rounded-xl border border-[#e0d9cc] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#c5a28c]/50"
                />
              </AdminField>
              <AdminField label="Телефон" hint="По избор.">
                <input
                  type="tel"
                  value={form.phone ?? ''}
                  onChange={(e) => patch('phone', e.target.value || undefined)}
                  className="w-full rounded-xl border border-[#e0d9cc] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#c5a28c]/50"
                />
              </AdminField>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e5dfd3] bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-lg font-medium text-[#1a1523]">Продукт и поръчка</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <AdminField label="Продукт">
                <select
                  value={form.productId}
                  onChange={(e) => {
                    const pid = e.target.value
                    setForm((f) => (f ? { ...f, productId: pid, productColorId: undefined } : f))
                  }}
                  className="w-full rounded-xl border border-[#e0d9cc] bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#c5a28c]/50"
                >
                  {data.products.length === 0 ? (
                    <option value="">Няма продукти — първо добавете продукт</option>
                  ) : null}
                  {data.products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name || 'Без заглавие'}
                    </option>
                  ))}
                </select>
              </AdminField>
              {selectedProduct && selectedProduct.colors.length > 0 ? (
                <AdminField
                  label="Цвят"
                  hint="Вариант от страницата на продукта. Оставете празно, ако не е уточнено."
                >
                  <select
                    value={form.productColorId ?? ''}
                    onChange={(e) => patch('productColorId', e.target.value || undefined)}
                    className="w-full rounded-xl border border-[#e0d9cc] bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#c5a28c]/50"
                  >
                    <option value="">Без избор</option>
                    {selectedProduct.colors.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name || 'Без име'}
                      </option>
                    ))}
                  </select>
                </AdminField>
              ) : null}
              <AdminField label="Тип поръчка">
                <select
                  value={form.orderType}
                  onChange={(e) => patch('orderType', e.target.value as OrderType)}
                  className="w-full rounded-xl border border-[#e0d9cc] bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#c5a28c]/50"
                >
                  <option value="direct_purchase">Директна покупка</option>
                  <option value="custom_order">Персонална поръчка</option>
                </select>
              </AdminField>
              <AdminField label="Статус">
                <select
                  value={form.status}
                  onChange={(e) => patch('status', e.target.value as OrderStatus)}
                  className="w-full rounded-xl border border-[#e0d9cc] bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#c5a28c]/50"
                >
                  <option value="new">Нова</option>
                  <option value="in_progress">В процес</option>
                  <option value="completed">Завършена</option>
                  <option value="cancelled">Отменена</option>
                </select>
              </AdminField>
              <AdminField label="Създадена на" hint="Задава се при първо запазване на поръчката.">
                <input
                  type="datetime-local"
                  value={toLocalInput(form.createdAt)}
                  onChange={(e) => patch('createdAt', fromLocalInput(e.target.value))}
                  className="w-full rounded-xl border border-[#e0d9cc] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#c5a28c]/50"
                />
                <p className="mt-1 text-xs text-[#8a8278]">{formatDateTime(form.createdAt)}</p>
              </AdminField>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e5dfd3] bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-lg font-medium text-[#1a1523]">Бележки за администратора</h2>
            <AdminField
              label="Бележки"
              hint="Само за вътрешна употреба — доставка, примерки, настроение."
            >
              <textarea
                value={form.adminNotes}
                onChange={(e) => patch('adminNotes', e.target.value)}
                rows={5}
                className="w-full rounded-xl border border-[#e0d9cc] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#c5a28c]/50"
              />
            </AdminField>
          </section>
        </div>
      )}
    </AdminShell>
  )
}

function toLocalInput(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function fromLocalInput(local: string): string {
  const d = new Date(local)
  if (Number.isNaN(d.getTime())) return new Date().toISOString()
  return d.toISOString()
}
