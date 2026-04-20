import { nanoid } from 'nanoid'
import type { AppData, Order, Product } from '../types'
import { DEMO_DATA } from './seed'

const STORAGE_KEY = 'eveline-bags-admin-data-v5'

function normalizeProduct(p: Product & { creationStory?: string; relatedProductIds?: string[] }): Product {
  const rawRelated = Array.isArray(p.relatedProductIds) ? p.relatedProductIds : []
  const relatedProductIds = [...new Set(rawRelated.filter(Boolean))].slice(0, 4)
  return {
    ...p,
    colors: Array.isArray(p.colors) ? p.colors : [],
    creationStory: typeof p.creationStory === 'string' ? p.creationStory : '',
    relatedProductIds,
  }
}

function normalizeOrder(o: Order): Order {
  return {
    ...o,
    productColorId: o.productColorId,
  }
}

/** Попълва от демо seed само когато локалните полета са празни (стари записи в localStorage). */
function mergeProductWithDemoSeed(p: Product): Product {
  const seed = DEMO_DATA.products.find((s) => s.id === p.id)
  if (!seed) return normalizeProduct(p)
  return normalizeProduct({
    ...p,
    creationStory: p.creationStory?.trim() ? p.creationStory : seed.creationStory,
    relatedProductIds: p.relatedProductIds?.length ? p.relatedProductIds : [...seed.relatedProductIds],
    story: p.story?.trim() ? p.story : seed.story,
  })
}

function safeParse(raw: string | null): AppData | null {
  if (!raw) return null
  try {
    const data = JSON.parse(raw) as AppData
    if (!data.products || !data.orders) return null
    return {
      products: data.products.map((p) => normalizeProduct(p as Product)),
      orders: data.orders.map((o) => normalizeOrder(o as Order)),
    }
  } catch {
    return null
  }
}

export function loadData(): AppData {
  if (typeof window === 'undefined') return DEMO_DATA
  const existing = safeParse(localStorage.getItem(STORAGE_KEY))
  if (existing) {
    const merged: AppData = {
      orders: existing.orders,
      products: existing.products.map((p) => mergeProductWithDemoSeed(p)),
    }
    const json = JSON.stringify(merged)
    if (json !== localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, json)
    }
    return merged
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_DATA))
  return DEMO_DATA
}

export function saveData(data: AppData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function resetToDemo(): AppData {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_DATA))
  return DEMO_DATA
}

export function createEmptyProduct(): Product {
  const now = new Date().toISOString()
  return {
    id: `prod-${nanoid(10)}`,
    name: '',
    shortDescription: '',
    price: 0,
    status: 'available',
    productType: 'one_of_a_kind',
    mainImage: '',
    gallery: [],
    detailImages: [],
    onModel: [],
    lifestyle: [],
    materials: '',
    handmade: true,
    limited: false,
    giftReady: true,
    story: '',
    creationStory: '',
    relatedProductIds: [],
    colors: [],
    visibility: 'draft',
    updatedAt: now,
  }
}

export function nextOrderId(orders: Order[]): string {
  const year = new Date().getFullYear()
  let max = 0
  for (const o of orders) {
    const m = /^ORD-(\d{4})-(\d+)$/.exec(o.id)
    if (m && Number(m[1]) === year) max = Math.max(max, Number(m[2]))
  }
  const next = max + 1
  return `ORD-${year}-${String(next).padStart(4, '0')}`
}

export function createEmptyOrder(productId: string, orders: Order[]): Order {
  return {
    id: nextOrderId(orders),
    customerName: '',
    email: '',
    phone: '',
    productId,
    productColorId: undefined,
    orderType: 'direct_purchase',
    status: 'new',
    adminNotes: '',
    createdAt: new Date().toISOString(),
  }
}
