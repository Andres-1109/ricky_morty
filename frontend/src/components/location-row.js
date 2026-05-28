export function createLocationRow(location, { isAdmin, onNavigate } = {}) {
  const row = document.createElement('div')
  row.className =
    'group flex items-center gap-4 rounded-lg border px-4 py-3 cursor-pointer transition-colors hover:bg-[var(--rm-bg-secondary)] border-[var(--rm-border)] bg-[var(--rm-bg-card)]'

  row.innerHTML = `
    <div class="flex-1 min-w-0">
      <p class="font-bold text-(--rm-text-primary) truncate group-hover:text-(--rm-accent-plasma) transition-colors">
        ${location.name}
      </p>
    </div>
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
    const target = e.target

    if (target.classList.contains('btn-edit')) {
      console.log('Editar', location.id, location.name)
      return
    }

    if (target.classList.contains('btn-delete')) {
      console.log('Eliminar', location.id, location.name)
      return
    }

    if (onNavigate) {
      onNavigate(location)
    }
  })

  return row
}
