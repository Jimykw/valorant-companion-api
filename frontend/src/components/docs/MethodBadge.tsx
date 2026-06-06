import type { HttpMethod } from '../../docs/types'

const styles: Record<HttpMethod, string> = {
  GET: 'bg-emerald-950 text-emerald-400 border-emerald-800',
  POST: 'bg-blue-950 text-blue-400 border-blue-800',
  PUT: 'bg-amber-950 text-amber-400 border-amber-800',
  DELETE: 'bg-red-950 text-red-400 border-red-800',
}

export function MethodBadge({ method }: { method: HttpMethod }) {
  return (
    <span
      className={`inline-block rounded border px-2 py-0.5 font-mono text-xs font-medium ${styles[method]}`}
    >
      {method}
    </span>
  )
}
