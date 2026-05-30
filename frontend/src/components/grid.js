export function grid({ items, error, renderItem, minWidth = 230 } = {}) {
  const grid = document.createElement('div')
  grid.id = 'grid'
  grid.className = 'grid gap-6 max-w-7xl px-4 my-6'
  grid.style.gridTemplateColumns = `repeat(auto-fill, minmax(${minWidth}px, 1fr))`

  if (error) {
    grid.innerHTML = `<p class="col-span-full text-center py-16 text-(--rm-danger)">Error: ${error}</p>`
    return grid
  }

  if (!items || items.length === 0) {
    grid.innerHTML = '<p class="col-span-full text-center py-16 text-(--rm-text-muted)">No items found</p>'
    return grid
  }

  items.forEach(item => grid.appendChild(renderItem(item)))
  return grid
}
