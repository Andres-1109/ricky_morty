import { getEpisodes } from '../services/rickmorty.js'
import { list } from '../components/list.js'
import { row } from '../components/row.js'
import { pagination } from '../components/pagination.js'
import { header } from '../components/header.js'
import { footer } from '../components/footer.js'
import { show } from '../router.js'
import { authStore } from '../store/authStore.js'

export async function renderEpisodesPage(container, page = 1) {
  container.innerHTML = ''
  container.appendChild(header())

  const content = document.createElement('div')
  content.id = 'page-content'
  content.style.flex = '1'
  container.appendChild(content)

  content.innerHTML = '<div class="flex items-center justify-center min-h-screen"><span class="text-(--rm-text-muted) text-lg">Loading...</span></div>'

  try {
    const data = await getEpisodes(page)
    content.innerHTML = ''
    content.appendChild(list({
      items: data.results,
      renderItem: (item) =>
        row(item,
          { isAdmin: authStore.isLoged, onNavigate: () => show('episode', item.id) },
          (ep) => `
            <span class="text-xs font-mono font-bold text-(--rm-accent-purple) shrink-0 w-16">${ep.episode}</span>
            <div class="flex-1 min-w-0">
              <p class="font-bold text-(--rm-text-primary) truncate group-hover:text-(--rm-accent-plasma) transition-colors">${ep.name}</p>
            </div>
          `
        ),
    }))
    content.appendChild(pagination({
      page,
      totalPages: data.info.pages,
      onPrev: () => show('episodes-page', page - 1),
      onNext: () => show('episodes-page', page + 1),
    }))
  } catch (error) {
    content.innerHTML = ''
    content.appendChild(list({ error: error.message }))
  }

  container.appendChild(footer())
}
