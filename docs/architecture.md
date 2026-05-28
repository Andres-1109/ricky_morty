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
│   │   │   ├── pagination.js
│   │   │   └── row.js
│   │   ├── pages/
│   │   │   ├── charactersPage.js
│   │   │   ├── episodesPage.js
│   │   │   └── locationsPage.js
│   │   ├── services/
│   │   │   └── rickmorty.js
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
- Método `navigate(path)` para navegación programática
- Regex reemplaza `:id|:page` por `(\d+)`
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

Constante `admin` en cada page (hardcodeada). Cuando es `true` se agregan botones Editar/Eliminar en cada fila o card. Login/localStorage será implementado a futuro.

## Patrón de página

Todas las páginas siguen la misma estructura:

1. Limpiar `container.innerHTML` con componentes placeholder (grid/list + paginación)
2. Obtener referencias del DOM recién creado
3. Definir `renderRow` / `renderCard` para cada item
4. Definir `loadPage(page)` async con manejo de loading/error
5. Llamar `loadPage(pageInicial)`

Cada `loadPage` sincroniza la URL con `history.replaceState` al cambiar de página.
