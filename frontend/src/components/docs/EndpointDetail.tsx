import type { DocEndpoint, DocResponse } from '../../docs/types'
import { API_BASE_URL } from '../../docs/apiReference'
import { CodeBlock } from './CodeBlock'
import { MethodBadge } from './MethodBadge'
import { ParamsTable } from './ParamsTable'

function ResponsesTable({ responses }: { responses: DocResponse[] }) {
  return (
    <ul className="space-y-1 text-sm">
      {responses.map((r) => (
        <li key={r.status} className="flex gap-3">
          <span className="w-10 shrink-0 font-mono text-app-muted">{r.status}</span>
          <span>{r.description}</span>
        </li>
      ))}
    </ul>
  )
}

export function EndpointDetail({ endpoint }: { endpoint: DocEndpoint }) {
  const fullUrl = `${API_BASE_URL}${endpoint.path}`

  return (
    <article className="space-y-4">
      <header className="flex flex-wrap items-center gap-3">
        <MethodBadge method={endpoint.method} />
        <h2 className="text-lg font-medium">{endpoint.title}</h2>
        {endpoint.auth && (
          <span className="rounded border border-app-border px-2 py-0.5 text-xs text-app-muted">
            Requer autenticação
          </span>
        )}
      </header>

      <p className="font-mono text-sm text-neutral-400">{fullUrl}</p>
      {endpoint.description && (
        <p className="text-sm text-app-muted">{endpoint.description}</p>
      )}

      {endpoint.note && (
        <p className="rounded border border-app-border bg-app-surface px-3 py-2 text-sm text-app-muted">
          {endpoint.note}
        </p>
      )}

      {endpoint.params && endpoint.params.length > 0 && (
        <section>
          <h3 className="mb-2 text-sm font-medium">Parâmetros</h3>
          <ParamsTable params={endpoint.params} />
        </section>
      )}

      {endpoint.bodyExample && (
        <section>
          <h3 className="mb-2 text-sm font-medium">Corpo (JSON)</h3>
          <CodeBlock code={endpoint.bodyExample} />
        </section>
      )}

      <section>
        <h3 className="mb-2 text-sm font-medium">Respostas</h3>
        <ResponsesTable responses={endpoint.responses} />
      </section>
    </article>
  )
}
