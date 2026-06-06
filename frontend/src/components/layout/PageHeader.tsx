import type { ReactNode } from 'react'

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <header className="flex shrink-0 items-start justify-between gap-4 border-b border-app-border px-6 py-4">
      <div>
        <h2 className="text-lg font-medium">{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm text-app-muted">{subtitle}</p>}
      </div>
      {action}
    </header>
  )
}
