export async function getCharacters(page = 1) {
  const res = await fetch(`/api/character?page=${page}`)
  if (!res.ok) throw new Error(`Failed to fetch characters (${res.status})`)
  return res.json()
}



export async function getLocations(page = 1) {
  const res = await fetch(`/api/location?page=${page}`)
  if (!res.ok) throw new Error(`Failed to fetch locations (${res.status})`)
  return res.json()
}



export async function getEpisodes(page = 1) {
  const res = await fetch(`/api/episode?page=${page}`)
  if (!res.ok) throw new Error(`Failed to fetch episodes (${res.status})`)
  return res.json()
}