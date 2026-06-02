import { getLocations } from '../services/api.js'
import { pagination } from '../components/pagination.js'
import { header } from '../components/header.js'
import { footer } from '../components/footer.js'
import { show } from '../router.js'

function handleRowClick(e) {
  show(e.currentTarget.dataset.route, e.currentTarget.dataset.id)
}

export async function renderLocationsPage(container, page = 1) {
  container.innerHTML = ''
  container.appendChild(header())

  const content = document.createElement('div')
  content.id = 'page-content'
  content.style.flex = '1'
  container.appendChild(content)

  content.innerHTML = '<div class="flex items-center justify-center min-h-screen"><span class="text-(--rm-text-muted) text-lg">Loading...</span></div>'

  try {
    const data = await getLocations(page)
    content.innerHTML = ''

    const list = document.createElement('div')
    list.id = 'list'
    list.className = 'min-w-full mx-auto px-4 my-6 space-y-3'

    for (const location of data.results) {
      const row = document.createElement('div')
      row.className = 'group flex items-center gap-4 rounded-lg border px-5 py-5 cursor-pointer transition-colors hover:bg-(--rm-bg-secondary) border-(--rm-border) bg-(--rm-bg-card)'
      row.innerHTML = `
        <div class="flex-1 min-w-0">
          <p class="font-bold text-(--rm-text-primary) truncate group-hover:text-(--rm-accent-plasma) transition-colors">${location.name}</p>
        </div>
      `

      row.dataset.route = 'location'
      row.dataset.id = location.id
      row.addEventListener('click', handleRowClick)

      list.appendChild(row)
    }

    content.appendChild(list)
    content.appendChild(pagination({
      page,
      totalPages: data.info.pages,
      navigateTo: 'locations-page',
    }))
  } catch (error) {
    content.innerHTML = `<p class="text-center py-16 text-(--rm-danger)">Error: ${error.message}</p>`
  }

  container.appendChild(footer())
}
