import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

interface LoginPromptProps {
  title?: string
  description?: string
}

export function LoginPrompt({
  title = 'Conta necessária',
  description = 'Entre para salvar favoritos, composições e notas.',
}: LoginPromptProps) {
  const location = useLocation()
  const redirect = { from: location.pathname }

  return (
    <Card className="mx-auto max-w-sm text-center">
      <h3 className="font-medium">{title}</h3>
      <p className="mt-1 text-sm text-app-muted">{description}</p>
      <div className="mt-4 flex justify-center gap-2">
        <Link to="/login" state={redirect}>
          <Button>Entrar</Button>
        </Link>
        <Link to="/register" state={redirect}>
          <Button variant="secondary">Cadastro</Button>
        </Link>
      </div>
      <Link to="/app/catalog" className="mt-3 inline-block text-sm text-app-muted hover:underline">
        Ir ao catálogo
      </Link>
    </Card>
  )
}
