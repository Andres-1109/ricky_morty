export function list({ items, error, renderItem } = {}) {
  const list = document.createElement('div')
  list.id = 'list'
  list.className = 'mx-auto px-4 my-6 space-y-3'

  if (error) {
    list.innerHTML = `<p class="text-center py-16 text-(--rm-danger)">Error: ${error}</p>`
    return list
  }

  if (!items || items.length === 0) {
    list.innerHTML = '<p class="text-center py-16 text-(--rm-text-muted)">No items found</p>'
    return list
  }

  items.forEach(item => list.appendChild(renderItem(item)))
  return list
}
