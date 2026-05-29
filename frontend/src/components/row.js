export function createRow(item, { onNavigate }, renderContent) {
  const row = document.createElement('div')
  row.className =
    'group flex items-center gap-4 rounded-lg border px-4 py-3 cursor-pointer transition-colors hover:bg-(--rm-bg-secondary) border-(--rm-border) bg-(--rm-bg-card)'

  row.innerHTML = `${renderContent(item)}`

  row.addEventListener('click', () => {
    if (onNavigate) onNavigate(item)
  })

  return row
}
