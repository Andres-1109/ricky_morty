# Rick & Morty App

SPA que consume la [Rick & Morty API](https://rickandmortyapi.com) con paginación, roles de administrador, edición local persistida y hash routing.

## Tecnologías

- **Vite** 8.x
- **Tailwind CSS** 4.x
- **Vanilla JS** (ES modules)

## Cómo ejecutar

### Backend (json-server)

```bash
npx json-server backend/db.json --watch --port 3001
# http://localhost:3001/users
```

### Frontend

```bash
cd frontend
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # producción → dist/
pnpm preview    # previsualizar build
```

## Documentación

- [Arquitectura](./docs/architecture.md)
- [Frontend](./docs/frontend.md)
- [API](./docs/api.md)

## Contribuidores

- Andres Giraldo
- Daniel Jaraba
- Erick Demoya
- Jose Romero
