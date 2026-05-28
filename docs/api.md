# API

## Rick & Morty API (proxy Vite)

Todas las requests a `/api/*` son proxyeadas por Vite a `https://rickandmortyapi.com/api/*`.

### `GET /api/character?page={page}`

Lista personajes paginados.

| Parámetro | Tipo | Default |
|-----------|------|---------|
| page | number | 1 |

Respuesta:

```json
{
  "info": {
    "count": 826,
    "pages": 42,
    "next": "https://rickandmortyapi.com/api/character?page=2",
    "prev": null
  },
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    }
  ]
}
```

## Backend local (json-server)

`backend/db.json` — archivo vacío, preparado para futura integración con json-server (CRUD de personajes, usuarios, etc.).
