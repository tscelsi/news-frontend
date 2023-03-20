import React from "react"

export type Toast = {
  id: number;
  message: string;
};


type ToastType = {
  toasts: Toast[]
  showToast: (toast: Toast) => void
  hideToast: (toastId: number) => void
}

const ToastContext = React.createContext<ToastType>({
  toasts: [],
  showToast: (toast: Toast) => { console.log('showToast') },
  hideToast: (toastId: number) => { console.log('hideToast') }
})

export const useToast = () => React.useContext(ToastContext)

export const ToastContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToast] = React.useState<Toast[]>([])

  const showToast = (toast: Toast) => {
    setToast((v) => [...v, toast])
  }

  const hideToast = (toastId: number) => {
    setToast(curr => curr.filter((v) => v.id !== toastId))
  }

  const value = {
    toasts,
    showToast,
    hideToast,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  )
}