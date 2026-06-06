export type Role = 'USER' | 'ADMIN'

export type FavoriteItemType = 'AGENT' | 'MAP' | 'WEAPON'

export interface User {
  id: string
  username: string
  email: string
  role: Role
  createdAt: string
}

export interface AuthResponse {
  accessToken: string
  tokenType: string
  expiresIn: number
}

export interface Agent {
  uuid: string
  displayName: string
  description: string
  displayIcon: string
  role: string
}

export interface MapItem {
  uuid: string
  displayName: string
  narrativeDescription: string
  splash: string
  displayIcon: string
}

export interface Weapon {
  uuid: string
  displayName: string
  category: string
  displayIcon: string
  weaponType: string
  fireRate: number | null
  magazineSize: number | null
}

export interface Gamemode {
  uuid: string
  displayName: string
  description: string
  displayIcon: string
  isQueue: boolean
}

export interface Favorite {
  id: string
  externalId: string
  itemType: FavoriteItemType
  displayName: string
  createdAt: string
}

export interface CompositionAgent {
  agentUuid: string
  slotOrder: number
  suggestedRole: string | null
}

export interface Composition {
  id: string
  name: string
  mapUuid: string | null
  description: string | null
  agents: CompositionAgent[]
  createdAt: string
  updatedAt: string
}

export interface StrategicNote {
  id: string
  title: string
  mapUuid: string | null
  content: string
  relatedAgentUuids: string[]
  createdAt: string
  updatedAt: string
}

export interface SpringPage<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}

export interface ApiErrorBody {
  timestamp: string
  status: number
  error: string
  message: string
  path: string
  fieldErrors?: Record<string, string>
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface FavoriteRequest {
  externalId: string
  itemType: FavoriteItemType
  displayName?: string
}

export interface CompositionRequest {
  name: string
  mapUuid?: string
  description?: string
  agents: CompositionAgent[]
}

export interface StrategicNoteRequest {
  title: string
  mapUuid?: string
  content: string
  relatedAgentUuids?: string[]
}
