export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface DocParam {
  name: string
  type: string
  description: string
  required?: boolean
  defaultValue?: string
}

export interface DocResponse {
  status: number
  description: string
}

export interface DocEndpoint {
  id: string
  method: HttpMethod
  path: string
  title: string
  description?: string
  auth?: boolean
  params?: DocParam[]
  bodyExample?: string
  responses: DocResponse[]
  note?: string
}

export interface DocSection {
  id: string
  title: string
  endpoints: DocEndpoint[]
}

export interface DocNavGroup {
  title: string
  sectionIds: string[]
}
