import { apiRequest } from '../lib/api'
import type {
  Agent,
  AuthResponse,
  Composition,
  CompositionRequest,
  Favorite,
  FavoriteRequest,
  Gamemode,
  LoginRequest,
  MapItem,
  RegisterRequest,
  SpringPage,
  StrategicNote,
  StrategicNoteRequest,
  User,
  Weapon,
} from '../types/api'

export const authApi = {
  register: (data: RegisterRequest) =>
    apiRequest<User>('/api/v1/auth/register', { method: 'POST', body: data }),
  login: (data: LoginRequest) =>
    apiRequest<AuthResponse>('/api/v1/auth/login', { method: 'POST', body: data }),
}

export const userApi = {
  me: () => apiRequest<User>('/api/v1/users/me', { auth: true }),
  updateProfile: (data: { username?: string; email?: string }) =>
    apiRequest<User>('/api/v1/users/me', { method: 'PUT', body: data, auth: true }),
}

export const valorantApi = {
  agents: () => apiRequest<Agent[]>('/api/v1/valorant/agents'),
  agent: (uuid: string) => apiRequest<Agent>(`/api/v1/valorant/agents/${uuid}`),
  maps: () => apiRequest<MapItem[]>('/api/v1/valorant/maps'),
  weapons: () => apiRequest<Weapon[]>('/api/v1/valorant/weapons'),
  gamemodes: () => apiRequest<Gamemode[]>('/api/v1/valorant/gamemodes'),
}

export const favoritesApi = {
  list: (page = 0, size = 50) =>
    apiRequest<SpringPage<Favorite>>(`/api/v1/favorites?page=${page}&size=${size}`, {
      auth: true,
    }),
  create: (data: FavoriteRequest) =>
    apiRequest<Favorite>('/api/v1/favorites', { method: 'POST', body: data, auth: true }),
  remove: (id: string) =>
    apiRequest<void>(`/api/v1/favorites/${id}`, { method: 'DELETE', auth: true }),
}

export const compositionsApi = {
  list: (page = 0, size = 20) =>
    apiRequest<SpringPage<Composition>>(`/api/v1/compositions?page=${page}&size=${size}`, {
      auth: true,
    }),
  get: (id: string) => apiRequest<Composition>(`/api/v1/compositions/${id}`, { auth: true }),
  create: (data: CompositionRequest) =>
    apiRequest<Composition>('/api/v1/compositions', { method: 'POST', body: data, auth: true }),
  update: (id: string, data: CompositionRequest) =>
    apiRequest<Composition>(`/api/v1/compositions/${id}`, {
      method: 'PUT',
      body: data,
      auth: true,
    }),
  remove: (id: string) =>
    apiRequest<void>(`/api/v1/compositions/${id}`, { method: 'DELETE', auth: true }),
}

export const notesApi = {
  list: (page = 0, size = 20) =>
    apiRequest<SpringPage<StrategicNote>>(`/api/v1/notes?page=${page}&size=${size}`, {
      auth: true,
    }),
  create: (data: StrategicNoteRequest) =>
    apiRequest<StrategicNote>('/api/v1/notes', { method: 'POST', body: data, auth: true }),
  update: (id: string, data: StrategicNoteRequest) =>
    apiRequest<StrategicNote>(`/api/v1/notes/${id}`, { method: 'PUT', body: data, auth: true }),
  remove: (id: string) =>
    apiRequest<void>(`/api/v1/notes/${id}`, { method: 'DELETE', auth: true }),
}
