/** Базов път на демо витрината (магазин + продукти). Офертата е на `/`. */
export const DEMO_SITE = '/demo-site' as const

export function demoProductPath(id: string) {
  return `${DEMO_SITE}/products/${encodeURIComponent(id)}`
}

export function demoShopPath() {
  return `${DEMO_SITE}/products`
}
