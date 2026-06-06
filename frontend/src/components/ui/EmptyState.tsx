import type { ReactNode } from 'react'

export function EmptyState({
  title,
  description,
}: {
  icon?: ReactNode
  title: string
  description: string
}) {
  return (
    <div className="py-12 text-center">
      <p className="font-medium text-app-text">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-app-muted">{description}</p>
    </div>
  )
}
