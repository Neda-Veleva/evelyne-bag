import { Eye, Pencil, Plus } from 'lucide-react'
import AdminShell from '../components/AdminShell'
import { LuxuryAnchor, LuxuryLink } from '../components/LuxuryCta'
import { useAppData } from '../hooks/useAppData'
import { formatMoneyEUR } from '../lib/format'
import { demoProductPath } from '../lib/sitePaths'
import type { ProductKind, ProductStatus, Visibility } from '../types'

const statusLabel: Record<ProductStatus, string> = {
  available: 'Наличен',
  sold_out: 'Изчерпан',
  made_to_order: 'По поръчка',
}

const typeLabel: Record<ProductKind, string> = {
  one_of_a_kind: 'Единствен екземпляр',
  limited_edition: 'Лимитирана серия',
  custom: 'По мярка / персонален',
}

function visibilityBadge(v: Visibility) {
  if (v === 'published') {
    return (
      <span className="rounded-full bg-[#e8f2ea] px-2.5 py-0.5 text-xs font-medium text-[#2d5a3d]">
        Публикуван
      </span>
    )
  }
  return (
    <span className="rounded-full bg-[#f0ebe3] px-2.5 py-0.5 text-xs font-medium text-[#6b5c48]">
      Чернова
    </span>
  )
}

export default function ProductsListPage() {
  const { data } = useAppData()
  const sorted = [...data.products].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )

  return (
    <AdminShell
      title="Продукти"
      actions={
        <LuxuryLink to="/admin/products/new" variant="admin-primary" className="inline-flex">
          <Plus size={18} strokeWidth={2} />
          Добави продукт
        </LuxuryLink>
      }
    >
      <div className="overflow-hidden rounded-2xl border border-[#e5dfd3] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#ebe6dc] bg-[#faf8f4] text-xs font-semibold uppercase tracking-wider text-[#6b6575]">
                <th className="px-4 py-3 font-medium">Изображение</th>
                <th className="px-4 py-3 font-medium">Име</th>
                <th className="px-4 py-3 font-medium">Тип</th>
                <th className="px-4 py-3 font-medium">Цена</th>
                <th className="px-4 py-3 font-medium">Статус</th>
                <th className="px-4 py-3 font-medium">Видимост</th>
                <th className="px-4 py-3 font-medium text-right">Превю</th>
                <th className="px-4 py-3 font-medium text-right">Редакция</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p) => (
                <tr key={p.id} className="border-b border-[#f0ebe3] last:border-0 hover:bg-[#fcfbf8]">
                  <td className="px-4 py-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-[#ebe6dc]">
                      {p.mainImage ? (
                        <img src={p.mainImage} alt="" className="size-full object-cover" loading="lazy" />
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-[#1a1523]">{p.name || 'Без заглавие'}</p>
                    <p className="mt-0.5 line-clamp-1 max-w-xs text-xs text-[#8a8278]">
                      {p.shortDescription || '—'}
                    </p>
                    {p.colors.length > 0 ? (
                      <p className="mt-1 text-xs text-[#9a9288]">{p.colors.length} цвята</p>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-[#5c5348]">{typeLabel[p.productType]}</td>
                  <td className="px-4 py-3 font-medium tabular-nums text-[#1a1523]">
                    {formatMoneyEUR(p.price)}
                  </td>
                  <td className="px-4 py-3 text-[#5c5348]">{statusLabel[p.status]}</td>
                  <td className="px-4 py-3">{visibilityBadge(p.visibility)}</td>
                  <td className="px-4 py-3 text-right">
                    <LuxuryAnchor
                      href={`${demoProductPath(p.id)}?preview=1`}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="admin-table-link"
                      className="inline-flex items-center gap-1 justify-end"
                      title="Отваря страницата на продукта в магазина (нов раздел)"
                    >
                      <Eye size={16} />
                      Превю
                    </LuxuryAnchor>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <LuxuryLink
                      to={`/admin/products/${p.id}`}
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
          <p className="p-8 text-center text-[#6b6575]">Все още няма продукти. Добавете първото изделие.</p>
        ) : null}
      </div>
    </AdminShell>
  )
}
