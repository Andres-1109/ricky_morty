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

Router SPA con History API. Registra rutas con `get(pattern, handler)` y las resuelve contra `location.pathname`. Soporta parámetros `:id` y `:page` en los patrones mediante segment matching.

## Page utility (`utils/page.js`)

`definePage(config)` — factory que retorna una función `page(container, page)`.

| config | Descripción |
|--------|-------------|
| `fetchData` | Función async `(page) => { info, results }` |
| `createLayout` | Función que retorna el elemento layout (grid/list) |
| `renderLayout` | Función que renderiza items en el layout |
| `renderItem` | Función que recibe `{ loadPage, container, getCurrentPage }` y retorna `(item) => Node` |
| `basePath` | Ruta base para `history.replaceState` (ej. `/characters`) |

Maneja loading, error, paginación y sincronización de URL automáticamente.

## Pages

### `pages/charactersPage.js`

Renderiza personajes en un **grid de cards** con imagen, nombre y botones admin. Incluye modal de edición.

- Usa: `createGrid`, `createCard`, `createModal`
- Fetch: `getCharacters(page)` → `/api/character?page=N`
- Creada con `definePage()`

### `pages/locationsPage.js`

Renderiza ubicaciones en una **lista de rows** con nombre y botones admin.

- Usa: `createList`, `createRow`
- Fetch: `getLocations(page)` → `/api/location?page=N`
- Creada con `definePage()`

### `pages/episodesPage.js`

Renderiza episodios en una **lista de rows** mostrando código del episodio (`S01E01`) y nombre.

- Usa: `createList`, `createRow`
- Fetch: `getEpisodes(page)` → `/api/episode?page=N`
- Creada con `definePage()`

## Componentes

### `components/row.js`

`createRow(item, { isAdmin, onNavigate, onEdit }, renderContent)`

Componente de fila genérico y reutilizable. Recibe una función `renderContent` (render prop) que cada página define para personalizar el contenido interno. Maneja los clicks en botones admin y la navegación.

### `components/card.js`

`createCard(item, { isAdmin, onNavigate, onEdit })`

Card específica para personajes con imagen, nombre y botones admin (Editar). Click en la card o botón de navegación va al detalle.

### `components/grid.js`

Grid responsive con `auto-fill` y `minmax(230px, 1fr)`. Modos: con items, error y vacío.

### `components/list.js`

Lista vertical simple. Modos: con items, error y vacío.

### `components/pagination.js`

Botones Anterior/Siguiente con iconos Material Symbols (`chevron_left` / `chevron_right`). Muestra "Page X of Y". Soporta flag `isLoading` para deshabilitar durante fetch.

### `components/coming-soon.js`

Placeholder para páginas de detalle individual (`/character/:id`, `/location/:id`, `/episode/:id`). Muestra mensaje "coming soon" con botón "Back" que usa `window.history.back()`.

### `components/modal.js`

Modal de edición de personaje con inputs para nombre, especie y estado (select). Incluye validación en cliente (campos obligatorios), cierre con Escape o click en backdrop. Se crea una vez y se reutiliza mostrando/ocultando.

API:

- `createModal()` — crea el elemento modal y lo retorna
- `openModal({ id, name, species, status, onSave })` — abre el modal con datos del personaje
- `closeModal()` — cierra el modal

### `components/toast.js`

Toast placeholder para notificaciones. Preparado para futura implementación (ej. feedback al guardar cambios).

## Servicios (`services/rickmorty.js`)

Tres funciones async que fetchean la Rick &amp; Morty API vía el proxy de Vite:

- `getCharacters(page)` → `/api/character`
- `getLocations(page)` → `/api/location`
- `getEpisodes(page)` → `/api/episode`

Todas devuelven `{ info: { pages, count, next, prev }, results: [] }`.

## Estilos

Tailwind CSS v4 con variables CSS personalizadas en `:root` y el plugin `@savaryna/tailwindcss-material-symbols`. Tema oscuro basado en Rick &amp; Morty.

```css
:root {
  --rm-bg-primary:      #0A1128;   /* fondo principal */
  --rm-bg-card:         #111D3A;   /* fondo de cards/rows */
  --rm-accent-portal:   #39FF8A;   /* verde portal */
  --rm-accent-plasma:   #00C2FF;   /* azul plasma */
  --rm-accent-purple:   #7B4FE8;   /* código de episodio */
  --rm-text-primary:    #C0F0D8;
  --rm-text-muted:      #4A6A80;
  --rm-alive:           #39FF8A;
  --rm-dead:            #E84E4E;
}
```

Las variables se usan con sintaxis Tailwind arbitrary value: `bg-(--rm-bg-primary)`, `text-(--rm-accent-plasma)`, `border-(--rm-border)`.

Iconos Material Symbols se aplican con clase `icon` y tamaños semánticos: `icon-xs` (20px) a `icon-4xl` (128px).

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

