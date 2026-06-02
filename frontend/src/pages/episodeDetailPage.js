import { getEpisodeById, getCharactersByIds } from '../services/api.js'
import { header } from '../components/header.js'
import { footer } from '../components/footer.js'
import { show } from '../router.js'

function extractIdFromUrl(url) {
  return Number(url.split('/').pop())
}

function handleNavClick(e) {
  const target = e.currentTarget
  show(target.dataset.route, Number(target.dataset.id))
}

function showImageFallback() {
  this.outerHTML = '<div class="w-14 h-14 rounded-full flex items-center justify-center bg-(--rm-bg-card) text-(--rm-text-muted) text-xs">N/A</div>'
}

export async function renderEpisodeDetail(container, id) {
  container.innerHTML = ''
  container.appendChild(header())

  const content = document.createElement('div')
  content.id = 'page-content'
  content.style.flex = '1'
  container.appendChild(content)

  content.innerHTML = '<div class="flex items-center justify-center min-h-screen"><span class="text-(--rm-text-muted) text-lg">Loading...</span></div>'

  try {
    const episode = await getEpisodeById(id)

    const characterIds = episode.characters.map(extractIdFromUrl)
    let characters = []
    if (characterIds.length > 0) {
      characters = await getCharactersByIds(characterIds)
    }

    content.innerHTML = ''

    const wrapper = document.createElement('div')
    wrapper.className = 'max-w-5xl mx-auto px-4 py-6 w-full'

    const back = document.createElement('button')
    back.className = 'text-(--rm-accent-plasma) hover:text-(--rm-accent-portal) transition-colors cursor-pointer bg-transparent border-none text-sm mb-4'
    back.textContent = '← Back to Episodes'
    back.addEventListener('click', () => show('episodes'))
    wrapper.appendChild(back)

    const card = document.createElement('div')
    card.className = 'rounded-xl border border-(--rm-border) bg-(--rm-bg-card) p-6'

    const code = document.createElement('p')
    code.className = 'text-xs font-mono font-bold text-(--rm-accent-purple) mb-1'
    code.textContent = episode.episode
    card.appendChild(code)

    const name = document.createElement('h1')
    name.className = 'text-2xl font-bold text-(--rm-text-primary) mb-4'
    name.textContent = episode.name
    card.appendChild(name)

    const airDate = document.createElement('p')
    airDate.className = 'text-(--rm-text-secondary)'
    airDate.innerHTML = `<span class="text-(--rm-text-muted)">Air Date:</span> ${episode.air_date}`
    card.appendChild(airDate)

    wrapper.appendChild(card)

    if (characters.length > 0) {
      const sectionTitle = document.createElement('h2')
      sectionTitle.className = 'text-xl font-bold text-(--rm-text-primary) mt-8 mb-4'
      sectionTitle.textContent = `Characters (${characters.length})`
      wrapper.appendChild(sectionTitle)

      const grid = document.createElement('div')
      grid.className = 'grid gap-4'
      grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(220px, 1fr))'

      for (const character of characters) {
        const charCard = document.createElement('div')
        charCard.className = 'rounded-lg border border-(--rm-border) bg-(--rm-bg-card) p-4 cursor-pointer transition-colors hover:bg-(--rm-bg-secondary) flex items-center gap-4'
        charCard.dataset.route = 'character'
        charCard.dataset.id = character.id
        charCard.addEventListener('click', handleNavClick)

        const img = document.createElement('img')
        img.src = character.image
        img.alt = character.name
        img.className = 'w-14 h-14 rounded-full object-cover flex-shrink-0'
        img.addEventListener('error', showImageFallback)
        charCard.appendChild(img)

        const charName = document.createElement('p')
        charName.className = 'text-sm font-bold text-(--rm-text-primary) truncate'
        charName.textContent = character.name
        charCard.appendChild(charName)

        grid.appendChild(charCard)
      }

      wrapper.appendChild(grid)
    }

    content.appendChild(wrapper)
  } catch (error) {
    content.innerHTML = `<p class="text-center py-16 text-(--rm-danger)">Error: ${error.message}</p>`
  }

  container.appendChild(footer())
}
