export type ProductStatus = 'available' | 'sold_out' | 'made_to_order'

export type ProductKind = 'one_of_a_kind' | 'limited_edition' | 'custom'

export type Visibility = 'draft' | 'published'

export type OrderType = 'direct_purchase' | 'custom_order'

export type OrderStatus = 'new' | 'in_progress' | 'completed' | 'cancelled'

/** Вариант на продукта по цвят (име + опционална мостра hex в админа). */
export type ProductColor = {
  id: string
  name: string
  hex?: string
}

export type Product = {
  id: string
  name: string
  shortDescription: string
  price: number
  /** Депозит при поръчка (EUR). */
  deposit: number
  status: ProductStatus
  productType: ProductKind
  /** Налични цветове; празен масив = без отделни варианти. */
  colors: ProductColor[]
  mainImage: string
  gallery: string[]
  detailImages: string[]
  onModel: string[]
  lifestyle: string[]
  materials: string
  handmade: boolean
  limited: boolean
  giftReady: boolean
  story: string
  /** По-дълъг текст за блока „История на създаването“ под галерията на продукта. */
  creationStory: string
  /** До 4 свързани модела (id на други продукти). */
  relatedProductIds: string[]
  visibility: Visibility
  updatedAt: string
}

export type Order = {
  id: string
  customerName: string
  email: string
  phone?: string
  productId: string
  /** Избран цвят от `product.colors`, ако е уточнен. */
  productColorId?: string
  orderType: OrderType
  status: OrderStatus
  adminNotes: string
  createdAt: string
}

export type AppData = {
  products: Product[]
  orders: Order[]
}
