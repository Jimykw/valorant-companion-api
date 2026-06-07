import type { ApiErrorBody } from '../types/api'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''
const TOKEN_KEY = 'vc_access_token'
const REQUEST_TIMEOUT_MS = 90_000

export class ApiError extends Error {
  status: number
  body?: ApiErrorBody

  constructor(message: string, status: number, body?: ApiErrorBody) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

type RequestOptions = {
  method?: string
  body?: unknown
  auth?: boolean
  signal?: AbortSignal
}

export async function apiRequest<T>(
  path: string,
  { method = 'GET', body, auth = false, signal }: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  }

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
  }

  if (auth) {
    const token = getToken()
    if (!token) {
      throw new ApiError('Sessão expirada. Faça login novamente.', 401)
    }
    headers.Authorization = `Bearer ${token}`
  }

  const timeoutController = new AbortController()
  const timeoutId = setTimeout(() => timeoutController.abort(), REQUEST_TIMEOUT_MS)

  if (signal) {
    signal.addEventListener('abort', () => timeoutController.abort(), { once: true })
  }

  let response: Response
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: timeoutController.signal,
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError(
        'A API demorou para responder. No plano gratuito do Render, a primeira requisição pode levar até 1 minuto. Tente novamente.',
        0,
      )
    }
    throw new ApiError('Não foi possível conectar à API. Verifique sua conexão e tente novamente.', 0)
  } finally {
    clearTimeout(timeoutId)
  }

  if (response.status === 204) {
    return undefined as T
  }

  const text = await response.text()
  let data: unknown = null
  if (text) {
    try {
      data = JSON.parse(text) as unknown
    } catch {
      throw new ApiError(
        'Resposta inválida da API. Se o deploy acabou de ser feito, aguarde alguns minutos e recarregue.',
        response.status,
      )
    }
  }

  if (!response.ok) {
    const errBody = data as ApiErrorBody | null
    throw new ApiError(
      errBody?.message ?? `Erro ${response.status}`,
      response.status,
      errBody ?? undefined,
    )
  }

  return data as T
}
