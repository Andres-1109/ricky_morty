import { getCharacters } from '../services/rickmorty.js'
import { grid } from '../components/grid.js'
import { card } from '../components/card.js'
import { pagination } from '../components/pagination.js'
import { header } from '../components/header.js'
import { footer } from '../components/footer.js'
import { show } from '../router.js'
import { authStore } from '../store/authStore.js'

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
    content.appendChild(grid({
      items: data.results,
      renderItem: (character) =>
        card(character, {
          isAdmin: authStore.isLoged && authStore.user.role === 'admin',
          onNavigate: () => show('character', character.id),
        }),
    }))
    content.appendChild(pagination({
      page,
      totalPages: data.info.pages,
      onPrev: () => show('characters-page', page - 1),
      onNext: () => show('characters-page', page + 1),
    }))
  } catch (error) {
    content.innerHTML = ''
    content.appendChild(grid({ error: error.message }))
  }

  container.appendChild(footer())
}
