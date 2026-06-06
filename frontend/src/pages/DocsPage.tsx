import { useMemo, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import {
  docNavGroups,
  docSections,
  docsIntro,
  getDefaultSelection,
} from '../docs/apiReference'
import { EndpointDetail } from '../components/docs/EndpointDetail'
import { PageContent } from '../components/layout/PageContent'

export function DocsPage() {
  const defaultSel = getDefaultSelection()
  const [selected, setSelected] = useState(defaultSel)

  const activeEndpoint = useMemo(() => {
    const section = docSections.find((s) => s.id === selected.sectionId)
    return section?.endpoints.find((e) => e.id === selected.endpointId)
  }, [selected])

  return (
    <div className="flex min-h-0 flex-1">
      <aside className="w-52 shrink-0 overflow-y-auto border-r border-app-border bg-app-surface p-3 text-sm">
        <p className="mb-3 px-2 text-xs text-app-muted">Referência da API</p>

        {docNavGroups.map((group) => (
          <div key={group.title} className="mb-4">
            <p className="mb-1 px-2 text-xs font-medium text-app-muted">{group.title}</p>
            <ul className="space-y-0.5">
              {group.sectionIds.flatMap((sectionId) => {
                const section = docSections.find((s) => s.id === sectionId)
                if (!section) return []
                return section.endpoints.map((ep) => {
                  const isActive =
                    selected.sectionId === sectionId && selected.endpointId === ep.id
                  return (
                    <li key={ep.id}>
                      <button
                        type="button"
                        onClick={() =>
                          setSelected({ sectionId, endpointId: ep.id })
                        }
                        className={`w-full rounded px-2 py-1.5 text-left text-xs ${
                          isActive
                            ? 'bg-app-surface-hover font-medium text-app-text'
                            : 'text-app-muted hover:bg-app-surface-hover hover:text-app-text'
                        }`}
                      >
                        <span className="mr-1.5 font-mono opacity-70">{ep.method}</span>
                        {ep.title}
                      </button>
                    </li>
                  )
                })
              })}
            </ul>
          </div>
        ))}

        <a
          href={docsIntro.swaggerUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-2 flex items-center gap-1 px-2 text-xs text-app-muted hover:text-app-text"
        >
          Abrir Swagger
          <ExternalLink size={12} />
        </a>
      </aside>

      <PageContent>
        <div className="mb-8 max-w-2xl border-b border-app-border pb-6">
          <h1 className="text-xl font-medium">{docsIntro.title}</h1>
          <p className="mt-2 text-sm text-app-muted">{docsIntro.description}</p>
          <p className="mt-2 text-xs text-app-muted">
            {docsIntro.stack.join(' · ')}
          </p>
        </div>

        {activeEndpoint ? (
          <div className="max-w-3xl">
            <EndpointDetail endpoint={activeEndpoint} />
          </div>
        ) : (
          <p className="text-sm text-app-muted">Selecione um endpoint.</p>
        )}
      </PageContent>
    </div>
  )
}
