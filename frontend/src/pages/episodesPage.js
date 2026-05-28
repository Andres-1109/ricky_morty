import { getEpisodes } from '../services/rickmorty.js'
import { createPagination, renderPaginationButtons } from '../components/pagination.js'
import { createList, renderList } from '../components/list.js'
import { createRow } from '../components/row.js'

const admin = true

export async function renderEpisodesPage(container, page = 1) {
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
    return createRow(item, { isAdmin: admin, onNavigate: (item) => window.__router.navigate(`/episode/${item.id}`) }, (ep) =>
      `<span class="text-xs font-mono font-bold text-(--rm-accent-purple) shrink-0 w-16">${ep.episode}</span>
       <div class="flex-1 min-w-0">
         <p class="font-bold text-(--rm-text-primary) truncate group-hover:text-(--rm-accent-plasma) transition-colors">${ep.name}</p>
       </div>`
    )
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
      const data = await getEpisodes(page)
      currentPage = page
      totalPages = data.info.pages
      renderList(list, { items: data.results, renderItem: renderRow })
      history.replaceState({}, '', `/episodes/page/${page}`)
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