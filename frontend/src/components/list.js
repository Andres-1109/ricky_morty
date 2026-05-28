export function createList() {
  const list = document.createElement('div')
  list.id = 'list'
  list.className = 'max-w-7xl mx-auto px-4 my-6 space-y-3'
  return list
}

export function renderList(list, { items, error, renderItem } = {}) {
  list.innerHTML = ''
  if (error) {
    list.innerHTML =
      `<p class="text-center py-16 text-(--rm-danger)">Error: ${error}</p>`
    return
  }
  if (!items || items.length === 0) {
    list.innerHTML =
      '<p class="text-center py-16 text-(--rm-text-muted)">No items found</p>'
    return
  }
  items.forEach(item => list.appendChild(renderItem(item)))
}
