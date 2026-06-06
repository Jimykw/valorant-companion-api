import type { DocNavGroup, DocSection } from './types'

const BASE = '/api/v1'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

export const docsIntro = {
  title: 'API Valorant Companion',
  description:
    'API REST em Java/Spring Boot. Consulta dados do jogo via Valorant-API pública e persiste favoritos, composições e notas por usuário.',
  stack: ['Java 17', 'Spring Boot 3', 'PostgreSQL', 'JWT', 'Flyway'],
  swaggerUrl: `${API_BASE_URL}/swagger-ui.html`,
}

export const docSections: DocSection[] = [
  {
    id: 'health',
    title: 'Disponibilidade',
    endpoints: [
      {
        id: 'health-check',
        method: 'GET',
        path: `${BASE}/health`,
        title: 'Verificar status',
        description: 'Indica se a aplicação está respondendo.',
        responses: [{ status: 200, description: 'Aplicação disponível' }],
      },
    ],
  },
  {
    id: 'auth',
    title: 'Autenticação',
    endpoints: [
      {
        id: 'auth-register',
        method: 'POST',
        path: `${BASE}/auth/register`,
        title: 'Registrar usuário',
        description: 'Cria uma conta. Retorna dados públicos do usuário (sem senha).',
        bodyExample: JSON.stringify(
          { username: 'jett_main', email: 'jett@example.com', password: 'senha123' },
          null,
          2,
        ),
        responses: [
          { status: 201, description: 'Usuário criado' },
          { status: 400, description: 'Validação ou e-mail/usuário duplicado' },
        ],
      },
      {
        id: 'auth-login',
        method: 'POST',
        path: `${BASE}/auth/login`,
        title: 'Entrar',
        description: 'Autentica com e-mail e senha. Retorna JWT para rotas protegidas.',
        bodyExample: JSON.stringify(
          { email: 'jett@example.com', password: 'senha123' },
          null,
          2,
        ),
        responses: [
          { status: 200, description: 'Token JWT retornado' },
          { status: 401, description: 'Credenciais inválidas' },
        ],
        note: 'Envie o token no cabeçalho: Authorization: Bearer <accessToken>',
      },
    ],
  },
  {
    id: 'users',
    title: 'Usuários',
    endpoints: [
      {
        id: 'users-me-get',
        method: 'GET',
        path: `${BASE}/users/me`,
        title: 'Perfil',
        description: 'Retorna o usuário autenticado.',
        auth: true,
        responses: [
          { status: 200, description: 'Perfil do usuário' },
          { status: 401, description: 'Não autenticado' },
        ],
      },
      {
        id: 'users-me-put',
        method: 'PUT',
        path: `${BASE}/users/me`,
        title: 'Atualizar perfil',
        description: 'Atualiza nome de usuário e/ou e-mail.',
        auth: true,
        bodyExample: JSON.stringify({ username: 'novo_nick', email: 'novo@email.com' }, null, 2),
        responses: [
          { status: 200, description: 'Perfil atualizado' },
          { status: 400, description: 'Validação ou conflito' },
        ],
      },
    ],
  },
  {
    id: 'valorant',
    title: 'Dados do jogo',
    endpoints: [
      {
        id: 'valorant-agents',
        method: 'GET',
        path: `${BASE}/valorant/agents`,
        title: 'Listar agentes',
        description: 'Agentes jogáveis. Origem: valorant-api.com.',
        responses: [{ status: 200, description: 'Lista de agentes' }],
      },
      {
        id: 'valorant-agent',
        method: 'GET',
        path: `${BASE}/valorant/agents/{uuid}`,
        title: 'Agente por UUID',
        description: 'Detalhes de um agente.',
        params: [{ name: 'uuid', type: 'string', description: 'UUID do agente', required: true }],
        responses: [
          { status: 200, description: 'Agente encontrado' },
          { status: 404, description: 'Não encontrado' },
        ],
      },
      {
        id: 'valorant-maps',
        method: 'GET',
        path: `${BASE}/valorant/maps`,
        title: 'Listar mapas',
        description: 'Todos os mapas disponíveis.',
        responses: [{ status: 200, description: 'Lista de mapas' }],
      },
      {
        id: 'valorant-weapons',
        method: 'GET',
        path: `${BASE}/valorant/weapons`,
        title: 'Listar armas',
        description: 'Todas as armas.',
        responses: [{ status: 200, description: 'Lista de armas' }],
      },
      {
        id: 'valorant-gamemodes',
        method: 'GET',
        path: `${BASE}/valorant/gamemodes`,
        title: 'Listar modos',
        description: 'Modos de jogo.',
        responses: [{ status: 200, description: 'Lista de modos' }],
      },
    ],
  },
  {
    id: 'favorites',
    title: 'Favoritos',
    endpoints: [
      {
        id: 'favorites-list',
        method: 'GET',
        path: `${BASE}/favorites`,
        title: 'Listar favoritos',
        description: 'Resultado paginado.',
        auth: true,
        params: [
          { name: 'page', type: 'int', description: 'Número da página (inicia em 0)', defaultValue: '0' },
          { name: 'size', type: 'int', description: 'Itens por página', defaultValue: '20' },
        ],
        responses: [{ status: 200, description: 'Lista paginada de favoritos' }],
      },
      {
        id: 'favorites-create',
        method: 'POST',
        path: `${BASE}/favorites`,
        title: 'Adicionar favorito',
        auth: true,
        bodyExample: JSON.stringify(
          { externalId: 'uuid-do-item', itemType: 'AGENT', displayName: 'Jett' },
          null,
          2,
        ),
        responses: [
          { status: 201, description: 'Favorito criado' },
          { status: 400, description: 'Já existe ou erro de validação' },
        ],
        note: 'itemType aceito: AGENT | MAP | WEAPON',
      },
      {
        id: 'favorites-delete',
        method: 'DELETE',
        path: `${BASE}/favorites/{id}`,
        title: 'Remover favorito',
        auth: true,
        params: [{ name: 'id', type: 'uuid', description: 'ID do favorito', required: true }],
        responses: [
          { status: 204, description: 'Removido com sucesso' },
          { status: 404, description: 'Não encontrado' },
        ],
      },
    ],
  },
  {
    id: 'compositions',
    title: 'Composições',
    endpoints: [
      {
        id: 'compositions-list',
        method: 'GET',
        path: `${BASE}/compositions`,
        title: 'Listar composições',
        auth: true,
        responses: [{ status: 200, description: 'Lista paginada de composições' }],
      },
      {
        id: 'compositions-create',
        method: 'POST',
        path: `${BASE}/compositions`,
        title: 'Criar composição',
        description: 'Exige exatamente 5 agentes com slotOrder de 1 a 5.',
        auth: true,
        bodyExample: JSON.stringify(
          {
            name: 'Execução Ascent',
            mapUuid: '7eaecc1b-4337-bbf6-6ab9-04b8f06b3319',
            description: 'Entrada no site A',
            agents: [
              { agentUuid: '...', slotOrder: 1, suggestedRole: 'Iniciador' },
              { agentUuid: '...', slotOrder: 2, suggestedRole: null },
              { agentUuid: '...', slotOrder: 3, suggestedRole: null },
              { agentUuid: '...', slotOrder: 4, suggestedRole: null },
              { agentUuid: '...', slotOrder: 5, suggestedRole: null },
            ],
          },
          null,
          2,
        ),
        responses: [
          { status: 201, description: 'Composição criada' },
          { status: 400, description: 'Validação (5 agentes, slots únicos)' },
        ],
      },
      {
        id: 'compositions-update',
        method: 'PUT',
        path: `${BASE}/compositions/{id}`,
        title: 'Atualizar composição',
        auth: true,
        responses: [
          { status: 200, description: 'Composição atualizada' },
          { status: 404, description: 'Não encontrada ou de outro usuário' },
        ],
      },
      {
        id: 'compositions-delete',
        method: 'DELETE',
        path: `${BASE}/compositions/{id}`,
        title: 'Excluir composição',
        auth: true,
        responses: [{ status: 204, description: 'Composição removida' }],
      },
    ],
  },
  {
    id: 'notes',
    title: 'Notas',
    endpoints: [
      {
        id: 'notes-list',
        method: 'GET',
        path: `${BASE}/notes`,
        title: 'Listar notas',
        auth: true,
        responses: [{ status: 200, description: 'Lista paginada de notas' }],
      },
      {
        id: 'notes-create',
        method: 'POST',
        path: `${BASE}/notes`,
        title: 'Criar nota',
        auth: true,
        bodyExample: JSON.stringify(
          {
            title: 'Execução B Bind',
            mapUuid: '2c9d57b4-4431-b6c3-7eaecc1b4337',
            content: 'Fumaça no A main...',
            relatedAgentUuids: [],
          },
          null,
          2,
        ),
        responses: [{ status: 201, description: 'Nota criada' }],
      },
      {
        id: 'notes-update',
        method: 'PUT',
        path: `${BASE}/notes/{id}`,
        title: 'Atualizar nota',
        auth: true,
        responses: [{ status: 200, description: 'Nota atualizada' }],
      },
      {
        id: 'notes-delete',
        method: 'DELETE',
        path: `${BASE}/notes/{id}`,
        title: 'Excluir nota',
        auth: true,
        responses: [{ status: 204, description: 'Nota removida' }],
      },
    ],
  },
]

export const docNavGroups: DocNavGroup[] = [
  { title: 'Geral', sectionIds: ['health', 'auth', 'users'] },
  { title: 'Recursos', sectionIds: ['valorant', 'favorites', 'compositions', 'notes'] },
]

export function getDefaultSelection(): { sectionId: string; endpointId: string } {
  const first = docSections[0]
  return { sectionId: first.id, endpointId: first.endpoints[0].id }
}
