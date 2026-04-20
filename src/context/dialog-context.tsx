import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { LuxuryButton } from '../components/LuxuryCta'

type DialogState =
  | { open: false }
  | { open: true; kind: 'alert'; message: string; resolve: () => void }
  | { open: true; kind: 'confirm'; message: string; resolve: (value: boolean) => void }

export type AppDialogContextValue = {
  alert: (message: string) => Promise<void>
  confirm: (message: string) => Promise<boolean>
}

const DialogContext = createContext<AppDialogContextValue | null>(null)

export function useAppDialog(): AppDialogContextValue {
  const ctx = useContext(DialogContext)
  if (!ctx) {
    throw new Error('useAppDialog must be used within DialogProvider')
  }
  return ctx
}

export function DialogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DialogState>({ open: false })

  const alertFn = useCallback((message: string) => {
    return new Promise<void>((resolve) => {
      setState({ open: true, kind: 'alert', message, resolve })
    })
  }, [])

  const confirmFn = useCallback((message: string) => {
    return new Promise<boolean>((resolve) => {
      setState({ open: true, kind: 'confirm', message, resolve })
    })
  }, [])

  const closeAlert = useCallback(() => {
    setState((s) => {
      if (s.open && s.kind === 'alert') {
        s.resolve()
        return { open: false }
      }
      return s
    })
  }, [])

  const resolveConfirm = useCallback((value: boolean) => {
    setState((s) => {
      if (s.open && s.kind === 'confirm') {
        s.resolve(value)
        return { open: false }
      }
      return s
    })
  }, [])

  useEffect(() => {
    if (!state.open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (state.open && state.kind === 'alert') closeAlert()
        else if (state.open && state.kind === 'confirm') resolveConfirm(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state, closeAlert, resolveConfirm])

  useEffect(() => {
    if (!state.open) return
    requestAnimationFrame(() => {
      document.getElementById('dialog-default-focus')?.focus()
    })
  }, [state])

  const value: AppDialogContextValue = { alert: alertFn, confirm: confirmFn }

  return (
    <DialogContext.Provider value={value}>
      {children}
      {state.open ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-[#0d1020]/45 backdrop-blur-[2px]"
            aria-label="Затвори"
            onClick={() => {
              if (state.kind === 'alert') closeAlert()
              else resolveConfirm(false)
            }}
          />
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="app-dialog-title"
            className="relative z-10 w-full max-w-md rounded-2xl border border-[#e5dfd3] bg-[#faf8f4] p-6 shadow-[0_24px_48px_rgba(13,16,32,0.18)]"
          >
            <h2 id="app-dialog-title" className="sr-only">
              {state.kind === 'confirm' ? 'Потвърждение' : 'Съобщение'}
            </h2>
            <p className="font-manrope text-sm leading-relaxed text-[#1a1523]">{state.message}</p>
            <div className="mt-8 flex flex-wrap justify-end gap-3">
              {state.kind === 'confirm' ? (
                <LuxuryButton
                  id="dialog-default-focus"
                  type="button"
                  variant="admin-outline-muted"
                  className="inline-flex"
                  onClick={() => resolveConfirm(false)}
                >
                  Отказ
                </LuxuryButton>
              ) : null}
              <LuxuryButton
                id={state.kind === 'alert' ? 'dialog-default-focus' : undefined}
                type="button"
                variant="admin-primary"
                className="inline-flex"
                onClick={() => {
                  if (state.kind === 'alert') closeAlert()
                  else resolveConfirm(true)
                }}
              >
                {state.kind === 'confirm' ? 'Потвърди' : 'Добре'}
              </LuxuryButton>
            </div>
          </div>
        </div>
      ) : null}
    </DialogContext.Provider>
  )
}
