export async function getCharacters(page = 1) {
  const res = await fetch(`/api/character?page=${page}`)
  if (!res.ok) throw new Error(`Failed to fetch characters (${res.status})`)
  return res.json()
}


