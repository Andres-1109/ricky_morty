# API

## Rick & Morty API (proxy Vite)

Todas las requests a `/api/*` son proxyeadas por Vite a `https://rickandmortyapi.com/api/*`.

### `GET /api/character`

| Parámetro | Tipo | Default |
|-----------|------|---------|
| page | number | 1 |

Lista paginada de personajes. Respuesta:

```json
{
  "info": { "count": 826, "pages": 42 },
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "type": "",
      "gender": "Male",
      "origin": { "name": "Earth (C-137)", "url": "https://..." },
      "location": { "name": "Citadel of Ricks", "url": "https://..." },
      "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      "episode": ["https://..."],
      "url": "https://...",
      "created": "2017-11-04T18:48:46.250Z"
    }
  ]
}
```

### `GET /api/character/:id`

Un solo personaje por ID. Misma estructura que un item de `results`.

### `GET /api/character/[id,id,...]`

Batch fetch de múltiples personajes por IDs separados por coma. Retorna array de objetos.

### `GET /api/location`

| Parámetro | Tipo | Default |
|-----------|------|---------|
| page | number | 1 |

Lista paginada de ubicaciones. Respuesta:

```json
{
  "info": { "count": 126, "pages": 7 },
  "results": [
    {
      "id": 1,
      "name": "Earth (C-137)",
      "type": "Planet",
      "dimension": "Dimension C-137",
      "residents": ["https://..."],
      "url": "https://...",
      "created": "2017-11-10T12:42:04.162Z"
    }
  ]
}
```

### `GET /api/location/:id`

Una sola ubicación por ID.

### `GET /api/episode`

| Parámetro | Tipo | Default |
|-----------|------|---------|
| page | number | 1 |

Lista paginada de episodios. Respuesta:

```json
{
  "info": { "count": 51, "pages": 3 },
  "results": [
    {
      "id": 1,
      "name": "Pilot",
      "air_date": "December 2, 2013",
      "episode": "S01E01",
      "characters": ["https://..."],
      "url": "https://...",
      "created": "2017-11-10T12:56:33.798Z"
    }
  ]
}
```

### `GET /api/episode/:id`

Un solo episodio por ID.

### `GET /api/episode/[id,id,...]`

Batch fetch de múltiples episodios por IDs separados por coma.
