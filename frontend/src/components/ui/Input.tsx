import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-')
  return (
    <label className="flex flex-col gap-1 text-left">
      {label && <span className="text-sm text-app-muted">{label}</span>}
      <input
        id={inputId}
        className={`rounded border border-app-border bg-app-surface px-3 py-2 text-sm text-app-text outline-none placeholder:text-app-muted focus:border-neutral-500 ${error ? 'border-red-700' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  )
}
