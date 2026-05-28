# Frontend

## Setup

```bash
cd frontend
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # producción → dist/
pnpm preview    # previsualizar build
```

## Componentes

### `router.js`
Router SPA con History API. Registra rutas con `addRoute(pattern, handler)` y las resuelve contra `location.pathname`.

| Ruta | Handler | Params |
|------|---------|--------|
| `/characters` | `renderCharactersPage` | — (página 1) |
| `/characters/page/:page` | `renderCharactersPage` | `page` (número) |
| `/character/:id` | inline | `id` (número) |

### `pages/charactersPage.js`
Orquesta grid, paginación y fetch. Recibe `page` inicial del router y actualiza la URL via `history.replaceState` al cambiar de página.

### `components/grid.js`
Grid responsive con `auto-fill` y `minmax(230px, 1fr)`. Modos: `loading`, `error`, vacío y con items.

### `components/pagination.js`
Botones Anterior/Siguiente con estado disabled. Muestra "Page X of Y".

### `components/character-card.js`
Card con imagen, nombre y botones admin condicionales. Click navega a `/character/:id`.

### `services/rickmorty.js`
`getCharacters(page)` → fetch a `/api/character?page=N` (proxy Vite → Rick & Morty API).

## Estilos

Tailwind CSS v4 con variables CSS personalizadas. Tema oscuro basado en Rick & Morty.

```css
--rm-bg-primary:    #0A1128;
--rm-accent-portal: #39FF8A;
--rm-accent-plasma: #00C2FF;
--rm-alive:         #39FF8A;
--rm-dead:          #E84E4E;
```

## Vite proxy

```js
server: {
  proxy: {
    '/api': {
      target: 'https://rickandmortyapi.com',
      changeOrigin: true
    }
  }
}
```
