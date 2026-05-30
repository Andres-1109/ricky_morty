export function card(character, { isAdmin, onNavigate } = {}) {
  const card = document.createElement('article')
  card.className =
    'group rounded-xl overflow-hidden border cursor-pointer transition-transform duration-200 hover:scale-[1.02] bg-(--rm-bg-card) border-(--rm-border)'

  card.innerHTML = `
    <img
      src="${character.image}"
      alt="${character.name}"
      class="w-full h-56 object-cover"
      loading="lazy"
    />
    <div class="p-3">
      <h2 class="text-base font-bold text-center text-(--rm-text-primary) group-hover:text-(--rm-accent-plasma) transition-colors duration-200">
        ${character.name}
      </h2>
      ${isAdmin ? `
        <div class="flex gap-2 mt-3">
          <button data-action="edit" class="flex-1 py-2 rounded-lg text-sm font-bold cursor-pointer hover:opacity-80 transition-opacity
            bg-(--rm-warning) text-(--rm-bg-primary)">
            Editar
          </button>
          <button data-action="delete" class="flex-1 py-2 rounded-lg text-sm font-bold cursor-pointer hover:opacity-80 transition-opacity bg-(--rm-danger) text-white">
            Eliminar
          </button>
        </div>
      ` : ''}
    </div>
  `

  const image = card.querySelector('img')
  image.addEventListener('error', () => {
    image.outerHTML = `<div class="w-full h-56 flex items-center justify-center bg-(--rm-bg-card)">
      <span class="text-base text-(--rm-text-muted)">Imagen no disponible</span>
    </div>`
  })

  card.addEventListener('click', (e) => {
    const action = e.target.dataset.action
    if (action) return
    if (onNavigate) onNavigate(character)
  })

  return card
}
