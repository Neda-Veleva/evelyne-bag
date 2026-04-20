import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  Globe,
  LayoutGrid,
  Mail,
  Repeat,
  Shield,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react'
import { DEMO_SITE } from '../lib/sitePaths'

type OfferCard = {
  icon: ReactNode
  title: string
  color: string
  items: ReactNode[]
  goal: string
  subtitle?: ReactNode
}

const featureCards: OfferCard[] = [
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Уебсайт и представяне',
    color: 'from-blue-500 to-cyan-500',
    items: [
      <>
        Демо версия на сайт: <Link to={DEMO_SITE} className="text-teal-700 underline underline-offset-2">eveline bags demo</Link>
      </>,
      'Luxury представяне, което изглежда като бранд галерия, не като стандартен ecommerce.',
      'Начална страница с Product as Jewel структура и силен визуален фокус.',
      'Листинг на продукти (shop/catalog) с ясна структура, категории и лесна навигация.',
      'Продуктова страница с детайли за модела, визуализации, персонализация и ключова информация.',
      'Категории продукти с чиста навигация.',
      'Двуезичност: стартира на български и английски, с опция за надграждане на още езици.',
      'Секции за новини/статии и история за създаването на чантите.',
      'FAQ секция с ясни отговори за процес, срокове и материали.',
    ],
    goal: 'премиум first impression и ясно представяне на целия бранд свят още от началната страница',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Административен контрол',
    color: 'from-slate-600 to-slate-800',
    items: [
      <>
        Демо администрация: <Link to="/admin" className="text-teal-700 underline underline-offset-2">admin panel</Link>
      </>,
      'Централен панел за управление на продукти, категории и съдържание.',
      'Лесно добавяне и редактиране на новини/статии, FAQ и ключови секции в сайта.',
      'Контрол върху Top гледани и Top продавани продукти, които се показват на началната страница.',
      'Преглед и управление на newsletter имейли и контактни запитвания.',
      'Управление на поръчки, календар за старт на изработка и приоритетни заявки.',
      'Модерация на ревюта и настройки за лоялни клиенти и препоръки.',
      <strong>Без нужда от технически знания за ежедневна работа.</strong>,
    ],
    goal: 'пълен контрол върху съдържанието и процесите от едно място',
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Логика за топ продукти',
    color: 'from-teal-500 to-emerald-500',
    items: [
      'Функционалност за Top гледани продукти на началната страница (на база реални прегледи).',
      'Функционалност за Top продавани продукти (на база реални поръчки).',
      'Автоматично обновяване на подборите според текущото поведение на клиентите.',
      'Контрол от администрацията за позициониране и видимост на блоковете.',
    ],
    goal: 'показване на най-релевантните модели и повишаване на конверсиите без ръчна подмяна всеки ден',
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: 'Контакт, newsletter и персонален асистент чат',
    color: 'from-cyan-500 to-blue-500',
    items: [
      'Newsletter модул със запазване на списък с имейли и възможност за сегментация.',
      'Contact us форма за директна комуникация с екипа.',
      'Chat блокче в стил Cartier с необходимите опции за обслужване на клиентите.',
    ],
    goal: 'бърз канал за обслужване с high-end усещане и ясно разпределение на типовете запитвания',
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: 'Гравиране и персонализация',
    color: 'from-amber-500 to-orange-500',
    items: [
      'Функционалност за гравиране на продукт с визуализация преди финално потвърждение.',
      'Показване на превю според избрания текст/позиция за гравиране.',
      'Политика при връщане: връщането е възможно, но се удържа част от сумата за персоналния труд.',
      'Ясно информиране за условията преди плащане.',
    ],
    goal: 'персонален продукт с прозрачни правила и без изненади за клиента',
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: 'Записване, календар и производство',
    color: 'from-emerald-500 to-teal-500',
    items: [
      'Записване на час за обсъждане на желаната чанта.',
      'Календар за начало на работа по конкретната поръчка.',
      'Информация за крайна дата и/или важно събитие.',
      'Приоритетна поръчка като добавена стойност и отделна цена.',
      'Цялостен флоу на поръчване: листинг → продуктова страница → избор на опции → потвърждение на поръчка.',
      'Ясни етапи в поръчката: заявка, подготовка, изработка, финализиране.',
    ],
    goal: 'предвидим график и по-голямо спокойствие за клиента през целия цикъл на изработка',
  },
  {
    icon: <LayoutGrid className="h-6 w-6" />,
    title: 'Custom създаване на чанта',
    color: 'from-blue-500 to-indigo-500',
    items: [
      'Самостоятелно създаване на продукт: дръжки, мъниста, камъни и допълнителни елементи.',
      'Ограничаване на невъзможни комбинации чрез правила за съвместимост.',
      'Визуална конфигурация на избраните елементи в реално време.',
      'Възможност за запазване на конфигурация и последващо довършване.',
    ],
    goal: 'силно персонализирано преживяване без технически грешки в комбинациите',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Подарък, ревюта и лоялни клиенти',
    color: 'from-violet-500 to-fuchsia-500',
    items: [
      'Функционалност „Направи подарък“ с gift flow и персонално послание.',
      'Система за създаване на ревюта и публикуване на клиентски мнения.',
      'Акаунт с възможност за препоръки според предпочитанията.',
      'Лоялен клиент профил с нива/предимства за повторни покупки.',
    ],
    goal: 'повече доверие, повторяемост и лична връзка с клиента',
  },
]

const commercialCards: OfferCard[] = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Цена',
    color: 'from-slate-700 to-slate-900',
    subtitle: (
      <span className="inline-flex flex-col gap-1">
        <span className="text-slate-600">Специална цена:</span>
        <span className="text-3xl font-extrabold text-slate-900">1500 евро</span>
        <span className="text-sm text-slate-500">Реална стойност на проекта: 4000 евро</span>
      </span>
    ),
    items: [
      'възможност за естествено надграждане във времето',
      'адаптиране спрямо растежа на бизнеса',
      'поддръжка и развитие при нужда',
    ],
    goal: 'прозрачна рамка и яснота за бюджет още от самото начало, с фокус върху дългосрочна стойност и удобство в ежедневната работа',
  },
  {
    icon: <LayoutGrid className="h-6 w-6" />,
    title: 'Какво включва цената',
    color: 'from-slate-700 to-slate-900',
    items: [
      'анализ и структуриране на процесите',
      'уточняване на детайлите до най-малките подробности',
      'създаване на дизайн',
      'изграждане на структурата на сайта',
      'разработка на функционалността',
      'завършителни настройки на цялостната система',
      'тестване и финални настройки',
      'въвеждане и обучение за работа с системата',
    ],
    goal: 'разбиране на стойността и процеса зад изграждането на системата',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Време за реализация',
    color: 'from-blue-600 to-cyan-600',
    items: ['приблизително 2-3 месеца'],
    goal: 'реалистична и ясна времева рамка без излишна несигурност',
  },
  {
    icon: <Repeat className="h-6 w-6" />,
    title: 'Начин на плащане',
    color: 'from-amber-500 to-orange-600',
    items: [
      <>
        <span className="font-semibold text-slate-900">50%</span> при стартиране и <span className="font-semibold text-slate-900">50%</span> при завършване (завършена част от проекта)
      </>,
      <>
        или <span className="font-semibold text-slate-900">12 вноски по 125 евро</span>
      </>,
    ],
    goal: 'ясна и предвидима структура на плащане',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Какво следва след завършване на проекта',
    color: 'from-slate-500 to-slate-700',
    items: [
      'възможност за поддръжка',
      'възможност за надграждане',
      'съдействие при нужда',
    ],
    goal: 'усещане за сигурност след старта',
  },
  {
    icon: <Filter className="h-6 w-6" />,
    title: 'Извън обхвата на проекта',
    color: 'from-slate-500 to-slate-700',
    items: ['допълнителни функционалности извън описаните', 'външни платени услуги (ако има такива)'],
    goal: 'по-малко недоразумения и по-ясни очаквания',
  },
]

function FeatureCard({ icon, title, color, items, goal, subtitle }: OfferCard) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className={`h-1 w-full bg-gradient-to-r ${color}`} />
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 md:px-6">
        <div className="flex items-center gap-4">
          <div className={`rounded-xl bg-gradient-to-r p-2.5 text-white shadow-sm ${color}`}>{icon}</div>
          <h3 className="font-manrope text-xl font-bold tracking-tight text-slate-900 md:text-3xl">{title}</h3>
        </div>
      </div>
      <div className="px-5 py-6 md:px-6 md:py-7">
        {subtitle ? <div className="mb-4">{subtitle}</div> : null}
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-600" />
              <span className="font-manrope text-[15px] leading-relaxed text-slate-700">{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-xl border-l-4 border-teal-500 bg-gradient-to-r from-teal-50 to-blue-50 p-4">
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-600" />
            <div>
              <p className="font-manrope text-sm font-semibold text-teal-900">Цел:</p>
              <p className="font-manrope text-sm leading-relaxed text-slate-700">{goal}</p>
            </div>
          </div>
        </div>
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
              Оферта за уебсайт и система за Evelyne Bags
            </h1>
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

        <section className="mt-14 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-white shadow-2xl md:p-10">
          <div className="flex items-start gap-4">
            <Star className="mt-1 h-10 w-10 flex-shrink-0 text-teal-400" />
            <div>
              <h2 className="font-manrope text-3xl font-bold">Финално обобщение</h2>
              <p className="mt-4 font-manrope text-lg leading-relaxed text-slate-200">
                В офертата са включени всички ключови модули: топ гледани/продавани продукти, категории,
                newsletter, contact форма, новини, гравиране и визуализация, записване на час, календар с крайна дата,
                приоритетна поръчка, custom създаване на чанта, gift опция, ревюта, account + loyalty, FAQ и
                персонален асистент чат по Cartier логика.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
