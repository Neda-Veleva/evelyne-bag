import { useContext } from 'react'
import { AppDataContext } from '../context/app-data-context'

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData трябва да се използва вътре в DataProvider')
  return ctx
}
