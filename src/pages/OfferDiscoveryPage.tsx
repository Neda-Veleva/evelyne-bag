import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  Award,
  BookOpen,
  Calendar,
  Gem,
  CheckCircle,
  CheckCircle2,
  Clock,
  Headphones,
  Layout,
  LayoutDashboard,
  Mail,
  RefreshCw,
  SlidersHorizontal,
  Star,
  Tag,
  TrendingUp,
  Wallet,
  Wand,
  Workflow,
} from 'lucide-react'
import { DEMO_SITE } from '../lib/sitePaths'

type OfferCard = {
  icon: ReactNode
  title: string
  color: string
  items: ReactNode[]
  goal?: string
  subtitle?: ReactNode
  detail?: ReactNode
}

const featureCards: OfferCard[] = [
  {
    icon: <Gem className="h-6 w-6" />,
    title: 'Концепция и подход',
    color: 'from-slate-700 to-slate-900',
    subtitle: 'Този проект не е стандартен онлайн магазин.',
    items: [
      'Това е създаване на дигитално пространство, което представя Evelyne Bags като бранд с характер, детайл и усещане за стойност.',
      'Фокусът не е върху масови продажби, а върху изживяване, в което всяка чанта се възприема като бижу.',
    ],
    goal: 'позициониране на бранда като премиум изживяване с емоция и стойност.',
  },
  {
    icon: <Layout className="h-6 w-6" />,
    title: 'Уебсайт и бранд представяне',
    color: 'from-blue-500 to-cyan-500',
    subtitle:
      'Сайтът ще бъде изграден като луксозна бранд галерия, вдъхновена от усещането за бижу, а не стандартен онлайн магазин.',
    items: [
      <>
        Демо версия на сайт:{' '}
        <Link to={DEMO_SITE} className="text-teal-700 underline underline-offset-2">
          evelyne bags demo
        </Link>
      </>,
      'Начална страница с „Product as Jewel“ структура',
      'Визуално воден каталог с ясна, но ненатрапчива навигация',
      'Продуктови страници с фокус върху детайл, изработка и усещане',
      'Категории за лесно ориентиране',
      'Двуезичност (български и английски) с възможност за разширение',
      'Секции за история на бранда, съдържание и вдъхновение',
      'FAQ секция',
    ],
    goal: 'изграждане на силно първо впечатление и ясно позициониране на бранда като премиум продукт.',
  },
  {
    icon: <SlidersHorizontal className="h-6 w-6" />,
    title: 'Продуктово изживяване и конфигурация',
    color: 'from-amber-500 to-orange-500',
    subtitle: 'Всеки продукт ще бъде представен като индивидуално бижу с възможност за персонализация.',
    items: [
      'Детайлна продуктова страница с визуализации',
      'Избор на опции и персонализация',
      'Гравиране с предварителен преглед',
      'Ясно комуникирани условия при персонализирани поръчки',
    ],
    goal: 'клиентът да усеща стойността и уникалността на всяка чанта още преди поръчката.',
  },
  {
    icon: <Wand className="h-6 w-6" />,
    title: 'Custom създаване на чанта',
    color: 'from-blue-500 to-indigo-500',
    subtitle: 'Възможност за създаване на изцяло персонализирана чанта.',
    items: [
      'Конфигурация на елементи (дръжки, камъни, мъниста и др.)',
      'Ограничаване на несъвместими комбинации',
      'Визуално изграждане в реално време',
      'Запазване и довършване на конфигурация',
    ],
    detail:
      'Функционалността е изградена така, че да може да бъде разширявана с допълнителни опции и нива на персонализация според развитието на бранда.',
    goal: 'контролирана свобода за клиента без риск от грешки.',
  },
  {
    icon: <Workflow className="h-6 w-6" />,
    title: 'Процес на поръчка и изработка',
    color: 'from-emerald-500 to-teal-500',
    subtitle: 'Създаване на ясен и премиум процес от избор до завършване.',
    items: [
      'Последователен flow: разглеждане → избор → заявка',
      'Ясно дефинирани етапи на изпълнение',
      'Проследимост на статуса на поръчката',
      'Възможност за приоритетна заявка',
    ],
    detail:
      'Процесът е структуриран така, че да бъде лесен за клиента и едновременно с това да позволява адаптация и оптимизация спрямо реалното поведение на потребителите.',
    goal: 'спокойствие и прозрачност за клиента през целия процес.',
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: 'Календар и записване',
    color: 'from-cyan-500 to-blue-500',
    items: [
      'Записване на час за консултация',
      'Определяне на начална дата за изработка',
      'Визуализиране на очакван срок',
    ],
    goal: 'планиране и усещане за индивидуално отношение.',
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: 'Имейл комуникация и автоматизация',
    color: 'from-cyan-500 to-teal-500',
    subtitle: 'Изграждане на система за автоматична и последователна комуникация с клиента през целия процес.',
    items: [
      'Потвърждение при заявка или поръчка',
      'Известия при промяна на статус',
      'Напомняния и последваща комуникация',
      'Newsletter с възможност за сегментиране',
      'Персонализирани съобщения според действията на клиента',
    ],
    detail:
      'Комуникацията е изградена така, че да подкрепя бранд усещането и може да бъде надграждана спрямо начина, по който клиентите взаимодействат със сайта.',
    goal: 'създаване на усещане за грижа, яснота и постоянна връзка с клиента без нужда от ръчна намеса.',
  },
  {
    icon: <Headphones className="h-6 w-6" />,
    title: 'Контакт и персонално обслужване',
    color: 'from-blue-500 to-cyan-500',
    subtitle: 'Интегрирано премиум обслужване, вдъхновено от high-end брандове като Cartier.',
    items: [
      'Централизирана контактна зона',
      'Връзка чрез различни канали (чат, телефон, имейл)',
      'Проследяване на поръчка',
      'FAQ и обратна връзка',
      'Възможност за записване на среща',
    ],
    detail: 'Възможност за допълнителна персонализация на комуникацията и обслужването спрямо нуждите на клиента.',
    goal: 'бърз достъп до помощ и усещане за личен асистент.',
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Journal и съдържание',
    color: 'from-indigo-500 to-blue-500',
    subtitle: 'Секция за съдържание, която допълва бранда и създава по-дълбока връзка с клиента.',
    items: [
      'Публикации, свързани с вдъхновение, изработка и процес',
      'Представяне на нови модели и колекции',
      'Истории зад продуктите',
      'Визуално ориентирани статии с фокус върху детайла',
      'Свързване на съдържанието с конкретни продукти',
    ],
    detail:
      'Секцията позволява развитие в различни формати и посоки спрямо бранда и може да се използва като активен канал за комуникация и вдъхновение.',
    goal: 'изграждане на емоционална връзка, доверие и по-силно бранд присъствие.',
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: 'Ревюта, подаръци и лоялност',
    color: 'from-violet-500 to-fuchsia-500',
    items: [
      'Система за клиентски ревюта',
      '„Направи подарък“ функционалност',
      'Потребителски профил',
      'Лоялни клиенти и препоръки',
    ],
    detail:
      'Функционалностите могат да бъдат развивани допълнително с цел изграждане на по-дългосрочна връзка с клиентите.',
    goal: 'доверие, повторяемост и по-силна връзка с клиента.',
  },
  {
    icon: <LayoutDashboard className="h-6 w-6" />,
    title: 'Административен контрол',
    color: 'from-slate-600 to-slate-800',
    subtitle: 'Централизирана администрация с лесно управление.',
    items: [
      <>
        Демо администрация:{' '}
        <Link to="/admin" className="text-teal-700 underline underline-offset-2">
          admin panel
        </Link>
      </>,
      'Управление на продукти и категории',
      'Управление на поръчки и статуси',
      'Контрол върху съдържание (статии, FAQ, ключови секции)',
      'Управление на ревюта и клиентски запитвания',
      'Newsletter и база с контакти',
      'Автоматично поддържане на „Top“ продукти',
      'Без нужда от технически знания за ежедневна работа.',
    ],
    detail:
      'Административният панел е създаден така, че да може да бъде разширяван с нови функционалности при растеж на бизнеса.',
    goal: 'пълен контрол без необходимост от технически знания.',
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Логика за популярни продукти',
    color: 'from-teal-500 to-emerald-500',
    items: [
      'Top гледани (на база реално поведение)',
      'Top продавани (на база реални поръчки)',
      'Автоматично обновяване',
    ],
    detail:
      'Логиката може да бъде надграждана с допълнителни критерии и поведенчески модели с цел подобряване на представянето и конверсиите.',
    goal: 'по-добра ориентация и стимулиране на интереса.',
  },
]

const commercialCards: OfferCard[] = [
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: 'Какво включва цената',
    color: 'from-slate-700 to-slate-900',
    items: [
      'Анализ и структуриране на процесите',
      'Изчистване на концепцията до детайл',
      'Дизайн и визуална посока',
      'Изграждане на структурата',
      'Разработка на функционалности',
      'Тестване и финални настройки',
      'Обучение за работа със системата',
    ],
    goal: 'ясно разбиране на стойността зад проекта.',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Време за реализация',
    color: 'from-blue-600 to-cyan-600',
    items: ['приблизително 3 месеца'],
    goal: 'реалистична и предвидима рамка.',
  },
  {
    icon: <Tag className="h-6 w-6" />,
    title: 'Инвестиция и условия',
    color: 'from-slate-700 to-slate-900',
    subtitle: (
      <>
        <p>
          Проектът е структуриран като дългосрочна основа за развитие на бранда, а не просто като еднократно изграждане на уебсайт.
        </p>
        <p className='mt-4'>
          <span className="text-slate-600">Специална цена:</span>
          <span className="text-3xl font-extrabold text-slate-900">1800 евро</span>
        </p>
      </>
    ),
    items: [
      'Реална стойност на проекта: 4000+ евро',
    ],
    detail: (
      <>
        <p>
          Системата комбинира дизайн, функционалност и логика на клиентско изживяване, което я превръща в инструмент
          за представяне, продажба и развитие във времето.
        </p>
        <h4 className="mt-5 font-manrope text-base font-semibold text-slate-900">Начин на плащане</h4>
        <p className="mt-2">Предлагат се гъвкави варианти, съобразени с удобството и възможностите на клиента:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>50% при стартиране / 50% при завършване</li>
          <li>Възможност за разсрочено плащане (например 12 вноски по 150 евро)</li>
        </ul>
        <p className="mt-2">Условията могат да бъдат адаптирани при нужда, така че процесът да бъде спокоен и предвидим.</p>
      </>
    ),
    goal: 'яснота в инвестицията и гъвкавост в реализацията, без компромис в качеството.',
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    title: 'След завършване',
    color: 'from-slate-500 to-slate-700',
    items: ['Възможност за поддръжка', 'Възможност за надграждане', 'Съдействие при нужда'],
    goal: 'устойчиво развитие във времето.',
  },
  {
    icon: <Wallet className="h-6 w-6" />,
    title: 'Извън обхвата',
    color: 'from-slate-500 to-slate-700',
    items: ['Допълнителни функционалности извън описаното', 'Външни услуги при необходимост'],
  },
]

function FeatureCard({ icon, title, color, items, goal, subtitle, detail }: OfferCard) {
  const unifiedGradient = color ? 'from-teal-600 to-blue-600' : 'from-teal-600 to-blue-600'

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className={`h-1 w-full bg-gradient-to-r ${unifiedGradient}`} />
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 md:px-6">
        <div className="flex items-center gap-4">
          <div className={`rounded-xl bg-gradient-to-r p-2.5 text-white shadow-sm ${unifiedGradient}`}>{icon}</div>
          <h3 className="font-manrope text-xl font-bold tracking-tight text-slate-900 md:text-3xl">{title}</h3>
        </div>
      </div>
      <div className="px-5 py-6 md:px-6 md:py-7">
        {subtitle ? <div className="mb-4">{subtitle}</div> : null}
        {items.length > 0 ? (
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-600" />
                <span className="font-manrope text-[15px] leading-relaxed text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {detail ? <div className="mt-5 font-manrope text-[15px] leading-relaxed text-slate-700">{detail}</div> : null}
        {goal ? (
          <div className="mt-6 rounded-xl border-l-4 border-teal-500 bg-gradient-to-r from-teal-50 to-blue-50 p-4">
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-600" />
              <div>
                <p className="font-manrope text-sm font-semibold text-teal-900">Цел:</p>
                <p className="font-manrope text-sm leading-relaxed text-slate-700">{goal}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  )
}

export default function OfferDiscoveryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
          <p className="font-manrope text-xl font-bold text-slate-800">Evelyne Bags Discovery Phase</p>
          <p className="font-manrope text-sm text-slate-500">2026</p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-10 md:py-12">
        <section className="mb-12 rounded-3xl bg-gradient-to-br from-teal-600 to-blue-600 p-8 text-white shadow-xl md:p-12">
          <div className="max-w-3xl">
            <h1 className="font-manrope text-3xl font-extrabold leading-tight md:text-5xl">
              Оферта за уебсайт и административна система за Evelyne Bags
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={DEMO_SITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/45 bg-white/15 px-5 py-2.5 font-manrope text-sm font-semibold text-white shadow-sm backdrop-blur-sm transition hover:bg-white/25"
              >
                Демо на сайта
              </a>
              <a
                href="/admin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/45 bg-white/15 px-5 py-2.5 font-manrope text-sm font-semibold text-white shadow-sm backdrop-blur-sm transition hover:bg-white/25"
              >
                Демо на администрацията
              </a>
            </div>
          </div>
        </section>

        {featureCards.map((card, index) => (
          <section key={index} className="mb-10">
            <FeatureCard {...card} />
          </section>
        ))}

        {commercialCards.map((card, index) => (
          <section key={index} className="mb-10">
            <FeatureCard {...card} />
          </section>
        ))}

        <section className="mt-14 rounded-3xl bg-gradient-to-br from-teal-600 to-blue-600 p-8 text-white shadow-2xl md:p-10">
          <div className="flex items-start gap-4">
            <Award className="mt-1 h-10 w-10 flex-shrink-0 text-teal-400" />
            <div>
              <h2 className="font-manrope text-3xl font-bold">Финално обобщение</h2>
              <p className="mt-4 font-manrope text-lg leading-relaxed text-slate-200">
                Проектът цели да създаде не просто уебсайт, а дигитално изживяване, което представя Evelyne Bags
                като бранд с характер, внимание към детайла и усещане за стойност.
              </p>
              <p className="mt-4 font-manrope text-lg leading-relaxed text-slate-200">Сайтът комбинира:</p>
              <ul className="mt-3 space-y-2">
                {['силна визуална идентичност', 'персонализация', 'ясен процес на поръчка', 'премиум обслужване'].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-2 font-manrope text-base text-slate-200">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-400" />
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
              <p className="mt-4 font-manrope text-lg leading-relaxed text-slate-200">
                с възможност да се развива и надгражда заедно с бизнеса.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
