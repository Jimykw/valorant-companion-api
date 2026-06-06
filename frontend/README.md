# Valorant Companion — Frontend

Interface web em **React 19 + TypeScript + Vite + Tailwind CSS** para a API Spring Boot.

## Stack

- React Router — rotas e layout autenticado
- TanStack Query — cache e mutations
- Proxy Vite — `/api` → `http://localhost:8080` (sem CORS em dev)

## Rodar

**Terminal 1 — API (perfil dev):**

```powershell
cd ..
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=dev"
```

**Terminal 2 — Frontend:**

```powershell
cd frontend
npm install
npm run dev
```

Abra **http://localhost:5173** — menu **Docs** para referência da API.

## Estrutura (front)

```
src/
├── docs/           # Referência da API (dados + tipos)
├── api/            # Cliente HTTP
├── components/     # UI reutilizável
├── pages/          # Rotas
└── config/         # Navegação
```

## Build produção

```bash
npm run build
```

Configure `VITE_API_BASE_URL` apontando para a API em produção.
