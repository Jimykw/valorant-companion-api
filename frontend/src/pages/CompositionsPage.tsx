import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus, Trash2 } from 'lucide-react'
import { compositionsApi, valorantApi } from '../api/services'
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
import type { Agent, CompositionAgent } from '../types/api'

export function CompositionsPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [mapUuid, setMapUuid] = useState('')
  const [selectedAgents, setSelectedAgents] = useState<(Agent | null)[]>(Array(5).fill(null))
  const [formError, setFormError] = useState('')

  const compositions = useQuery({
    queryKey: ['compositions'],
    queryFn: () => compositionsApi.list(),
    enabled: isAuthenticated,
  })
  const agents = useQuery({ queryKey: ['agents'], queryFn: valorantApi.agents })
  const maps = useQuery({ queryKey: ['maps'], queryFn: valorantApi.maps })

  const create = useMutation({
    mutationFn: compositionsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compositions'] })
      resetForm()
      setShowForm(false)
    },
    onError: (e) => setFormError(getErrorMessage(e)),
  })

  const remove = useMutation({
    mutationFn: compositionsApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['compositions'] }),
  })

  const resetForm = () => {
    setName('')
    setDescription('')
    setMapUuid('')
    setSelectedAgents(Array(5).fill(null))
    setFormError('')
  }

  const agentName = (uuid: string) =>
    agents.data?.find((a) => a.uuid === uuid)?.displayName ?? uuid.slice(0, 8)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    if (selectedAgents.some((a) => !a)) {
      setFormError('Selecione 5 agentes.')
      return
    }
    create.mutate({
      name,
      description: description || undefined,
      mapUuid: mapUuid || undefined,
      agents: selectedAgents.map((a, i) => ({
        agentUuid: a!.uuid,
        slotOrder: i + 1,
        suggestedRole: a!.role ?? null,
      })) as CompositionAgent[],
    })
  }

  const pickAgent = (slot: number, agentUuid: string) => {
    const agent = agents.data?.find((a) => a.uuid === agentUuid) ?? null
    setSelectedAgents((prev) => {
      const next = [...prev]
      next[slot] = agent
      return next
    })
  }

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
        <PageHeader title="Composições" />
        <PageContent>
          <LoginPrompt />
        </PageContent>
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="Composições"
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <Input label="Nome" required value={name} onChange={(e) => setName(e.target.value)} />
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
                label="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="grid gap-2 sm:grid-cols-5">
                {selectedAgents.map((slot, index) => (
                  <label key={index} className="flex flex-col gap-1">
                    <span className="text-xs text-app-muted">{index + 1}</span>
                    <select
                      required
                      value={slot?.uuid ?? ''}
                      onChange={(e) => pickAgent(index, e.target.value)}
                      className={selectClass}
                    >
                      <option value="">—</option>
                      {agents.data?.map((a) => (
                        <option
                          key={a.uuid}
                          value={a.uuid}
                          disabled={selectedAgents.some((s, i) => i !== index && s?.uuid === a.uuid)}
                        >
                          {a.displayName}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
              {formError && <p className="text-sm text-red-400">{formError}</p>}
              <div className="flex gap-2">
                <Button type="submit" loading={create.isPending}>
                  Salvar
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    resetForm()
                    setShowForm(false)
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        {compositions.isLoading && (
          <div className="py-16">
            <Spinner />
          </div>
        )}

        {compositions.data?.content.length === 0 && !showForm && (
          <EmptyState title="Nenhuma composição" description="Crie um time com 5 agentes." />
        )}

        <ul className="space-y-3">
          {compositions.data?.content.map((comp) => (
            <Card key={comp.id} className="!p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{comp.name}</p>
                  {comp.description && (
                    <p className="mt-0.5 text-sm text-app-muted">{comp.description}</p>
                  )}
                  <p className="mt-2 text-xs text-app-muted">
                    {comp.agents
                      .sort((a, b) => a.slotOrder - b.slotOrder)
                      .map((a) => agentName(a.agentUuid))
                      .join(' · ')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => remove.mutate(comp.id)}
                  className="p-1 text-app-muted hover:text-app-text"
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
