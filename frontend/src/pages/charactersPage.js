import { getCharacters } from '../services/rickmorty.js'
import { createGrid, renderGrid } from '../components/grid.js'
import { createCard } from '../components/card.js'
import { createPagination, renderPaginationButtons } from '../components/pagination.js'
import { createHeader } from '../components/header.js'
import { createFooter } from '../components/footer.js'
import { show } from '../router.js'
import { authStore } from '../store/authStore.js'

export async function renderCharactersPage(container, page = 1) {
  container.innerHTML = ''
  container.appendChild(createHeader())

  const content = document.createElement('div')
  content.id = 'page-content'
  content.style.flex = '1'
  container.appendChild(content)

  content.innerHTML = '<div class="flex items-center justify-center min-h-screen"><span class="text-(--rm-text-muted) text-lg">Loading...</span></div>'

  let data
  try {
    data = await getCharacters(page)
  } catch (err) {
    content.innerHTML = ''
    const grid = createGrid()
    content.appendChild(grid)
    renderGrid(grid, { error: err.message })
    container.appendChild(createFooter())
    return
  }

  content.innerHTML = ''

  const grid = createGrid()
  content.appendChild(grid)

  renderGrid(grid, {
    items: data.results,
    renderItem: (item) =>
      createCard(item, {
        isAdmin: authStore.isLoged,
        onNavigate: () => show('character', item.id),
      }),
  })

  const pagination = createPagination()
  renderPaginationButtons(pagination, {
    page,
    totalPages: data.info.pages,
    isLoading: false,
    onPrev: () => show('characters-page', page - 1),
    onNext: () => show('characters-page', page + 1),
  })
  content.appendChild(pagination)

  container.appendChild(createFooter())
}
