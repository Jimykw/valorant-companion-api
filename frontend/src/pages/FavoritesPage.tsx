import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { favoritesApi } from '../api/services'
import { LoginPrompt } from '../components/auth/LoginPrompt'
import { PageContent } from '../components/layout/PageContent'
import { PageHeader } from '../components/layout/PageHeader'
import { EmptyState } from '../components/ui/EmptyState'
import { Spinner } from '../components/ui/Spinner'
import { useAuth } from '../contexts/AuthContext'
import type { FavoriteItemType } from '../types/api'

const typeLabels: Record<FavoriteItemType, string> = {
  AGENT: 'Agente',
  MAP: 'Mapa',
  WEAPON: 'Arma',
}

export function FavoritesPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => favoritesApi.list(0, 100),
    enabled: isAuthenticated,
  })

  const remove = useMutation({
    mutationFn: (id: string) => favoritesApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  })

  if (authLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <>
        <PageHeader title="Favoritos" />
        <PageContent>
          <LoginPrompt />
        </PageContent>
      </>
    )
  }

  return (
    <>
      <PageHeader title="Favoritos" />
      <PageContent>
        {isLoading && (
          <div className="py-16">
            <Spinner />
          </div>
        )}

        {data && data.content.length === 0 && (
          <EmptyState title="Lista vazia" description="Adicione favoritos pelo catálogo." />
        )}

        <ul className="divide-y divide-app-border rounded border border-app-border bg-app-surface">
          {data?.content.map((fav) => (
            <li key={fav.id} className="flex items-center justify-between px-3 py-2">
              <div>
                <p className="text-sm font-medium">{fav.displayName ?? fav.externalId}</p>
                <p className="text-xs text-app-muted">
                  {typeLabels[fav.itemType]} · {new Date(fav.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => remove.mutate(fav.id)}
                disabled={remove.isPending}
                className="p-1.5 text-app-muted hover:text-app-text"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      </PageContent>
    </>
  )
}
