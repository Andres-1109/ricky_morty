import { getEpisodes } from '../services/rickmorty.js'
import { createList, renderList } from '../components/list.js'
import { createRow } from '../components/row.js'
import { createPagination, renderPaginationButtons } from '../components/pagination.js'
import { createHeader } from '../components/header.js'
import { createFooter } from '../components/footer.js'
import { show } from '../router.js'
import { authStore } from '../store/authStore.js'

export async function renderEpisodesPage(container, page = 1) {
  container.innerHTML = ''
  container.appendChild(createHeader())

  const content = document.createElement('div')
  content.id = 'page-content'
  content.style.flex = '1'
  container.appendChild(content)

  content.innerHTML = '<div class="flex items-center justify-center min-h-screen"><span class="text-(--rm-text-muted) text-lg">Loading...</span></div>'

  let data
  try {
    data = await getEpisodes(page)
  } catch (err) {
    content.innerHTML = ''
    const list = createList()
    content.appendChild(list)
    renderList(list, { error: err.message })
    container.appendChild(createFooter())
    return
  }

  content.innerHTML = ''

  const list = createList()
  content.appendChild(list)

  renderList(list, {
    items: data.results,
    renderItem: (item) =>
      createRow(item,
        { isAdmin: authStore.isLoged, onNavigate: () => show('episode', item.id) },
        (ep) => `
          <span class="text-xs font-mono font-bold text-(--rm-accent-purple) shrink-0 w-16">${ep.episode}</span>
          <div class="flex-1 min-w-0">
            <p class="font-bold text-(--rm-text-primary) truncate group-hover:text-(--rm-accent-plasma) transition-colors">${ep.name}</p>
          </div>
        `
      ),
  })

  const pagination = createPagination()
  renderPaginationButtons(pagination, {
    page,
    totalPages: data.info.pages,
    isLoading: false,
    onPrev: () => show('episodes-page', page - 1),
    onNext: () => show('episodes-page', page + 1),
  })
  content.appendChild(pagination)

  container.appendChild(createFooter())
}
