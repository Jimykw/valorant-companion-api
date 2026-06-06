import type { ReactNode } from 'react'

export function PageContent({ children }: { children: ReactNode }) {
  return <div className="scrollbar-thin flex-1 overflow-y-auto px-6 py-4">{children}</div>
}
