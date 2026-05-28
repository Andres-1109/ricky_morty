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
  "info": { "count": 826, "pages": 42 },
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

### `GET /api/location?page={page}`

Lista ubicaciones paginadas.

| Parámetro | Tipo | Default |
|-----------|------|---------|
| page | number | 1 |

Respuesta:

```json
{
  "info": { "count": 126, "pages": 7 },
  "results": [
    {
      "id": 1,
      "name": "Earth (C-137)",
      "type": "Planet",
      "dimension": "Dimension C-137"
    }
  ]
}
```

### `GET /api/episode?page={page}`

Lista episodios paginados.

| Parámetro | Tipo | Default |
|-----------|------|---------|
| page | number | 1 |

Respuesta:

```json
{
  "info": { "count": 51, "pages": 3 },
  "results": [
    {
      "id": 1,
      "name": "Pilot",
      "air_date": "December 2, 2013",
      "episode": "S01E01"
    }
  ]
}
```

## Backend local (json-server)

`backend/db.json` — archivo vacío, preparado para futura integración con json-server (CRUD de personajes, usuarios, etc.).
