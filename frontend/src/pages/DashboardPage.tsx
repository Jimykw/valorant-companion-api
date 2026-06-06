import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { compositionsApi, favoritesApi, notesApi, valorantApi } from '../api/services'
import { PageContent } from '../components/layout/PageContent'
import { PageHeader } from '../components/layout/PageHeader'
import { Card } from '../components/ui/Card'
import { useAuth } from '../contexts/AuthContext'

export function DashboardPage() {
  const { user, isAuthenticated } = useAuth()

  const agents = useQuery({ queryKey: ['agents'], queryFn: valorantApi.agents })
  const favorites = useQuery({
    queryKey: ['favorites'],
    queryFn: () => favoritesApi.list(),
    enabled: isAuthenticated,
  })
  const compositions = useQuery({
    queryKey: ['compositions'],
    queryFn: () => compositionsApi.list(),
    enabled: isAuthenticated,
  })
  const notes = useQuery({
    queryKey: ['notes'],
    queryFn: () => notesApi.list(),
    enabled: isAuthenticated,
  })

  const rows = [
    { label: 'Agentes', value: agents.data?.length, to: '/app/catalog', loading: agents.isLoading },
    {
      label: 'Favoritos',
      value: isAuthenticated ? favorites.data?.totalElements : null,
      to: '/app/favorites',
    },
    {
      label: 'Composições',
      value: isAuthenticated ? compositions.data?.totalElements : null,
      to: '/app/compositions',
    },
    {
      label: 'Notas',
      value: isAuthenticated ? notes.data?.totalElements : null,
      to: '/app/notes',
    },
  ]

  return (
    <>
      <PageHeader
        title={user ? user.username : 'Início'}
        subtitle={
          isAuthenticated
            ? user?.email ?? ''
            : 'Catálogo aberto sem login'
        }
      />
      <PageContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {rows.map(({ label, value, to, loading }) => (
            <Link key={to} to={to}>
              <Card className="hover:bg-app-surface-hover">
                <p className="text-sm text-app-muted">{label}</p>
                <p className="mt-1 text-2xl tabular-nums">
                  {loading ? '…' : value ?? '—'}
                </p>
              </Card>
            </Link>
          ))}
        </div>

        {!isAuthenticated && (
          <p className="mt-4 text-sm text-app-muted">
            <Link to="/login" className="text-app-text hover:underline">
              Entrar
            </Link>{' '}
            para salvar favoritos e notas.
          </p>
        )}
      </PageContent>
    </>
  )
}
