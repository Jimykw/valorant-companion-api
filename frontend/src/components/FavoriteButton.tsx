import { Heart } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { favoritesApi } from '../api/services'
import { useAuth } from '../contexts/AuthContext'
import { getErrorMessage } from '../lib/errors'
import type { FavoriteItemType } from '../types/api'

interface FavoriteButtonProps {
  externalId: string
  itemType: FavoriteItemType
  displayName: string
}

export function FavoriteButton({ externalId, itemType, displayName }: FavoriteButtonProps) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const queryClient = useQueryClient()

  const { data: favoritesPage } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => favoritesApi.list(),
    enabled: isAuthenticated,
  })

  const existing = favoritesPage?.content.find(
    (f) => f.externalId === externalId && f.itemType === itemType,
  )

  const addMutation = useMutation({
    mutationFn: () => favoritesApi.create({ externalId, itemType, displayName }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  })

  const removeMutation = useMutation({
    mutationFn: (id: string) => favoritesApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  })

  const isPending = addMutation.isPending || removeMutation.isPending
  const isFav = !!existing
  const error = addMutation.error ?? removeMutation.error

  const handleClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/app/catalog' } })
      return
    }
    if (isFav && existing) {
      removeMutation.mutate(existing.id)
    } else {
      addMutation.mutate()
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        title={!isAuthenticated ? 'Entrar para favoritar' : isFav ? 'Remover' : 'Favoritar'}
        className={`rounded p-1.5 transition ${isFav ? 'text-app-text' : 'text-app-muted hover:text-app-text'}`}
      >
        <Heart size={16} strokeWidth={1.75} className={isFav ? 'fill-current' : ''} />
      </button>
      {error && <p className="text-[10px] text-red-400">{getErrorMessage(error)}</p>}
    </div>
  )
}
