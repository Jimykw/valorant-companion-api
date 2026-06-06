# Valorant Companion API

API REST em **Java 17** e **Spring Boot 3** para consultar dados de Valorant (via [valorant-api.com](https://valorant-api.com/)) e organizar favoritos, composições de time e notas estratégicas por usuário.

> Projeto educacional/portfólio. **Não é afiliado à Riot Games.**

## Frontend (React)

Interface completa em `frontend/` — login, catálogo, favoritos, composições e notas.

```powershell
# Terminal 1: API
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=dev"

# Terminal 2: Front
cd frontend
npm install
npm run dev
```

App: **http://localhost:5173** · Docs: **http://localhost:5173/app/docs** · Swagger: **http://localhost:8080/swagger-ui.html**

## Demo online (portfólio)

| Serviço | URL |
|---------|-----|
| Frontend | https://valorant-companion.vercel.app |
| API | https://valorant-companion-api.onrender.com |
| Swagger | https://valorant-companion-api.onrender.com/swagger-ui.html |
| Repositório | https://github.com/Jimykw/valorant-companion-api |

> A API no Render (plano free) pode demorar ~1 min na primeira requisição após inatividade (cold start).

### Deploy

**API (Render)** — conecte o repositório em [render.com](https://render.com) → **New Blueprint** → selecione `render.yaml`.

**Frontend (Vercel)** — importe o repo em [vercel.com](https://vercel.com), root directory `frontend`, ou:

```powershell
cd frontend
npx vercel --prod
```

## Documentação

| Onde | URL |
|------|-----|
| Referência no front | http://localhost:5173/app/docs |
| Swagger (OpenAPI) | http://localhost:8080/swagger-ui.html |
| Código da referência | `frontend/src/docs/apiReference.ts` |

A referência no front é estática e pensada para portfólio; o Swagger reflete o contrato real gerado pelo SpringDoc.

## Funcionalidades

- Autenticação **JWT** (registro e login)
- Consulta de **agentes**, **mapas**, **armas** e **modos** (API pública)
- **Favoritos** por usuário (agente, mapa, arma ou modo)
- **Composições** de time (5 agentes + mapa opcional)
- **Notas estratégicas** com agentes relacionados
- **Swagger UI** e tratamento global de erros
- Migrações **Flyway** + **PostgreSQL**

## Stack

| Tecnologia | Uso |
|------------|-----|
| Spring Boot 3.3 | Web, JPA, Security, Validation |
| PostgreSQL 16 | Persistência |
| Flyway | Schema versionado |
| JWT (jjwt) | Autenticação stateless |
| SpringDoc OpenAPI | Documentação |
| RestClient | Integração Valorant-API |

## Arquitetura

```
controller → service → repository
                ↓
         ValorantApiClient (API externa)
```

Pacotes: `config`, `controller`, `service`, `repository`, `domain`, `dto`, `mapper`, `security`, `exception`.

## Pré-requisitos

- Java 17+
- Maven 3.9+
- Docker (opcional, para PostgreSQL)

## Como rodar

### Opção A — Sem Docker (mais simples no Windows)

Use o perfil **dev** (banco H2 em memória, nada para instalar além do Java):

```powershell
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=dev"
```

### Opção B — Com PostgreSQL (Docker)

```bash
docker compose up -d
.\mvnw.cmd spring-boot:run
```

> Se aparecer `docker não é reconhecido`, instale o [Docker Desktop](https://www.docker.com/products/docker-desktop/) ou use a **Opção A**.

### Variáveis de ambiente (só na Opção B)

Copie `.env.example` e ajuste se necessário. Valores padrão em `application.yml` já apontam para o Docker acima.

### 3. Subir a API

```bash
# Windows
.\mvnw.cmd spring-boot:run

# Linux/macOS
./mvnw spring-boot:run
```

- API: http://localhost:8080  
- Swagger: http://localhost:8080/swagger-ui.html  
- Health: http://localhost:8080/api/v1/health  

### 4. Testes

```bash
.\mvnw.cmd test
```

Usa H2 em memória (perfil `test`).

## Endpoints principais

| Método | Rota | Auth |
|--------|------|------|
| GET | `/api/v1/health` | Não |
| POST | `/api/v1/auth/register` | Não |
| POST | `/api/v1/auth/login` | Não |
| GET | `/api/v1/users/me` | JWT |
| PUT | `/api/v1/users/me` | JWT |
| GET | `/api/v1/valorant/agents` | Não |
| GET | `/api/v1/valorant/maps` | Não |
| GET | `/api/v1/valorant/weapons` | Não |
| GET | `/api/v1/valorant/gamemodes` | Não |
| GET/POST/DELETE | `/api/v1/favorites` | JWT |
| GET/POST/PUT/DELETE | `/api/v1/compositions` | JWT |
| GET/POST/PUT/DELETE | `/api/v1/notes` | JWT |

Header autenticado: `Authorization: Bearer <token>`

## Fluxo rápido no Swagger

1. `POST /api/v1/auth/register` — cadastre um usuário  
2. `POST /api/v1/auth/login` — copie o `accessToken`  
3. Clique em **Authorize** e cole: `Bearer <accessToken>`  
4. Teste `/api/v1/compositions`, `/api/v1/favorites`, `/api/v1/notes`

## Exemplo: criar composição

```json
POST /api/v1/compositions
{
  "name": "Exec Ascent",
  "mapUuid": "7eaecc1b-4337-bbf6-6ab9-04b8f06b3319",
  "description": "Rush A com smokes",
  "agents": [
    { "agentUuid": "...", "slotOrder": 1, "suggestedRole": "Initiator" },
    { "agentUuid": "...", "slotOrder": 2, "suggestedRole": "Controller" },
    { "agentUuid": "...", "slotOrder": 3, "suggestedRole": "Duelist" },
    { "agentUuid": "...", "slotOrder": 4, "suggestedRole": "Sentinel" },
    { "agentUuid": "...", "slotOrder": 5, "suggestedRole": "Duelist" }
  ]
}
```

Obtenha UUIDs de agentes em `GET /api/v1/valorant/agents`.

## Licença

MIT — veja [LICENSE](LICENSE).
