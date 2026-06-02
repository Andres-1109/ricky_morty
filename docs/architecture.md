# Arquitectura

```
episodes-page/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── coming-soon.js
│   │   │   ├── footer.js
│   │   │   ├── header.js
│   │   │   ├── modal.js
│   │   │   ├── pagination.js
│   │   │   └── toast.js
│   │   ├── pages/
│   │   │   ├── characterDetailPage.js
│   │   │   ├── charactersPage.js
│   │   │   ├── episodeDetailPage.js
│   │   │   ├── episodesPage.js
│   │   │   ├── locationDetailPage.js
│   │   │   ├── locationsPage.js
│   │   │   └── loginPage.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── store/
│   │   │   ├── authStore.js
│   │   │   └── localStore.js
│   │   ├── main.js
│   │   ├── router.js
│   │   └── style.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── docs/
```

## Flujo de navegación

1. `location.hash` cambia → evento `hashchange` → Router
2. Router resuelve hash contra rutas registradas (ej. `#characters`, `#character/1`)
3. Handler pinta `container.innerHTML`
4. Cada página se auto-gestiona (grid/list, paginación, fetch)

## Routing

Router en `src/router.js` — SPA con hash routing.

- Evento `hashchange` + lectura inicial en `main.js`
- Método `show(route, ...params)` para navegación programática (actualiza `location.hash`)
- Matching por segmentos con split/join, soporta `:id` y `:page` como params
- Fallback a `#characters` si hash está vacío
- Ruta no encontrada muestra mensaje de error

### Rutas registradas

| Ruta | Página |
|------|--------|
| `#characters`, `#characters-page/:page` | Characters (grid de cards) |
| `#locations-page`, `#locations-page/:page` | Locations (lista de rows) |
| `#episodes-page`, `#episodes-page/:page` | Episodes (lista de rows) |
| `#character/:id` | Character detail |
| `#location/:id` | Location detail |
| `#episode/:id` | Episode detail |
| `#login` | Login |

## Roles

Manejados vía `authStore` con propiedad `isLogged` y `user.role`. Cuando `role === 'admin'` se muestran botones de Edit, Delete y Create en la página de personajes. El store persiste en localStorage.

## Estado local

`localStore` (singleton en `store/localStore.js`) maneja cuatro colecciones persistidas en localStorage:

| Colección | Clave localStorage | Propósito |
|-----------|-------------------|-----------|
| `deleted` | `deleted-characters` | IDs de personajes eliminados (API) |
| `edited` | `edited-characters` | Cambios a personajes existentes (API) |
| `created` | `created-characters` | Personajes creados localmente |
| `nextLocalId` | `next-local-id` | Contador negativo para IDs locales |

Los IDs locales usan números negativos para evitar colisiones con la API.

## Patrón de página

Cada página exporta una función async `renderX(container, ...params)`:

1. Limpiar `container.innerHTML = ''`
2. Crear header, content wrapper y footer
3. En try/catch: fetch data, actualizar estado global, llamar `render()` con manejo de loading/error
4. Adjuntar event listener delegado en `#page-content`

No se usan clases ni frameworks — el estado se maneja con closures y variables locales.
