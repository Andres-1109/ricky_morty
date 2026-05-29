# Arquitectura

```
episodes-page/
├── backend/
│   └── db.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── card.js
│   │   │   ├── coming-soon.js
│   │   │   ├── grid.js
│   │   │   ├── list.js
│   │   │   ├── modal.js
│   │   │   ├── pagination.js
│   │   │   ├── row.js
│   │   │   └── toast.js
│   │   ├── pages/
│   │   │   ├── charactersPage.js
│   │   │   ├── episodesPage.js
│   │   │   └── locationsPage.js
│   │   ├── services/
│   │   │   └── rickmorty.js
│   │   ├── utils/
│   │   │   └── page.js
│   │   ├── main.js
│   │   ├── router.js
│   │   └── style.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── docs/
```

## Flujo de navegación

1. `history.pushState` / `popstate` → Router
2. Router resuelve pathname contra rutas registradas
3. Handler pinta `container.innerHTML`
4. Cada página se auto-gestiona (grid/list, paginación, fetch)

## Routing

Router en `src/router.js` — SPA con History API.

- Evento `popstate`
- Método `navigate(path)` para navegación programática (pushState + popstate)
- Matching por segmentos con split/join, soporta `:id` y `:page` como params
- Fallback a `/characters` si pathname es `/`
- Ruta no encontrada muestra mensaje de error

### Rutas registradas

| Ruta | Página |
|------|--------|
| `/characters`, `/characters/page/:page` | Characters (grid de cards) |
| `/locations`, `/locations/page/:page` | Locations (lista de rows) |
| `/episodes`, `/episodes/page/:page` | Episodes (lista de rows) |
| `/character/:id`, `/location/:id`, `/episode/:id` | Coming soon (placeholder) |

## Roles

Constante `isAdmin` en cada página (hardcodeada). Cuando es `true` se agregan botones Editar en cards/rows que abren un modal de edición. Login/localStorage será implementado a futuro.

## Patrón de página (`utils/page.js`)

Todas las páginas se crean con `definePage(config)` que retorna una función `page(container, page)`:

1. Limpiar `container.innerHTML = ''`
2. Crear wrapper con layout (grid/list según `createLayout`) + paginación
3. Obtener referencias del DOM recién creado
4. Definir `loadPage(page)` async con manejo de loading/error
5. Llamar `loadPage(pageInicial)`

Cada `loadPage` sincroniza la URL con `history.replaceState` al cambiar de página.
