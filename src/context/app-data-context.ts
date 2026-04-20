import { createContext } from 'react'
import type { AppData, Order, Product } from '../types'

export type AppDataContextValue = {
  data: AppData
  setData: (updater: AppData | ((prev: AppData) => AppData)) => void
  upsertProduct: (product: Product) => void
  deleteProduct: (id: string) => void
  upsertOrder: (order: Order) => void
  deleteOrder: (id: string) => void
  reloadDemo: () => void
}

export const AppDataContext = createContext<AppDataContextValue | null>(null)
