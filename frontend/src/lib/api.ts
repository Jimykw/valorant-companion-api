import type { ApiErrorBody } from '../types/api'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''
const TOKEN_KEY = 'vc_access_token'

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

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal,
  })

  if (response.status === 204) {
    return undefined as T
  }

  const text = await response.text()
  const data = text ? (JSON.parse(text) as unknown) : null

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
