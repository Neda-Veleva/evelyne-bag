import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { LuxuryButton, LuxuryLink } from '../../components/LuxuryCta'
import SiteHeader from '../../components/storefront/SiteHeader'
import SiteFooter from '../../components/storefront/SiteFooter'
import { useAppData } from '../../hooks/useAppData'
import { formatMoneyEUR } from '../../lib/format'
import { demoProductPath, demoShopPath } from '../../lib/sitePaths'
import { storefrontImages } from '../../storefront/assets'
import type { Product } from '../../types'

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={demoProductPath(product.id)}
      className="group flex cursor-pointer flex-col"
    >
      <div className="mb-8 aspect-[3/4] overflow-hidden bg-[#efeee9]">
        {product.mainImage ? (
          <img
            src={product.mainImage}
            alt=""
            className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-manrope text-sm text-[#7f7663]">
            Няма снимка
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="font-noto text-xl text-[#1b1c19]">{product.name}</h4>
        {product.shortDescription ? (
          <p className="line-clamp-2 font-manrope text-sm leading-relaxed text-[#4d4635]">
            {product.shortDescription}
          </p>
        ) : null}
        <p className="font-manrope text-sm font-medium text-[#735c00]">{formatMoneyEUR(product.price)}</p>
      </div>
    </Link>
  )
}

export default function HomePage() {
  const { data } = useAppData()
  const featured = useMemo(
    () => data.products.filter((p) => p.visibility === 'published').slice(0, 3),
    [data.products]
  )

  return (
    <div className="min-h-screen bg-[#faf9f4] text-[#1b1c19]">
      <SiteHeader />

      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#1c1b1b]">
        <div className="absolute inset-0">
          <img
            src={storefrontImages.hero}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        {/* Лек овърлей: центърът остава по-ясен (чанта), краищата — винетка; текстът разчита и на сянка */}
        <div className="pointer-events-none absolute inset-0 bg-[#1a1815]/40" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,transparent_32%,rgba(12,11,10,0.33)_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/25"
          aria-hidden
        />
        <div className="relative z-10 flex max-w-3xl flex-col items-center px-6 text-center">
          <h1 className="mb-5 md:mb-6">
            <img
              src="/evelyne-logo.svg"
              alt="Evelyne"
              className="mx-auto h-auto max-h-[104px] w-auto max-w-[min(70vw,240px)] object-contain brightness-0 invert drop-shadow-[0_2px_20px_rgba(0,0,0,0.55)] sm:max-h-[118px] sm:max-w-[min(68vw,270px)] md:max-h-[132px] md:max-w-[min(62vw,300px)]"
            />
          </h1>
          <p className="mb-2 font-noto text-2xl italic tracking-wide text-[#faf9f4] [text-shadow:0_2px_16px_rgba(0,0,0,0.75),0_1px_3px_rgba(0,0,0,0.9)] md:text-4xl">
            Любов без граници
          </p>
          <p className="mb-12 font-manrope text-sm uppercase tracking-[0.4em] text-[#f5f4ef] [text-shadow:0_1px_10px_rgba(0,0,0,0.85)]">
            Ръчна изработка. Внимание към всеки детайл.
          </p>
          <LuxuryLink to={demoShopPath()} variant="primary">
            Открийте колекцията
          </LuxuryLink>
        </div>
      </section>

      <section className="bg-[#faf9f4] px-6 py-24 text-center md:px-12 md:py-32">
        <div className="mx-auto max-w-4xl border-y border-[#d0c5af]/20 py-14">
          <h2 className="font-noto text-3xl italic leading-relaxed text-[#1b1c19] md:text-5xl">
            Създадени с ръце. Носени с душа.
          </h2>
        </div>
      </section>

      <section className="overflow-hidden bg-[#faf9f4] pb-24 md:pb-32">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-12 md:px-12">
          <div className="group relative md:col-span-7">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={storefrontImages.craftLarge}
                alt=""
                className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 hidden bg-[#f5f4ef] p-10 lg:block">
              <span className="font-manrope text-xs uppercase tracking-[0.3em] text-[#7f7663]">
                01 / Изящна ръчна изработка
              </span>
              <h3 className="mt-2 font-noto text-2xl italic">Минерална текстура</h3>
            </div>
          </div>
          <div className="flex flex-col gap-10 md:col-span-5">
            <div className="aspect-square overflow-hidden bg-[#efeee9]">
              <img
                src={storefrontImages.craftSquare}
                alt=""
                className="h-full w-full object-cover transition-transform duration-[2s] hover:scale-105"
                loading="lazy"
              />
            </div>
            <p className="font-manrope font-light leading-loose tracking-wide text-[#4d4635]">
              Всяко мънисто е внимателно подбрано, за да отрази светлината по неповторим начин. Нашите чанти не са
              просто аксесоари — те са скулптури, изваяни от естествени камъни и копринени нишки.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f4ef] py-24 md:py-32">
        <div className="mx-auto max-w-screen-2xl px-6 md:px-12">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <h2 className="font-noto text-4xl tracking-tight text-[#1b1c19] md:text-5xl">Избрани творения</h2>
            <LuxuryLink to={demoShopPath()} variant="ghost" className="pb-0.5">
              Виж всички
            </LuxuryLink>
          </div>

          {featured.length === 0 ? (
            <p className="font-manrope text-[#4d4635]">
              Скоро тук ще има публикувани продукти. Заповядайте в{' '}
              <LuxuryLink to="/admin" variant="ghost" className="!inline-flex !normal-case">
                администрацията
              </LuxuryLink>{' '}
              да добавите и публикувате модели.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
              {featured.map((p, i) => (
                <div
                  key={p.id}
                  className={i === 1 ? 'md:mt-16' : ''}
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#faf9f4] py-24 md:py-32">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24 md:px-12">
          <div className="order-2 lg:order-1">
            <img
              src={storefrontImages.atelierHands}
              alt=""
              className="h-[480px] w-full object-cover md:h-[600px]"
              loading="lazy"
            />
          </div>
          <div className="order-1 flex flex-col items-start gap-8 lg:order-2">
            <span className="font-manrope text-xs uppercase tracking-[0.5em] text-[#735c00]">Ателие</span>
            <h2 className="font-noto text-4xl leading-tight md:text-5xl lg:text-6xl">
              Всяка чанта започва като идея и завършва като бижу.
            </h2>
            <p className="max-w-lg font-manrope leading-relaxed text-[#4d4635]">
              Процесът е бавен и медитативен. Всяка стъпка е прецизно планирана, а материалите се избират заради
              тяхната история и енергия.
            </p>
            <div className="my-6 h-px w-full bg-[#d0c5af]/30" />
            <div className="grid w-full grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
              <div>
                <span className="font-manrope text-[10px] uppercase tracking-widest text-[#7f7663]">01</span>
                <p className="mt-2 font-manrope text-sm font-medium">Качество</p>
                <p className="font-manrope text-xs text-[#4d4635]">100% ръчна изработка</p>
              </div>
              <div>
                <span className="font-manrope text-[10px] uppercase tracking-widest text-[#7f7663]">02</span>
                <p className="mt-2 font-manrope text-sm font-medium">Гаранция</p>
                <p className="font-manrope text-xs text-[#4d4635]">24 месеца</p>
              </div>
              <div>
                <span className="font-manrope text-[10px] uppercase tracking-widest text-[#7f7663]">03</span>
                <p className="mt-2 font-manrope text-sm font-medium">Материали</p>
                <p className="font-manrope text-xs text-[#4d4635]">Подбрани текстури и акценти</p>
              </div>
              <div>
                <span className="font-manrope text-[10px] uppercase tracking-widest text-[#7f7663]">04</span>
                <p className="mt-2 font-manrope text-sm font-medium">Пакет</p>
                <p className="font-manrope text-xs text-[#4d4635]">Луксозна подаръчна опаковка</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#faf9f4] pb-24 md:px-12">
        <div className="mx-auto grid h-auto max-w-screen-2xl grid-cols-1 gap-2 px-6 md:grid-cols-4 md:grid-rows-2 md:gap-4 md:h-[880px]">
          <div className="group relative min-h-[280px] overflow-hidden md:col-span-2 md:row-span-2 md:min-h-0">
            <img
              src={storefrontImages.bento1}
              alt=""
              className="h-full w-full object-cover transition-transform duration-[3s] group-hover:scale-105"
            />
          </div>
          <div className="group relative min-h-[200px] overflow-hidden md:col-span-2 md:min-h-0">
            <img
              src={storefrontImages.bento2}
              alt=""
              className="h-full w-full object-cover transition-transform duration-[3s] group-hover:scale-105"
            />
          </div>
          <div className="group relative min-h-[200px] overflow-hidden md:min-h-0">
            <img
              src={storefrontImages.bento3}
              alt=""
              className="h-full w-full object-cover transition-transform duration-[3s] group-hover:scale-105"
            />
          </div>
          <div className="flex min-h-[180px] items-center justify-center bg-[#e3e3de] p-8 text-center md:min-h-0">
            <div>
              <img
                src="/only_logo.svg"
                alt=""
                className="mx-auto mb-4 h-14 w-auto max-w-[88px] object-contain opacity-95"
              />
              <p className="font-noto text-lg italic">Благодарим ви за вашето доверие.</p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="partnerships"
        className="relative overflow-hidden bg-[#1c1b1b] py-28 text-[#faf9f4] md:py-40"
      >
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-30">
          <img src={storefrontImages.customBg} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative z-10 mx-auto max-w-screen-2xl px-6 md:px-12">
          <div className="max-w-2xl">
            <h2 className="mb-8 font-noto text-4xl leading-tight md:text-6xl lg:text-7xl">Създай своя чанта</h2>
            <p className="mb-10 font-manrope text-lg leading-relaxed text-[#f5f4ef]/70">
              Предлагаме възможност за изработка по индивидуален проект. Изберете камъните, цветовете и формите, които
              резонират с вашата личност.
            </p>
            <LuxuryLink to={demoShopPath()} variant="outline-light" className="inline-flex">
              Поръчай персонално
            </LuxuryLink>
          </div>
        </div>
      </section>

      <section id="newsletter" className="scroll-mt-24 bg-[#faf9f4] py-24 text-center md:py-32">
        <div className="mx-auto max-w-2xl px-6">
          <h3 className="mb-10 font-noto text-3xl text-[#1b1c19]">Присъедини се към света на Evelyne</h3>
          <form
            className="flex flex-col items-center gap-4 md:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Вашият имейл"
              className="w-full border-0 border-b border-[#7f7663]/30 bg-transparent py-4 font-manrope text-center outline-none transition-colors focus:border-[#735c00] md:text-left"
            />
            <LuxuryButton type="submit" variant="outline-dark" className="whitespace-nowrap">
              Запиши се
            </LuxuryButton>
          </form>
          <p className="mt-8 font-manrope text-[10px] uppercase tracking-widest text-[#7f7663]/60">
            Абонирайте се за нови колекции и ексклузивен достъп.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
