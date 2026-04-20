import { useCallback, useMemo, useState, type ReactNode } from 'react'
import type { AppData, Order, Product } from '../types'
import { loadData, resetToDemo, saveData } from '../lib/store'
import { AppDataContext, type AppDataContextValue } from './app-data-context'

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<AppData>(() => loadData())

  const setData = useCallback((updater: AppData | ((prev: AppData) => AppData)) => {
    setDataState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      saveData(next)
      return next
    })
  }, [])

  const upsertProduct = useCallback((product: Product) => {
    setData((prev) => {
      const idx = prev.products.findIndex((p) => p.id === product.id)
      const products =
        idx === -1
          ? [...prev.products, { ...product, updatedAt: new Date().toISOString() }]
          : prev.products.map((p) =>
              p.id === product.id ? { ...product, updatedAt: new Date().toISOString() } : p
            )
      return { ...prev, products }
    })
  }, [setData])

  const deleteProduct = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }))
  }, [setData])

  const upsertOrder = useCallback((order: Order) => {
    setData((prev) => {
      const idx = prev.orders.findIndex((o) => o.id === order.id)
      const orders =
        idx === -1 ? [...prev.orders, order] : prev.orders.map((o) => (o.id === order.id ? order : o))
      return { ...prev, orders }
    })
  }, [setData])

  const deleteOrder = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      orders: prev.orders.filter((o) => o.id !== id),
    }))
  }, [setData])

  const reloadDemo = useCallback(() => {
    const next = resetToDemo()
    setDataState(next)
  }, [])

  const value = useMemo<AppDataContextValue>(
    () => ({
      data,
      setData,
      upsertProduct,
      deleteProduct,
      upsertOrder,
      deleteOrder,
      reloadDemo,
    }),
    [data, setData, upsertProduct, deleteProduct, upsertOrder, deleteOrder, reloadDemo]
  )

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}
