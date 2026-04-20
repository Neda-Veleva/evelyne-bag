import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { LuxuryAnchor, LuxuryButton, LuxuryLink } from '../../components/LuxuryCta'
import SiteHeader from '../../components/storefront/SiteHeader'
import SiteFooter from '../../components/storefront/SiteFooter'
import { useAppData } from '../../hooks/useAppData'
import { formatMoneyEUR } from '../../lib/format'
import { demoProductPath, demoShopPath } from '../../lib/sitePaths'
import type { Product, ProductStatus } from '../../types'

const statusLabel: Record<ProductStatus, string> = {
  available: 'Налична за поръчка',
  sold_out: 'Изчерпана',
  made_to_order: 'По поръчка',
}

function hexForSwatch(hex: string | undefined): string {
  if (hex && /^#[0-9A-Fa-f]{6}$/.test(hex)) return hex
  return '#c4a574'
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const previewMode = searchParams.get('preview') === '1'
  const colorFromQuery = searchParams.get('color')
  const { data } = useAppData()

  const product = useMemo(() => {
    const found = data.products.find((p) => p.id === id)
    if (!found) return undefined
    if (previewMode || found.visibility === 'published') return found
    return undefined
  }, [data.products, id, previewMode])

  const [selectedColorId, setSelectedColorId] = useState<string | null>(null)

  useEffect(() => {
    if (!colorFromQuery || !product?.colors.length) return
    if (product.colors.some((c) => c.id === colorFromQuery)) {
      setSelectedColorId(colorFromQuery)
    }
  }, [colorFromQuery, product])

  const gallery = useMemo(() => {
    if (!product) return []
    const main = product.mainImage ? [product.mainImage] : []
    const rest = [...product.gallery, ...product.detailImages].filter(Boolean)
    const merged = [...main, ...rest]
    return Array.from(new Set(merged))
  }, [product])

  const selectedColor = useMemo(() => {
    if (!product?.colors.length) return null
    const sid = selectedColorId ?? product.colors[0]?.id
    return product.colors.find((c) => c.id === sid) ?? product.colors[0] ?? null
  }, [product, selectedColorId])

  const relatedProducts = useMemo((): Product[] => {
    if (!product) return []
    const out: Product[] = []
    for (const rid of product.relatedProductIds.slice(0, 4)) {
      const p = data.products.find((x) => x.id === rid)
      if (!p || p.id === product.id) continue
      const visible = p.visibility === 'published' || (previewMode && p.visibility === 'draft')
      if (visible) out.push(p)
    }
    return out.slice(0, 4)
  }, [product, data.products, previewMode])

  if (!id) {
    navigate(demoShopPath(), { replace: true })
    return null
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf9f4]">
        <SiteHeader />
        <main className="mx-auto max-w-screen-xl px-6 pt-36 pb-24 text-center md:pt-40">
          <h1 className="font-noto text-3xl text-[#1b1c19]">Продуктът не е намерен</h1>
          <p className="mt-4 font-manrope text-[#4d4635]">Моделът не съществува или не е публикуван.</p>
          <LuxuryLink to={demoShopPath()} variant="ghost" className="mt-8 inline-flex !normal-case">
            Към магазина
          </LuxuryLink>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const heroImage = gallery[0]
  const galleryRest = gallery.slice(1)

  return (
    <div className="min-h-screen bg-[#faf9f4] text-[#1b1c19]">
      <SiteHeader />

      {previewMode && product.visibility === 'draft' ? (
        <div className="border-b border-[#e8dcc4] bg-[#f5edd8] px-6 py-2.5 text-center font-manrope text-xs text-[#6b5420]">
          Преглед на чернова — в магазина този модел все още не се показва.
        </div>
      ) : null}

      <main className="pt-32 md:pt-40">
        <div className="mx-auto max-w-screen-2xl px-4 pb-14 sm:px-6 md:px-12 md:pb-16">
          <LuxuryButton
            type="button"
            variant="ghost-quiet"
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex md:mb-10"
          >
            <ArrowLeft size={16} />
            Назад
          </LuxuryButton>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <div className="min-w-0 space-y-2 sm:space-y-3 lg:col-span-7">
              {heroImage ? (
                <div className="w-full overflow-hidden bg-[#f2f1ed]">
                  <div className="aspect-[4/3] w-full sm:aspect-[3/2] lg:aspect-[4/3]">
                    <img src={heroImage} alt="" className="h-full w-full object-cover" />
                  </div>
                </div>
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center bg-[#efeee9] font-manrope text-[#7f7663]">
                  Няма снимка
                </div>
              )}

              {galleryRest.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {galleryRest.map((url, i) => {
                    const lastOdd =
                      galleryRest.length > 1 &&
                      galleryRest.length % 2 === 1 &&
                      i === galleryRest.length - 1
                    return (
                      <div
                        key={`${url}-${i}`}
                        className={`overflow-hidden bg-[#f2f1ed] ${galleryRest.length === 1 || lastOdd ? 'col-span-2' : ''}`}
                      >
                        <div
                          className={
                            galleryRest.length === 1 || lastOdd
                              ? 'aspect-[4/3] w-full'
                              : 'aspect-square w-full'
                          }
                        >
                          <img src={url} alt="" className="h-full w-full object-cover" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : null}
            </div>

            <div className="relative z-0 flex min-w-0 flex-col lg:sticky lg:top-28 lg:col-span-5 lg:self-start xl:top-32">
              <p className="font-manrope text-xs uppercase tracking-[0.35em] text-[#735c00]">Evelyne Atelier</p>
              <h1 className="mt-3 font-noto text-4xl leading-tight md:text-5xl">{product.name}</h1>
              <p className="mt-6 font-manrope text-2xl font-light text-[#1b1c19]">{formatMoneyEUR(product.price)}</p>
              <p className="mt-2 font-manrope text-sm text-[#4d4635]">{statusLabel[product.status]}</p>

              <div className="my-10 h-px w-full bg-[#d0c5af]/25" />

              <p className="font-manrope leading-[1.75] text-[#4d4635]">{product.shortDescription}</p>

              {product.colors.length > 0 ? (
                <div className="mt-10">
                  <p className="font-manrope text-xs uppercase tracking-[0.25em] text-[#7f7663]">Цвят</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {product.colors.map((c) => {
                      const active = selectedColor?.id === c.id
                      return (
                        <LuxuryButton
                          key={c.id}
                          type="button"
                          variant="swatch"
                          onClick={() => setSelectedColorId(c.id)}
                          className={`!flex !items-center !gap-2 ${
                            active
                              ? 'border-[#735c00] bg-[#f5f4ef] text-[#1b1c19]'
                              : 'border-[#d0c5af]/40 text-[#4d4635] hover:border-[#735c00]/50'
                          }`}
                        >
                          <span
                            className="size-5 shrink-0 rounded-full border border-[#d0c5af]/50"
                            style={{ backgroundColor: hexForSwatch(c.hex) }}
                            aria-hidden
                          />
                          {c.name || 'Цвят'}
                        </LuxuryButton>
                      )
                    })}
                  </div>
                </div>
              ) : null}

              {product.materials ? (
                <div className="mt-10">
                  <p className="font-manrope text-xs uppercase tracking-[0.25em] text-[#7f7663]">Материали</p>
                  <p className="mt-3 font-manrope leading-relaxed text-[#4d4635]">{product.materials}</p>
                </div>
              ) : null}

              {product.story ? (
                <div className="mt-10 border-l-2 border-[#735c00]/40 pl-6">
                  <p className="font-noto text-lg italic leading-relaxed text-[#1b1c19]">{product.story}</p>
                </div>
              ) : null}

              <div className="mt-12 flex flex-wrap gap-4">
                <LuxuryAnchor
                  href={`mailto:hello@example.com?subject=${encodeURIComponent(`Запитване: ${product.name}`)}`}
                  variant="primary"
                >
                  Запитване
                </LuxuryAnchor>
                <LuxuryLink to={demoShopPath()} variant="outline-muted">
                  Всички модели
                </LuxuryLink>
              </div>

              <div className="mt-14 flex flex-wrap gap-6 border-t border-[#d0c5af]/20 pt-10 font-manrope text-xs text-[#4d4635]">
                {product.handmade ? <span>Ръчна изработка</span> : null}
                {product.limited ? <span>Лимитирана серия</span> : null}
                {product.giftReady ? <span>Готова за подарък</span> : null}
              </div>
            </div>
          </div>
        </div>

        {product.creationStory.trim() ? (
          <section className="relative z-10 border-t border-[#d0c5af]/25 bg-[#f2f0ea]/90">
            <div className="mx-auto max-w-screen-lg px-4 py-14 sm:px-6 md:px-12 md:py-20">
              <p className="font-manrope text-xs uppercase tracking-[0.35em] text-[#735c00]">От ателието</p>
              <h2 className="mt-3 font-noto text-3xl tracking-tight text-[#1b1c19] md:text-[2.1rem] md:leading-snug">
                История на създаването
              </h2>
              <div className="mt-8 space-y-4 font-manrope text-base leading-[1.85] text-[#4d4635] whitespace-pre-wrap">
                {product.creationStory}
              </div>
            </div>
          </section>
        ) : null}

        {relatedProducts.length > 0 ? (
          <section className="relative z-10 border-t border-[#e8e4dc]/80 bg-[#faf9f4]">
            <div className="mx-auto max-w-screen-2xl px-4 py-14 sm:px-6 md:px-12 md:py-20">
              <p className="font-manrope text-xs uppercase tracking-[0.35em] text-[#735c00]">Колекция</p>
              <h2 className="mt-3 font-noto text-3xl text-[#1b1c19] md:text-4xl">Свързани модели</h2>
              <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((rp) => (
                  <Link
                    key={rp.id}
                    to={demoProductPath(rp.id)}
                    className="group relative z-10 flex flex-col overflow-hidden rounded-sm border border-[#d0c5af]/20 bg-[#faf9f4] transition-shadow duration-500 hover:shadow-[0_20px_40px_rgba(27,28,25,0.06)]"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-[#efeee9]">
                      {rp.mainImage ? (
                        <img
                          src={rp.mainImage}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-[1.1s] group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center font-manrope text-sm text-[#7f7663]">
                          Няма снимка
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 p-5 md:p-6">
                      <h3 className="font-noto text-xl text-[#1b1c19]">{rp.name}</h3>
                      <p className="font-manrope text-sm font-medium text-[#735c00]">{formatMoneyEUR(rp.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter />
    </div>
  )
}
