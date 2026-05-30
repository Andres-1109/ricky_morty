import { getCharacters } from '../services/rickmorty.js'
import { pagination } from '../components/pagination.js'
import { header } from '../components/header.js'
import { footer } from '../components/footer.js'
import { show } from '../router.js'
import { authStore } from '../store/authStore.js'

function showImageFallback() {
  this.outerHTML = '<div class="w-full h-56 flex items-center justify-center bg-(--rm-bg-card)">' +
    '<span class="text-base text-(--rm-text-muted)">Imagen no disponible</span>' +
  '</div>'
}

function handleCardClick(e) {
  const action = e.target.dataset.action
  if (action) return
  show(e.currentTarget.dataset.route, e.currentTarget.dataset.id)
}

export async function renderCharactersPage(container, page = 1) {
  container.innerHTML = ''
  container.appendChild(header())

  const content = document.createElement('div')
  content.id = 'page-content'
  content.style.flex = '1'
  container.appendChild(content)

  content.innerHTML = '<div class="flex items-center justify-center min-h-screen"><span class="text-(--rm-text-muted) text-lg">Loading...</span></div>'

  try {
    const data = await getCharacters(page)
    content.innerHTML = ''

    const grid = document.createElement('div')
    grid.id = 'grid'
    grid.className = 'grid gap-6 max-w-7xl mx-auto px-4 my-6'
    grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(230px, 1fr))'

    for (const character of data.results) {
      const card = document.createElement('article')
      card.className = 'group rounded-xl overflow-hidden border cursor-pointer transition-transform duration-200 hover:scale-[1.02] bg-(--rm-bg-card) border-(--rm-border)'
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
          ${authStore.isLoged && authStore.user.role === 'admin' ? `
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

      card.dataset.route = 'character'
      card.dataset.id = character.id

      const image = card.querySelector('img')
      image.addEventListener('error', showImageFallback)
      card.addEventListener('click', handleCardClick)

      grid.appendChild(card)
    }

    content.appendChild(grid)
    content.appendChild(pagination({
      page,
      totalPages: data.info.pages,
      navigateTo: 'characters-page',
    }))
  } catch (error) {
    content.innerHTML = `<p class="text-center py-16 text-(--rm-danger)">Error: ${error.message}</p>`
  }

  container.appendChild(footer())
}
