import { getCharacters } from '../services/rickmorty.js'
import { createPagination, renderPaginationButtons } from '../components/pagination.js'
import { createGrid, renderGrid } from '../components/grid.js'
import { createCharacterCard } from '../components/character-card.js'

const admin = true // cambiar a true para modo admin (pendiente conectar con login/localStorage)

export async function renderCharactersPage(container, page = 1) {
  container.innerHTML = `
    ${createGrid().outerHTML}
    ${createPagination().outerHTML}
  `

  const grid = document.getElementById('grid')
  const pagination = document.getElementById('pagination')

  let currentPage = 1
  let totalPages = 1
  let isLoading = false

  function renderCard(item) {
    return createCharacterCard(item, { isAdmin: admin })
  }

  function updatePagination() {
    renderPaginationButtons(pagination, {
      page: currentPage,
      totalPages,
      isLoading,
      onPrev: () => loadPage(currentPage),
      onNext: () => loadPage(currentPage + 1),
    })
  }

  async function loadPage(page) {
    if (isLoading) return
    isLoading = true
    updatePagination()
    renderGrid(grid, { loading: true })

    try {
      const data = await getCharacters(page)
      currentPage = page
      totalPages = data.info.pages
      renderGrid(grid, { items: data.results, renderItem: renderCard })
      history.replaceState({}, '', `/characters/page/${page}`)
    } catch (err) {
      renderGrid(grid, { error: err.message })
      console.error(err)
    } finally {
      isLoading = false
      updatePagination()
    }
  }

  await loadPage(Number(page))
}
