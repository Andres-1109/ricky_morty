import { getCharacters } from '../services/rickmorty.js'
import { createCard } from '../components/card.js'
import { createPagination, renderPaginationButtons } from '../components/pagination.js'
import { show } from '../router.js'
import { authStore } from '../store/authStore.js'

export async function renderCharactersPage(container, page = 1) {
  container.innerHTML = '<div class="flex items-center justify-center min-h-screen"><span class="text-(--rm-text-muted) text-lg">Loading...</span></div>'

  let data
  try {
    data = await getCharacters(page)
  } catch (err) {
    container.innerHTML = `<div class="flex items-center justify-center min-h-screen"><span class="text-(--rm-danger) text-xl">${err.message}</span></div>`
    return
  }

  container.innerHTML = ''

  const grid = document.createElement('div')
  grid.className = 'grid gap-6 max-w-7xl mx-auto px-4 my-6'
  grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(230px, 1fr))'
  container.appendChild(grid)

  for (const item of data.results) {
    grid.appendChild(createCard(item, {
      isAdmin: authStore.isLoged,
      onNavigate: () => show('character', item.id),
    }))
  }

  const pagination = createPagination()
  renderPaginationButtons(pagination, {
    page,
    totalPages: data.info.pages,
    isLoading: false,
    onPrev: () => show('characters-page', page - 1),
    onNext: () => show('characters-page', page + 1),
  })
  container.appendChild(pagination)
}
