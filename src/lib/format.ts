const currency = new Intl.NumberFormat('bg-BG', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export function formatMoneyEUR(value: number): string {
  return currency.format(value)
}

export function formatDateTime(iso: string): string {
  try {
    return new Intl.DateTimeFormat('bg-BG', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}
