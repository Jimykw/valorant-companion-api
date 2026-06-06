import type { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <label className="flex flex-col gap-1 text-left">
      {label && <span className="text-sm text-app-muted">{label}</span>}
      <textarea
        className={`min-h-[96px] resize-y rounded border border-app-border bg-app-surface px-3 py-2 text-sm text-app-text outline-none placeholder:text-app-muted focus:border-neutral-500 ${error ? 'border-red-700' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  )
}
