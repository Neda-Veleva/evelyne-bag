import { ArrowRight, Package, ShoppingBag } from 'lucide-react'
import AdminShell from '../components/AdminShell'
import { LuxuryLink } from '../components/LuxuryCta'
import { useAppData } from '../hooks/useAppData'

export default function DashboardPage() {
  const { data } = useAppData()
  const published = data.products.filter((p) => p.visibility === 'published').length
  const drafts = data.products.filter((p) => p.visibility === 'draft').length
  const newOrders = data.orders.filter((o) => o.status === 'new').length
  const inProgress = data.orders.filter((o) => o.status === 'in_progress').length

  return (
    <AdminShell
      title="Табло"
      actions={
        <LuxuryLink to="/admin/products/new" variant="admin-primary" className="inline-flex">
          <img
            src="/evelyne-logo.svg"
            alt=""
            className="h-3.5 w-auto max-w-[56px] object-contain brightness-0 invert"
          />
          Нов продукт
        </LuxuryLink>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#e5dfd3] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#6b6575]">Продукти</span>
            <Package className="text-[#8b7355]" size={22} strokeWidth={1.5} />
          </div>
          <p className="mt-3 font-serif text-3xl text-[#1a1523]">{data.products.length}</p>
          <p className="mt-1 text-xs text-[#8a8278]">
            {published} публикувани · {drafts} чернови
          </p>
          <LuxuryLink to="/admin/products" variant="admin-text-link" className="mt-4 inline-flex items-center gap-1">
            Управление <ArrowRight size={14} />
          </LuxuryLink>
        </div>

        <div className="rounded-2xl border border-[#e5dfd3] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#6b6575]">Поръчки</span>
            <ShoppingBag className="text-[#8b7355]" size={22} strokeWidth={1.5} />
          </div>
          <p className="mt-3 font-serif text-3xl text-[#1a1523]">{data.orders.length}</p>
          <p className="mt-1 text-xs text-[#8a8278]">
            {newOrders} нови · {inProgress} в процес
          </p>
          <LuxuryLink to="/admin/orders" variant="admin-text-link" className="mt-4 inline-flex items-center gap-1">
            Виж поръчките <ArrowRight size={14} />
          </LuxuryLink>
        </div>
      </div>
    </AdminShell>
  )
}
