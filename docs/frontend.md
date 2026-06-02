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

Router SPA con hash routing. Registra rutas con `route(pattern, handler)` y las resuelve contra `location.hash`. Soporta parámetros `:id` y `:page` en los patrones mediante segment matching.

- `show(route, ...params)` — navega programáticamente (actualiza `location.hash`)
- Escucha `hashchange` para navegación con back/forward del navegador

## Stores

### `store/authStore.js`

Objeto singleton con:

- `isLogged: boolean`
- `user: { email, role, token }`
- `login(email, password)` — login contra json-server (authService)
- `logout()` — limpia sesión

Persiste en `localStorage` bajo clave `auth`.

### `store/localStore.js`

Singleton que persiste estado de edición local en localStorage:

- `deleted: number[]` — IDs de personajes eliminados
- `edited: object` — mapa `id → { name, species, status }` con cambios
- `created: object[]` — personajes creados localmente
- `nextLocalId: number` — contador negativo para IDs locales
- `load()` — recarga desde localStorage
- `save()` — persiste a localStorage
- `clear()` — limpia todo

## Pages

### `pages/charactersPage.js`

Renderiza personajes en un **grid de cards** con imagen, nombre y botones admin (Edit, Delete). Incluye botón "+ Create Character" para admins.

- Fetch: `getCharacters(page)` → `/api/character?page=N`
- Render: mergea API data con `localStore.edited`, salta `localStore.deleted`, agrega `localStore.created`
- Click delega en `#page-content` para edit (modal), delete (confirm modal), create (create modal) o navegación a detalle
- Las cards se crean con `createCard()` helper que maneja placeholder para personajes sin imagen

### `pages/characterDetailPage.js`

Vista detalle de personaje con imagen, status, especie, género, origen, ubicación y lista de episodios.

- Fetch: `getCharacterById(id)` → `/api/character/:id`
- Para IDs negativos (locales): lee de `localStore.created` directamente
- Mergea `localStore.edited[id]` sobre datos de API
- Batch fetch de episodios con `getEpisodesByIds(ids)` → `/api/episode/[id,id,...]`
- Renderiza grid clickeable de episodios

### `pages/locationsPage.js`

Renderiza ubicaciones en una **lista de rows** con nombre, tipo y dimensión.

- Fetch: `getLocations(page)` → `/api/location?page=N`
- Click en row navega a `#location/:id`

### `pages/locationDetailPage.js`

Vista detalle de ubicación con nombre, tipo, dimensión y grid de residents.

- Fetch: `getLocationById(id)` → `/api/location/:id`
- Batch fetch de residents con `getCharactersByIds(ids)` → `/api/character/[id,id,...]`
- Grid clickeable de personajes residentes

### `pages/episodesPage.js`

Renderiza episodios en una **lista de rows** mostrando código del episodio (`S01E01`), nombre y fecha.

- Fetch: `getEpisodes(page)` → `/api/episode?page=N`
- Click en row navega a `#episode/:id`

### `pages/episodeDetailPage.js`

Vista detalle de episodio con código, nombre, fecha y grid de personajes.

- Fetch: `getEpisodeById(id)` → `/api/episode/:id`
- Batch fetch de characters con `getCharactersByIds(ids)` → `/api/character/[id,id,...]`
- Grid clickeable de personajes

### `pages/loginPage.js`

Formulario de login con email/contraseña. Llama a `authStore.login()` y redirige a `#characters`.

## Componentes

### `components/modal.js`

Tres modales en un solo archivo:

- `openModal({ id, name, species, status, onSave })` — modal de edición con inputs para nombre, especie y estado (select). Validación en cliente. Se crea auto-inicializado si no existe en el DOM.
- `showConfirm({ title, message, onConfirm })` — modal de confirmación para eliminar. Botón "Delete" ejecuta callback.
- `openCreateModal({ onSave })` — modal para crear personaje con campos: nombre, especie, estado, género, URL de imagen.

### `components/pagination.js`

Botones Anterior/Siguiente con iconos Material Symbols (`chevron_left` / `chevron_right`). Muestra "Page X of Y". Soporta flag `isLoading` para deshabilitar durante fetch.

### `components/header.js`

Barra superior con logo/nombre de la app y enlaces de navegación (Characters, Locations, Episodes, Login/Logout). Detecta ruta actual para resaltar enlace activo.

### `components/footer.js`

Footer simple con créditos.

### `components/coming-soon.js`

Placeholder para páginas no implementadas. Muestra mensaje "coming soon" con botón "Back" que usa `window.history.back()`.

### `components/toast.js`

Toast placeholder para notificaciones. Preparado para futura implementación.

## Servicios (`services/api.js`)

Funciones async que fetchean la Rick & Morty API vía el proxy de Vite:

- `getCharacters(page)` → `/api/character?page=N`
- `getCharacterById(id)` → `/api/character/:id`
- `getCharactersByIds(ids)` → `/api/character/[id,id,...]` (batch)
- `getLocations(page)` → `/api/location?page=N`
- `getLocationById(id)` → `/api/location/:id`
- `getEpisodes(page)` → `/api/episode?page=N`
- `getEpisodeById(id)` → `/api/episode/:id`
- `getEpisodesByIds(ids)` → `/api/episode/[id,id,...]` (batch)

Todas devuelven `{ info: { pages, count, next, prev }, results: [] }` (listado) o el objeto directamente (single/batch).

## Estilos

Tailwind CSS v4 con variables CSS personalizadas en `:root`. Tema oscuro basado en Rick & Morty.

```css
:root {
  --rm-bg-primary:      #0A1128;
  --rm-bg-card:         #111D3A;
  --rm-bg-secondary:    #1A2D4A;
  --rm-border:          #1E3A5F;
  --rm-accent-portal:   #39FF8A;
  --rm-accent-plasma:   #00C2FF;
  --rm-accent-purple:   #7B4FE8;
  --rm-text-primary:    #C0F0D8;
  --rm-text-secondary:  #8EB0C8;
  --rm-text-muted:      #4A6A80;
  --rm-alive:           #39FF8A;
  --rm-dead:            #E84E4E;
  --rm-unknown:         #9E9E9E;
  --rm-warning:         #F0A500;
  --rm-danger:          #E84E4E;
}
```

Las variables se usan con sintaxis Tailwind arbitrary value: `bg-(--rm-bg-primary)`, `text-(--rm-accent-plasma)`.

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
