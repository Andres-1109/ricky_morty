# Frontend

## Setup

```bash
cd frontend
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # producción → dist/
pnpm preview    # previsualizar build
```

## Router (`src/router.js`)

Router SPA con History API. Registra rutas con `addRoute(pattern, handler)` y las resuelve contra `location.pathname`. Soporta parámetros `:id` y `:page` en los patrones (se convierten a regex con `\d+`).

## Pages

### `pages/charactersPage.js`

Renderiza personajes en un **grid de cards** con imagen, nombre y botones admin.

- Usa: `createGrid`, `createItemCard` (componentes grid + card)
- Fetch: `getCharacters(page)` → `/api/character?page=N`

### `pages/locationsPage.js`

Renderiza ubicaciones en una **lista de rows** con nombre y botones admin.

- Usa: `createList`, `createRow` (componentes list + row genérico)
- Fetch: `getLocations(page)` → `/api/location?page=N`

### `pages/episodesPage.js`

Renderiza episodios en una **lista de rows** mostrando código del episodio (`S01E01`) y nombre.

- Usa: `createList`, `createRow` (componentes list + row genérico)
- Fetch: `getEpisodes(page)` → `/api/episode?page=N`

## Componentes

### `components/row.js`

`createRow(item, { isAdmin, onNavigate }, renderContent)`

Componente de fila genérico y reutilizable. Recibe una función `renderContent` (render prop) que cada página define para personalizar el contenido interno. Maneja los clicks en botones admin y la navegación.

### `components/card.js`

`createItemCard(item, { isAdmin, onNavigate })`

Card específica para personajes con imagen, nombre y botones admin. Click en la card navega al detalle.

### `components/grid.js`

Grid responsive con `auto-fill` y `minmax(230px, 1fr)`. Modos: con items, error y vacío.

### `components/list.js`

Lista vertical simple. Modos: con items, error y vacío.

### `components/pagination.js`

Botones Anterior/Siguiente con estado disabled. Muestra "Page X of Y". Soporta flag `isLoading` para deshabilitar durante fetch.

### `components/coming-soon.js`

Placeholder para páginas de detalle individual (`/character/:id`, `/location/:id`, `/episode/:id`). Muestra mensaje "coming soon" con link de vuelta.

## Servicios (`services/rickmorty.js`)

Tres funciones async que fetchean la Rick &amp; Morty API vía el proxy de Vite:

- `getCharacters(page)` → `/api/character`
- `getLocations(page)` → `/api/location`
- `getEpisodes(page)` → `/api/episode`

Todas devuelven `{ info: { pages, count, next, prev }, results: [] }`.

## Estilos

Tailwind CSS v4 con variables CSS personalizadas. Tema oscuro basado en Rick &amp; Morty.

```css
--rm-bg-primary:      #0A1128;   /* fondo principal */
--rm-bg-card:         #111D3A;   /* fondo de cards/rows */
--rm-accent-portal:   #39FF8A;   /* verde portal */
--rm-accent-plasma:   #00C2FF;   /* azul plasma */
--rm-accent-purple:   #7B4FE8;   /* código de episodio */
--rm-text-primary:    #C0F0D8;
--rm-text-muted:      #4A6A80;
--rm-alive:           #39FF8A;
--rm-dead:            #E84E4E;
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

