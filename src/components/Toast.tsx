import React from 'react'
import { useToast } from '~/context/ToastContext'

export const Toast = () => {
  const { toasts } = useToast()

  return (
    <div>
      {toasts.map((t) => (
        <div
          key={t.id}
        >
          {t.message}
        </div>
      ))}
    </div>
  )
}
