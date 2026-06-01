export async function getCharacters(page = 1) {
  const res = await fetch(`/api/character?page=${page}`)
  if (!res.ok) throw new Error(`Failed to fetch characters (${res.status})`)
  return res.json()
}

export async function getCharacterById(id) {
  const res = await fetch(`/api/character/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch character (${res.status})`)
  return res.json()
}

export async function getCharactersByIds(ids) {
  const res = await fetch(`/api/character/${ids.join(',')}`)
  if (!res.ok) throw new Error(`Failed to fetch characters (${res.status})`)
  const data = await res.json()
  return Array.isArray(data) ? data : [data]
}

export async function getLocations(page = 1) {
  const res = await fetch(`/api/location?page=${page}`)
  if (!res.ok) throw new Error(`Failed to fetch locations (${res.status})`)
  return res.json()
}

export async function getLocationById(id) {
  const res = await fetch(`/api/location/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch location (${res.status})`)
  return res.json()
}

export async function getLocationsByIds(ids) {
  const res = await fetch(`/api/location/${ids.join(',')}`)
  if (!res.ok) throw new Error(`Failed to fetch locations (${res.status})`)
  const data = await res.json()
  return Array.isArray(data) ? data : [data]
}

export async function getEpisodes(page = 1) {
  const res = await fetch(`/api/episode?page=${page}`)
  if (!res.ok) throw new Error(`Failed to fetch episodes (${res.status})`)
  return res.json()
}

export async function getEpisodeById(id) {
  const res = await fetch(`/api/episode/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch episode (${res.status})`)
  return res.json()
}

export async function getEpisodesByIds(ids) {
  const res = await fetch(`/api/episode/${ids.join(',')}`)
  if (!res.ok) throw new Error(`Failed to fetch episodes (${res.status})`)
  const data = await res.json()
  return Array.isArray(data) ? data : [data]
}
