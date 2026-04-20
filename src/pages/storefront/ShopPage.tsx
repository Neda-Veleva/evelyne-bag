import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { LuxuryLink } from '../../components/LuxuryCta'
import SiteHeader from '../../components/storefront/SiteHeader'
import SiteFooter from '../../components/storefront/SiteFooter'
import { useAppData } from '../../hooks/useAppData'
import { formatMoneyEUR } from '../../lib/format'
import { DEMO_SITE, demoProductPath } from '../../lib/sitePaths'
import { storefrontImages } from '../../storefront/assets'
import type { Product } from '../../types'

const productCardShell =
  'group flex flex-col border border-[#d0c5af]/15 bg-[#faf9f4] transition-shadow duration-500 hover:shadow-[0_20px_40px_rgba(27,28,25,0.06)]'

function CustomModelCtaCard() {
  return (
    <Link to={`${DEMO_SITE}#partnerships`} className={productCardShell}>
      <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1917]">
        <img
          src={storefrontImages.customBg}
          alt=""
          className="h-full w-full object-cover opacity-95 transition-transform duration-[1.2s] group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c19]/75 via-[#1b1c19]/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <img
            src="/only_logo.svg"
            alt=""
            className="h-12 w-auto max-w-[min(28vw,100px)] object-contain brightness-0 invert opacity-95 md:h-14 md:max-w-[112px]"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 p-6 md:p-8">
        <h2 className="font-noto text-2xl text-[#1b1c19]">Създай свой модел</h2>
        <p className="line-clamp-3 font-manrope text-sm leading-relaxed text-[#4d4635]">
          Индивидуален силует, цветове и детайли по вашата визия — разговор в ателието и изработка по мярка.
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="font-manrope text-sm font-medium text-[#735c00]">Персонална поръчка</span>
          <span className="font-manrope text-[10px] uppercase tracking-wider text-[#7f7663]">по заявка</span>
        </div>
      </div>
    </Link>
  )
}

function ShopProductCard({ product }: { product: Product }) {
  return (
    <Link to={demoProductPath(product.id)} className={productCardShell}>
      <div className="aspect-[3/4] overflow-hidden bg-[#efeee9]">
        {product.mainImage ? (
          <img
            src={product.mainImage}
            alt=""
            className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-manrope text-sm text-[#7f7663]">
            Няма снимка
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 p-6 md:p-8">
        <h2 className="font-noto text-2xl text-[#1b1c19]">{product.name}</h2>
        <p className="line-clamp-2 font-manrope text-sm leading-relaxed text-[#4d4635]">
          {product.shortDescription || '—'}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className="font-manrope text-sm font-medium text-[#735c00]">{formatMoneyEUR(product.price)}</span>
          {product.colors.length > 0 ? (
            <span className="font-manrope text-[10px] uppercase tracking-wider text-[#7f7663]">
              {product.colors.length} цвята
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  )
}

export default function ShopPage() {
  const { data } = useAppData()
  const published = useMemo(
    () =>
      [...data.products].filter((p) => p.visibility === 'published').sort((a, b) => a.name.localeCompare(b.name, 'bg')),
    [data.products]
  )

  return (
    <div className="min-h-screen bg-[#faf9f4] text-[#1b1c19]">
      <SiteHeader />

      <main className="pt-32 md:pt-40">
        <div className="mx-auto max-w-screen-2xl px-6 pb-16 md:px-12 md:pb-24">
          <header className="mb-16 max-w-2xl border-b border-[#d0c5af]/20 pb-10">
            <p className="mb-3 font-manrope text-xs uppercase tracking-[0.35em] text-[#735c00]">Магазин</p>
            <h1 className="font-noto text-4xl tracking-tight md:text-5xl lg:text-6xl">Колекция</h1>
            <p className="mt-6 font-manrope leading-relaxed text-[#4d4635]">
              Всяка чанта е изработена на ръце в ателието. Разгледайте наличните модели и цветови варианти на
              страницата на продукта.
            </p>
          </header>

          {published.length === 0 ? (
            <div className="space-y-12">
              <p className="font-manrope text-[#4d4635]">
                Все още няма публикувани продукти. Влезте в{' '}
                <LuxuryLink to="/admin/products" variant="ghost" className="!inline-flex !normal-case">
                  администрацията
                </LuxuryLink>{' '}
                и задайте видимост „Публикуван“ на моделите, които искате да се виждат тук.
              </p>
              <div className="mx-auto max-w-md sm:max-w-none">
                <CustomModelCtaCard />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {published.map((p) => (
                <ShopProductCard key={p.id} product={p} />
              ))}
              <CustomModelCtaCard />
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
