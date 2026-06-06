import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card } from '../components/ui/Card'
import { useAuth } from '../contexts/AuthContext'
import { getErrorMessage } from '../lib/errors'

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/app/catalog'

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register({ username, email, password })
      navigate(from, { replace: true })
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-app-bg p-4">
      <Card className="w-full max-w-sm">
        <h1 className="text-lg font-medium">Cadastro</h1>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <Input
            label="Usuário"
            required
            minLength={3}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="E-mail"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button type="submit" loading={loading} className="w-full">
            Cadastrar
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-app-muted">
          <Link to="/login" state={{ from }} className="text-app-text hover:underline">
            Já tenho conta
          </Link>
          {' · '}
          <Link to="/app/catalog" className="hover:underline">
            Pular
          </Link>
        </p>
      </Card>
    </div>
  )
}
