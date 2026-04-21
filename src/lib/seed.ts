import type { AppData } from '../types'

/**
 * Демо снимки на чанти от референтна витрина (Palera Milano).
 * Източник: https://paleramilano.com/collections/all-handbags
 */
function pm(file: string) {
  return `https://paleramilano.com/cdn/shop/files/${file}`
}

const P = {
  clutchMain: pm('clutch-wood-crystal-742482_1024x.jpg?v=1752500350'),
  clutchB: pm('clutch-wood-crystal-418050.jpg?v=1752500350&width=1800'),
  clutchC: pm('clutch-wood-crystal-355402.jpg?v=1752500350&width=1800'),
  crystalOnModel: pm(
    'CrystalPouchSilverBlueonModel_d7b24185-5a2a-486e-9152-b4204d4046cc.jpg?v=1776517776&width=1800'
  ),
  ameliaMain: pm('amelia-bag-936348_1024x.jpg?v=1752500241'),
  ameliaB: pm('amelia-bag-936348.jpg?v=1752500241&width=1800'),
  ameliaC: pm('amelia-bag-993602.jpg?v=1752500241&width=1800'),
  santoriniMain: pm('santorini-lock-948248_1024x.jpg?v=1752500310'),
  santoriniB: pm('santorini-lock-299221.jpg?v=1752500310&width=1800'),
  santoriniC: pm('santorini-lock-536309.jpg?v=1752500311&width=1800'),
  ameliaWoodMain: pm('amelia-wood-crystal-879542_1024x.jpg?v=1752500373'),
  ameliaWoodB: pm('amelia-wood-crystal-1168425.jpg?v=1752722250&width=1800'),
  ameliaWoodC: pm('amelia-wood-crystal-148489.jpg?v=1752662570&width=1800'),
  maxiMain: pm('maxi-roma-462167_1024x.jpg?v=1752500298'),
  maxiB: pm('maxi-roma-929357.jpg?v=1752500298&width=1800'),
  maxiC: pm('maxi-roma-905164.jpg?v=1752500299&width=1800'),
  capriMain: pm('capri-bag-381338_1024x.jpg?v=1752500328'),
  capriB: pm('capri-bag-530772.jpg?v=1752500328&width=1800'),
  capriC: pm('capri-bag-433156.jpg?v=1752500328&width=1800'),
}

export const DEMO_DATA: AppData = {
  products: [
    {
      id: 'prod-golden-ember',
      name: 'Златен жар',
      colors: [
        { id: 'ge-konjak', name: 'Коняк', hex: '#8B5A3C' },
        { id: 'ge-noir', name: 'Ноар (дълбоко черно)', hex: '#1A1512' },
        { id: 'ge-oro', name: 'С warm gold акцент', hex: '#C4A574' },
      ],
      shortDescription:
        'Кожа с топъл оттенък и шепот от златиста закопчалка — единствена вечерна бройка, която няма да се повтори.',
      price: 1280,
      deposit: 320,
      status: 'available',
      productType: 'one_of_a_kind',
      mainImage: P.clutchMain,
      gallery: [P.clutchMain, P.clutchB, P.clutchC],
      detailImages: [P.clutchB, P.clutchC],
      onModel: [P.crystalOnModel],
      lifestyle: [P.clutchB],
      materials:
        'Италианска пълнозърнеста кожа, ръчно полирани ръбове, масивна месингова закопчалка.',
      handmade: true,
      limited: false,
      giftReady: true,
      story:
        'Създадена като бижу за китката: компактна силует, топла светлина и шев с ритъма на бавен дъх.',
      creationStory:
        'Първите проби бяха само силует — хартиени линии върху масата на ателието. После идва изборът на кожа: топлина, финна зърнестост, как реагира на светлината. Шевовете са по шаблон, но последното полиране е винаги по усет. Този модел е роден в три вечери на тиха музика и напоена гума за ръбове — без да се бърза със сушенето.',
      relatedProductIds: [
        'prod-ivory-glow',
        'prod-rose-silk-whisper',
        'prod-venetian-mist',
        'prod-midnight-stone',
      ],
      visibility: 'published',
      updatedAt: new Date('2026-03-12T10:00:00').toISOString(),
    },
    {
      id: 'prod-ivory-glow',
      name: 'Сияние на слонова кост',
      colors: [
        { id: 'ig-slonova', name: 'Слонова кост', hex: '#F2EBE3' },
        { id: 'ig-blush', name: 'Розов прах', hex: '#E8D5D0' },
      ],
      shortDescription:
        'Като порцелан — тиха кожа и сатенена вътрешност: сдържана светлина за дневни поводи.',
      price: 980,
      deposit: 250,
      status: 'sold_out',
      productType: 'limited_edition',
      mainImage: P.ameliaMain,
      gallery: [P.ameliaMain, P.ameliaB, P.ameliaC],
      detailImages: [P.ameliaB],
      onModel: [P.ameliaC],
      lifestyle: [P.ameliaB],
      materials: 'Кремава напа, велурена подплата, верижка в светло злато.',
      handmade: true,
      limited: true,
      giftReady: true,
      story:
        'Номерирана капсула, вдъхновена от милански галерии: мека светлина, чисти линии и успокояващ допир.',
      creationStory:
        'Започна от цвят — слонова кост, който не крещи, а кани. Кожата беше подбрана да улови дневната светлина без да жълтее прекалено бързо. Вътрешността е велур, за да е мек допирът всеки път, когато потърсите ключовете. Една лимитирана серия означава: всяка бройка има номер и леко различен оттенък на ръба — ръчно довършен.',
      relatedProductIds: [
        'prod-golden-ember',
        'prod-rose-silk-whisper',
        'prod-venetian-mist',
        'prod-midnight-stone',
      ],
      visibility: 'published',
      updatedAt: new Date('2026-02-28T15:30:00').toISOString(),
    },
    {
      id: 'prod-midnight-stone',
      name: 'Полунощен камък',
      colors: [
        { id: 'ms-petrol', name: 'Петролено синьо', hex: '#1E3D3F' },
        { id: 'ms-espresso', name: 'Еспресо', hex: '#3B2F2F' },
        { id: 'ms-burgund', name: 'Бургунди', hex: '#4A2C32' },
      ],
      shortDescription:
        'Дълбоки минерални тонове и скулптурна закопчалка — по вашите мерки, когато дойде вдъхновението.',
      price: 1450,
      deposit: 450,
      status: 'made_to_order',
      productType: 'custom',
      mainImage: P.santoriniMain,
      gallery: [P.santoriniMain, P.santoriniB, P.santoriniC],
      detailImages: [P.santoriniB, P.santoriniC],
      onModel: [P.santoriniC],
      lifestyle: [P.santoriniB],
      materials: 'Растително дъбена кожа, восъчен конец, по желание монограм.',
      handmade: true,
      limited: false,
      giftReady: false,
      story:
        'Всяка „Полунощен камък“ се очертава след кратък разговор в ателието — първо пропорция, после детайл.',
      creationStory:
        'Този силует е замислен като персонален ритуал: след разговор за начина ви на движение и за това какво носите всеки ден, очертаваме форма и закопчалка. Камъните и минералните тонове идват от проби на кожа, подредени до прозореца — гледат се при различна светлина, преди да се вземе решение. По поръчка означава, че шаблонът е ваш, а ателието държи на прецизността до последния шев.',
      relatedProductIds: [
        'prod-golden-ember',
        'prod-ivory-glow',
        'prod-rose-silk-whisper',
        'prod-venetian-mist',
      ],
      visibility: 'published',
      updatedAt: new Date('2026-04-01T09:15:00').toISOString(),
    },
    {
      id: 'prod-rose-silk-whisper',
      name: 'Розов копринен шепот',
      colors: [
        { id: 'rsw-rozov', name: 'Розово шампанско', hex: '#D4A59A' },
        { id: 'rsw-dust', name: 'Прашно розово', hex: '#C9A9A0' },
      ],
      shortDescription:
        'Розов оттенък на коприна върху стегната кожа — романтика без шум.',
      price: 1120,
      deposit: 280,
      status: 'available',
      productType: 'limited_edition',
      mainImage: P.ameliaWoodMain,
      gallery: [P.ameliaWoodMain, P.ameliaWoodB, P.ameliaWoodC],
      detailImages: [P.ameliaWoodB],
      onModel: [P.ameliaWoodC],
      lifestyle: [P.ameliaWoodB, P.ameliaWoodC],
      materials: 'Кожа с розов оттенък, копринен панел, ръчно оцветен ръб.',
      handmade: true,
      limited: true,
      giftReady: true,
      story:
        'От една вечер във Флоренция: свещи, антракти и тиха самоувереност.',
      creationStory:
        'Коприненият панел беше експеримент — искахме топлина без тежест. Кожата е подбрана да „диша“ с розовия оттенък, без да изглежда прекалено сватбено. Ръбовете са оцветени на ръка, за да няма резки преходи. Серията е малка: когато платът свърши, спираме — без компромис с повторение.',
      relatedProductIds: [
        'prod-golden-ember',
        'prod-ivory-glow',
        'prod-midnight-stone',
        'prod-venetian-mist',
      ],
      visibility: 'published',
      updatedAt: new Date('2026-03-20T11:45:00').toISOString(),
    },
    {
      id: 'prod-obsidian-arc',
      name: 'Обсидианова дъга',
      colors: [
        { id: 'oa-antre', name: 'Антрацит', hex: '#2B2B2E' },
        { id: 'oa-graphite', name: 'Графит', hex: '#4A4A4F' },
      ],
      shortDescription:
        'Архитектурни извивки в почти черна кожа — колекционерски силует с присъствие като в галерия.',
      price: 1380,
      deposit: 350,
      status: 'available',
      productType: 'one_of_a_kind',
      mainImage: P.maxiMain,
      gallery: [P.maxiMain, P.maxiB, P.maxiC],
      detailImages: [P.maxiB],
      onModel: [P.maxiB],
      lifestyle: [P.maxiC],
      materials: 'Дълбоко антрацитова кожа, графитова закопчалка, микрофибърна подплата.',
      handmade: true,
      limited: false,
      giftReady: true,
      story:
        'Едно изделие, една дъга — създадена да стои на пиедестал колкото и на рамото ви.',
      creationStory:
        'Архитектурните линии идват от скици върху графитна хартия — големи извивки, после намаляване до човешки мащаб. Антрацитът поглъща светлината; закопчалката е избрана да „чупи“ монохрома без да крещи. Това е чернова за колекция: работим още по баланса на дръжката, преди да я пуснем публично.',
      relatedProductIds: [
        'prod-golden-ember',
        'prod-ivory-glow',
        'prod-midnight-stone',
        'prod-venetian-mist',
      ],
      visibility: 'draft',
      updatedAt: new Date('2026-04-05T14:00:00').toISOString(),
    },
    {
      id: 'prod-venetian-mist',
      name: 'Венецианска мъгла',
      colors: [
        { id: 'vm-mgla', name: 'Мъгла', hex: '#B8B5B0' },
        { id: 'vm-pesak', name: 'Пясък', hex: '#D4CFC4' },
        { id: 'vm-sage', name: 'Мъх (sage)', hex: '#9CA89A' },
      ],
      shortDescription:
        'Сиво като морска мъгла с ръчно подредени вълни — меко изявление за бавни пътувания.',
      price: 1050,
      deposit: 260,
      status: 'available',
      productType: 'limited_edition',
      mainImage: P.capriMain,
      gallery: [P.capriMain, P.capriB, P.capriC],
      detailImages: [P.capriB, P.capriC],
      onModel: [P.capriB],
      lifestyle: [P.capriB, P.capriC],
      materials: 'Кожа с фина зърнестост, памучна подплата, откачаща се каишка.',
      handmade: true,
      limited: true,
      giftReady: true,
      story:
        'Вдъхновена от светлината на лагуната: приглушена, отразяваща се, лесна за съчетаване с лен и злато.',
      creationStory:
        'Мъглата като цвят — не сиво от палитра, а смес от нишки на памук и лен, които носихме до ателието за сравнение. Кожата е с фина зърнестост, за да улови дневната светлина без блясък. Каишката се откача: искахме модел, който да пътува — от градски ден до бавен следобед край вода.',
      relatedProductIds: [
        'prod-golden-ember',
        'prod-ivory-glow',
        'prod-rose-silk-whisper',
        'prod-midnight-stone',
      ],
      visibility: 'published',
      updatedAt: new Date('2026-04-08T08:20:00').toISOString(),
    },
  ],
  orders: [
    {
      id: 'ORD-2026-0142',
      customerName: 'Елена Василева',
      email: 'elena.v@example.com',
      phone: '+359 88 555 1201',
      productId: 'prod-golden-ember',
      productColorId: 'ge-konjak',
      orderType: 'direct_purchase',
      status: 'completed',
      adminNotes: 'Изпратена с калъф и картичка за грижа. Клиентката хареса закопчалката.',
      createdAt: new Date('2026-03-18T14:22:00').toISOString(),
    },
    {
      id: 'ORD-2026-0156',
      customerName: 'Марко Конти',
      email: 'm.conti.art@example.com',
      productId: 'prod-midnight-stone',
      productColorId: 'ms-petrol',
      orderType: 'custom_order',
      status: 'in_progress',
      adminNotes: 'Чакаме потвърждение за дължина на каишката (62 см срещу 58 см). Мудбордът е одобрен.',
      createdAt: new Date('2026-04-02T09:10:00').toISOString(),
    },
    {
      id: 'ORD-2026-0161',
      customerName: 'София Димитрова',
      email: 'sofia.d@example.com',
      productId: 'prod-rose-silk-whisper',
      productColorId: 'rsw-rozov',
      orderType: 'direct_purchase',
      status: 'new',
      adminNotes: 'Очаква потвърждение на цвета по телефон; клиентката пътува следващата седмица.',
      createdAt: new Date('2026-04-10T16:40:00').toISOString(),
    },
    {
      id: 'ORD-2026-0164',
      customerName: 'Джеймс Уитакър',
      email: 'j.whitaker@example.com',
      phone: '+44 7700 900123',
      productId: 'prod-ivory-glow',
      productColorId: 'ig-slonova',
      orderType: 'direct_purchase',
      status: 'cancelled',
      adminNotes:
        'Клиентът поиска отмяна — артикулът вече беше продаден; предложена листа за изчакване.',
      createdAt: new Date('2026-03-25T11:05:00').toISOString(),
    },
    {
      id: 'ORD-2026-0168',
      customerName: 'Нина Петрова',
      email: 'nina.p@example.com',
      productId: 'prod-venetian-mist',
      productColorId: 'vm-sage',
      orderType: 'direct_purchase',
      status: 'in_progress',
      adminNotes: 'Поискана подаръчна опаковка; изпращане планирано за петък.',
      createdAt: new Date('2026-04-12T10:15:00').toISOString(),
    },
  ],
}
