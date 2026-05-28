# Arquitectura

```
characters-page/
├── backend/
│   └── db.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── character-card.js
│   │   │   ├── grid.js
│   │   │   └── pagination.js
│   │   ├── pages/
│   │   │   └── charactersPage.js
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
4. Cada página se auto-gestiona (grid, paginación, fetch)

## Routing

Router en `src/router.js` — SPA con History API.

- Evento `popstate`
- Método `navigate(path)` para navegación programática
- Regex reemplaza `:id|:page` por `(\d+)`
- Fallback a `/characters` si pathname es `/`
- Ruta no encontrada muestra mensaje de error

## Roles

Constante `admin` en `charactersPage.js` (hardcodeada). Cuando es `true` se agregan botones Editar/Eliminar en cada card. Login/localStorage será implementado a futuro.
