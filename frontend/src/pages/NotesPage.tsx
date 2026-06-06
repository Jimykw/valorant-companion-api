import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus, Trash2 } from 'lucide-react'
import { notesApi, valorantApi } from '../api/services'
import { LoginPrompt } from '../components/auth/LoginPrompt'
import { PageContent } from '../components/layout/PageContent'
import { PageHeader } from '../components/layout/PageHeader'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { Input } from '../components/ui/Input'
import { selectClass } from '../components/ui/SelectField'
import { Spinner } from '../components/ui/Spinner'
import { Textarea } from '../components/ui/Textarea'
import { getErrorMessage } from '../lib/errors'
import { useAuth } from '../contexts/AuthContext'

export function NotesPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mapUuid, setMapUuid] = useState('')
  const [formError, setFormError] = useState('')

  const notes = useQuery({
    queryKey: ['notes'],
    queryFn: () => notesApi.list(),
    enabled: isAuthenticated,
  })
  const maps = useQuery({ queryKey: ['maps'], queryFn: valorantApi.maps })

  const create = useMutation({
    mutationFn: notesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      setTitle('')
      setContent('')
      setMapUuid('')
      setShowForm(false)
    },
    onError: (e) => setFormError(getErrorMessage(e)),
  })

  const remove = useMutation({
    mutationFn: notesApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  })

  const mapName = (uuid: string | null) =>
    maps.data?.find((m) => m.uuid === uuid)?.displayName ?? null

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
        <PageHeader title="Notas" />
        <PageContent>
          <LoginPrompt />
        </PageContent>
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="Notas"
        action={
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus size={16} />
            Nova
          </Button>
        }
      />
      <PageContent>
        {showForm && (
          <Card className="mb-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setFormError('')
                create.mutate({ title, content, mapUuid: mapUuid || undefined })
              }}
              className="flex flex-col gap-3"
            >
              <Input label="Título" required value={title} onChange={(e) => setTitle(e.target.value)} />
              <label className="flex flex-col gap-1">
                <span className="text-sm text-app-muted">Mapa</span>
                <select value={mapUuid} onChange={(e) => setMapUuid(e.target.value)} className={selectClass}>
                  <option value="">Nenhum</option>
                  {maps.data?.map((m) => (
                    <option key={m.uuid} value={m.uuid}>
                      {m.displayName}
                    </option>
                  ))}
                </select>
              </label>
              <Textarea
                label="Texto"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
              />
              {formError && <p className="text-sm text-red-400">{formError}</p>}
              <div className="flex gap-2">
                <Button type="submit" loading={create.isPending}>
                  Salvar
                </Button>
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        {notes.isLoading && (
          <div className="py-16">
            <Spinner />
          </div>
        )}

        {notes.data?.content.length === 0 && !showForm && (
          <EmptyState title="Nenhuma nota" description="Adicione uma nota acima." />
        )}

        <ul className="space-y-3">
          {notes.data?.content.map((note) => (
            <Card key={note.id} className="!p-3">
              <div className="flex justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium">{note.title}</p>
                  {note.mapUuid && (
                    <p className="text-xs text-app-muted">{mapName(note.mapUuid)}</p>
                  )}
                  <p className="mt-2 whitespace-pre-wrap text-sm text-app-muted">{note.content}</p>
                  <p className="mt-2 text-xs text-app-muted">
                    {new Date(note.updatedAt).toLocaleString('pt-BR')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => remove.mutate(note.id)}
                  className="h-fit p-1 text-app-muted hover:text-app-text"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </Card>
          ))}
        </ul>
      </PageContent>
    </>
  )
}
