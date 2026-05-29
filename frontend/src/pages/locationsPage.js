import { getLocations } from '../services/rickmorty.js'
import { createRow } from '../components/row.js'
import { createPagination, renderPaginationButtons } from '../components/pagination.js'
import { show } from '../router.js'
import { authStore } from '../store/authStore.js'

export async function renderLocationsPage(container, page = 1) {
  container.innerHTML = '<div class="flex items-center justify-center min-h-screen"><span class="text-(--rm-text-muted) text-lg">Loading...</span></div>'

  let data
  try {
    data = await getLocations(page)
  } catch (err) {
    container.innerHTML = `<div class="flex items-center justify-center min-h-screen"><span class="text-(--rm-danger) text-xl">${err.message}</span></div>`
    return
  }

  container.innerHTML = ''

  const list = document.createElement('div')
  list.className = 'max-w-7xl mx-auto px-4 my-6 space-y-3'
  container.appendChild(list)

  for (const item of data.results) {
    list.appendChild(createRow(item,
      { isAdmin: authStore.isLoged, onNavigate: () => show('location', item.id) },
      (loc) => `
        <div class="flex-1 min-w-0">
          <p class="font-bold text-(--rm-text-primary) truncate group-hover:text-(--rm-accent-plasma) transition-colors">${loc.name}</p>
        </div>
      `
    ))
  }

  const pagination = createPagination()
  renderPaginationButtons(pagination, {
    page,
    totalPages: data.info.pages,
    isLoading: false,
    onPrev: () => show('locations-page', page - 1),
    onNext: () => show('locations-page', page + 1),
  })
  container.appendChild(pagination)
}
