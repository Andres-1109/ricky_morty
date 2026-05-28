export function createCharacterCard(character, { isAdmin } = {}) {
  const card = document.createElement('article')
  card.className =
    'group rounded-xl overflow-hidden border cursor-pointer transition-transform duration-200 hover:scale-[1.02] bg-[var(--rm-bg-card)] border-[var(--rm-border)]'

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

    // Click en botón Editar — lógica pendiente
    if (target.classList.contains('btn-edit')) {
      console.log('Editar', character.id, character.name)
      return
    }

    // Click en botón Eliminar — lógica pendiente
    if (target.classList.contains('btn-delete')) {
      console.log('Eliminar', character.id, character.name)
      return
    }

    // Click en la imagen → navega a detalle
    if (target.tagName === 'IMG' || target.tagName === 'H2') {
      window.__router.navigate(`/character/${character.id}`)
    }
  })

  return card
}
