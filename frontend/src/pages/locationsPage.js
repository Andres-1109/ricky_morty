import { getLocations } from '../services/rickmorty.js'
import { createPagination, renderPaginationButtons } from '../components/pagination.js'
import { createList, renderList } from '../components/list.js'
import { createLocationRow } from '../components/location-row.js'

const admin = true

export async function renderLocationsPage(container, page = 1) {
  container.innerHTML = `
    ${createList().outerHTML}
    ${createPagination().outerHTML}
  `

  const list = document.getElementById('list')
  const pagination = document.getElementById('pagination')

  let currentPage = 1
  let totalPages = 1
  let isLoading = false

  function renderRow(item) {
    return createLocationRow(item, {
      isAdmin: admin,
      onNavigate: (item) => window.__router.navigate(`/location/${item.id}`)
    })
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

    try {
      const data = await getLocations(page)
      currentPage = page
      totalPages = data.info.pages
      renderList(list, { items: data.results, renderItem: renderRow })
      history.replaceState({}, '', `/locations/page/${page}`)
    } catch (err) {
      renderList(list, { error: err.message })
      console.error(err)
    } finally {
      isLoading = false
      updatePagination()
    }
  }

  await loadPage(Number(page))
}