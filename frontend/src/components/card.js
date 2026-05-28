export function createItemCard(item, { isAdmin, onNavigate } = {}) {
  const card = document.createElement('article')
  card.className =
    'group rounded-xl overflow-hidden border cursor-pointer transition-transform duration-200 hover:scale-[1.02] bg-[var(--rm-bg-card)] border-[var(--rm-border)]'

  card.innerHTML = `
    <img
      src="${item.image}"
      alt="${item.name}"
      class="w-full h-56 object-cover"
      loading="lazy"
    />
    <div class="p-3">
      <h2 class="text-base font-bold text-center text-(--rm-text-primary) group-hover:text-(--rm-accent-plasma) transition-colors duration-200">
        ${item.name}
      </h2>
      ${isAdmin ? `
        <div class="flex gap-2 mt-3">
          <button class="btn-edit flex-1 py-2 rounded-lg text-sm font-bold cursor-pointer hover:opacity-80 transition-opacity
            bg-(--rm-warning) text-(--rm-bg-primary)">
            Editar
          </button>
          <button class="btn-delete flex-1 py-2 rounded-lg text-sm font-bold cursor-pointer hover:opacity-80 transition-opacity bg-(--rm-danger) text-white">
            Eliminar
          </button>
        </div>
      ` : ''}
    </div>
  `

  card.addEventListener('click', (e) => {
    const target = e.target

    if (target.classList.contains('btn-edit')) {
      console.log('Editar', item.id, item.name)
      return
    }

    if (target.classList.contains('btn-delete')) {
      console.log('Eliminar', item.id, item.name)
      return
    }

    if (onNavigate) onNavigate(item)
  })

  return card
}
