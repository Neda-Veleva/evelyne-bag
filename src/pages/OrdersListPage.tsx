import { Eye, Pencil, Plus } from 'lucide-react'
import AdminShell from '../components/AdminShell'
import { LuxuryAnchor, LuxuryLink } from '../components/LuxuryCta'
import { useAppData } from '../hooks/useAppData'
import { formatDateTime } from '../lib/format'
import { demoProductPath } from '../lib/sitePaths'
import type { OrderStatus, OrderType } from '../types'

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

export default function OrdersListPage() {
  const { data } = useAppData()
  const sorted = [...data.orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  function productName(id: string) {
    return data.products.find((p) => p.id === id)?.name ?? '— (продуктът е премахнат)'
  }

  return (
    <AdminShell
      title="Поръчки"
      actions={
        <LuxuryLink to="/admin/orders/new" variant="admin-primary" className="inline-flex">
          <Plus size={18} strokeWidth={2} />
          Добави поръчка
        </LuxuryLink>
      }
    >
      <div className="overflow-hidden rounded-2xl border border-[#e5dfd3] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#ebe6dc] bg-[#faf8f4] text-xs font-semibold uppercase tracking-wider text-[#6b6575]">
                <th className="px-4 py-3 font-medium">Номер</th>
                <th className="px-4 py-3 font-medium">Клиент</th>
                <th className="px-4 py-3 font-medium">Продукт</th>
                <th className="px-4 py-3 font-medium">Тип</th>
                <th className="px-4 py-3 font-medium">Статус</th>
                <th className="px-4 py-3 font-medium">Създадена</th>
                <th className="px-4 py-3 font-medium text-right">Превю</th>
                <th className="px-4 py-3 font-medium text-right">Редакция</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((o) => (
                <tr key={o.id} className="border-b border-[#f0ebe3] last:border-0 hover:bg-[#fcfbf8]">
                  <td className="px-4 py-3 font-mono text-xs font-medium text-[#1a1523]">{o.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-[#1a1523]">{o.customerName || '—'}</p>
                    <p className="text-xs text-[#8a8278]">{o.email}</p>
                  </td>
                  <td className="max-w-[220px] px-4 py-3 text-[#5c5348]">
                    <span className="line-clamp-2">{productName(o.productId)}</span>
                    {(() => {
                      const p = data.products.find((x) => x.id === o.productId)
                      const c =
                        o.productColorId && p
                          ? p.colors.find((x) => x.id === o.productColorId)
                          : undefined
                      if (!o.productColorId) return null
                      return (
                        <span className="mt-1 flex items-center gap-1.5 text-xs text-[#6b6575]">
                          {c?.hex ? (
                            <span
                              className="inline-block size-3 shrink-0 rounded border border-[#e0d9cc]"
                              style={{ backgroundColor: c.hex }}
                              aria-hidden
                            />
                          ) : null}
                          <span>{c?.name ?? '—'}</span>
                        </span>
                      )
                    })()}
                  </td>
                  <td className="px-4 py-3 text-[#5c5348]">{orderTypeLabel[o.orderType]}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle[o.status]}`}
                    >
                      {statusLabel[o.status]}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-[#5c5348]">
                    {formatDateTime(o.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {data.products.some((p) => p.id === o.productId) ? (
                      <LuxuryAnchor
                        href={`${demoProductPath(o.productId)}?preview=1${
                          o.productColorId ? `&color=${encodeURIComponent(o.productColorId)}` : ''
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="admin-table-link"
                        className="inline-flex items-center gap-1 justify-end"
                        title="Преглед на продукта в магазина (нов раздел)"
                      >
                        <Eye size={16} />
                        Превю
                      </LuxuryAnchor>
                    ) : (
                      <span
                        className="inline-flex justify-end font-manrope text-xs text-[#b0a89c]"
                        title="Продуктът е премахнат или липсва"
                      >
                        —
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <LuxuryLink
                      to={`/admin/orders/${encodeURIComponent(o.id)}`}
                      variant="admin-table-link"
                      className="inline-flex items-center gap-1 justify-end"
                    >
                      <Pencil size={16} />
                      Редакция
                    </LuxuryLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sorted.length === 0 ? (
          <p className="p-8 text-center text-[#6b6575]">Все още няма записани поръчки.</p>
        ) : null}
      </div>
    </AdminShell>
  )
}
