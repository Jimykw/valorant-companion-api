import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { valorantApi } from '../api/services'
import { FavoriteButton } from '../components/FavoriteButton'
import { PageContent } from '../components/layout/PageContent'
import { PageHeader } from '../components/layout/PageHeader'
import { EmptyState } from '../components/ui/EmptyState'
import { Spinner } from '../components/ui/Spinner'
import { getAgentDescriptionPt } from '../lib/agentDescriptionsPt'
import { getErrorMessage } from '../lib/errors'
import { translateRole, translateWeaponCategory } from '../lib/labels'
import type { Agent, MapItem, Weapon } from '../types/api'

const queryOptions = {
  retry: 2,
  retryDelay: (attempt: number) => Math.min(5000 * attempt, 15000),
}

type Tab = 'agents' | 'maps' | 'weapons'

export function CatalogPage() {
  const [tab, setTab] = useState<Tab>('agents')
  const [search, setSearch] = useState('')

  const agents = useQuery({ queryKey: ['agents'], queryFn: valorantApi.agents, ...queryOptions })
  const maps = useQuery({ queryKey: ['maps'], queryFn: valorantApi.maps, ...queryOptions })
  const weapons = useQuery({ queryKey: ['weapons'], queryFn: valorantApi.weapons, ...queryOptions })

  const [slowLoad, setSlowLoad] = useState(false)

  const tabs: { id: Tab; label: string }[] = [
    { id: 'agents', label: 'Agentes' },
    { id: 'maps', label: 'Mapas' },
    { id: 'weapons', label: 'Armas' },
  ]

  const isLoading =
    (tab === 'agents' && agents.isLoading) ||
    (tab === 'maps' && maps.isLoading) ||
    (tab === 'weapons' && weapons.isLoading)

  useEffect(() => {
    if (!isLoading) {
      setSlowLoad(false)
      return
    }
    const timer = window.setTimeout(() => setSlowLoad(true), 8000)
    return () => window.clearTimeout(timer)
  }, [isLoading])

  const filter = <T extends { displayName: string }>(items: T[]) =>
    items.filter((i) => i.displayName.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <PageHeader
        title="Catálogo"
        subtitle="Agentes, mapas e armas"
      />
      <PageContent>
        <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-app-border pb-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`px-3 py-1.5 text-sm ${
                tab === t.id
                  ? 'border-b border-app-text font-medium text-app-text'
                  : 'text-app-muted hover:text-app-text'
              }`}
            >
              {t.label}
            </button>
          ))}
          <input
            type="search"
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-auto min-w-[180px] rounded border border-app-border bg-app-surface px-3 py-1.5 text-sm outline-none focus:border-neutral-500"
          />
        </div>

        {isLoading && (
          <div className="py-16 text-center">
            <Spinner />
            {slowLoad && (
              <p className="mx-auto mt-4 max-w-md text-sm text-app-muted">
                A API no Render (plano gratuito) pode demorar até 1 minuto para acordar na
                primeira visita. Aguarde ou recarregue a página.
              </p>
            )}
          </div>
        )}

        {tab === 'agents' && agents.isError && (
          <EmptyState
            title="Não foi possível carregar os agentes"
            description={getErrorMessage(agents.error)}
          />
        )}

        {tab === 'maps' && maps.isError && (
          <EmptyState
            title="Não foi possível carregar os mapas"
            description={getErrorMessage(maps.error)}
          />
        )}

        {tab === 'weapons' && weapons.isError && (
          <EmptyState
            title="Não foi possível carregar as armas"
            description={getErrorMessage(weapons.error)}
          />
        )}

        {tab === 'agents' && agents.data && (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filter(agents.data).map((agent: Agent) => (
              <li
                key={agent.uuid}
                className="flex gap-3 rounded border border-app-border bg-app-surface p-3"
              >
                {agent.displayIcon && (
                  <img
                    src={agent.displayIcon}
                    alt=""
                    className="h-12 w-12 shrink-0 object-contain"
                    loading="lazy"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-1">
                    <p className="font-medium">{agent.displayName}</p>
                    <FavoriteButton
                      externalId={agent.uuid}
                      itemType="AGENT"
                      displayName={agent.displayName}
                    />
                  </div>
                  {agent.role && (
                    <p className="text-xs text-app-muted">{translateRole(agent.role)}</p>
                  )}
                  <p className="mt-1 line-clamp-2 text-xs text-app-muted">
                    {getAgentDescriptionPt(agent.uuid, agent.description)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {tab === 'maps' && maps.data && (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filter(maps.data).map((map: MapItem) => (
              <li key={map.uuid} className="rounded border border-app-border bg-app-surface">
                {map.splash && (
                  <img
                    src={map.splash}
                    alt=""
                    className="h-28 w-full object-cover opacity-90"
                    loading="lazy"
                  />
                )}
                <div className="flex items-center justify-between p-3">
                  <p className="font-medium">{map.displayName}</p>
                  <FavoriteButton
                    externalId={map.uuid}
                    itemType="MAP"
                    displayName={map.displayName}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}

        {tab === 'weapons' && weapons.data && (
          <ul className="divide-y divide-app-border rounded border border-app-border bg-app-surface">
            {filter(weapons.data).map((w: Weapon) => (
              <li key={w.uuid} className="flex items-center gap-3 px-3 py-2.5">
                {w.displayIcon && (
                  <img
                    src={w.displayIcon}
                    alt=""
                    className="h-11 w-11 shrink-0 object-contain"
                    loading="lazy"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{w.displayName}</p>
                  <p className="text-xs text-app-muted">{translateWeaponCategory(w.category)}</p>
                </div>
                <FavoriteButton
                  externalId={w.uuid}
                  itemType="WEAPON"
                  displayName={w.displayName}
                />
              </li>
            ))}
          </ul>
        )}

        {!isLoading && tab === 'agents' && agents.data && filter(agents.data).length === 0 && (
          <EmptyState title="Nada encontrado" description="Tente outro termo." />
        )}
      </PageContent>
    </>
  )
}
