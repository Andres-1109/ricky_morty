export function createRow(item, { isAdmin, onNavigate }, renderContent) {
  const row = document.createElement('div')
  row.className =
    'group flex items-center gap-4 rounded-lg border px-4 py-3 cursor-pointer transition-colors hover:bg-[var(--rm-bg-secondary)] border-[var(--rm-border)] bg-[var(--rm-bg-card)]'

  row.innerHTML = `
    ${renderContent(item)}
    ${isAdmin ? `
      <div class="flex gap-2 shrink-0">
        <button class="btn-edit px-3 py-1.5 rounded-lg text-sm font-bold cursor-pointer hover:opacity-80 transition-opacity
          bg-(--rm-warning) text-(--rm-bg-primary)">Editar</button>
        <button class="btn-delete px-3 py-1.5 rounded-lg text-sm font-bold cursor-pointer hover:opacity-80 transition-opacity
          bg-(--rm-danger) text-white">Eliminar</button>
      </div>
    ` : ''}
  `

  row.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-edit')) {
      console.log('Editar', item.id, item.name)
      return
    }
    if (e.target.classList.contains('btn-delete')) {
      console.log('Eliminar', item.id, item.name)
      return
    }
    if (onNavigate) onNavigate(item)
  })

  return row
}
