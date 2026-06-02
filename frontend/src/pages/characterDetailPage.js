import { getCharacterById, getEpisodesByIds } from '../services/api.js'
import { header } from '../components/header.js'
import { footer } from '../components/footer.js'
import { show } from '../router.js'
import { localStore } from '../store/localStore.js'

function extractIdFromUrl(url) {
  return Number(url.split('/').pop())
}

function statusColor(status) {
  if (status === 'Alive') return 'var(--rm-alive)'
  if (status === 'Dead') return 'var(--rm-dead)'
  return 'var(--rm-unknown)'
}

function handleNavClick(e) {
  const target = e.currentTarget
  show(target.dataset.route, Number(target.dataset.id))
}

function renderDetailContent(content, character, episodes) {
  content.innerHTML = ''

  const wrapper = document.createElement('div')
  wrapper.className = 'max-w-5xl mx-auto px-4 py-6 w-full'

  const back = document.createElement('button')
  back.className = 'text-(--rm-accent-plasma) hover:text-(--rm-accent-portal) transition-colors cursor-pointer bg-transparent border-none text-sm mb-4'
  back.textContent = '← Back to Characters'
  back.addEventListener('click', () => show('characters'))
  wrapper.appendChild(back)

  const card = document.createElement('div')
  card.className = 'rounded-xl overflow-hidden border border-(--rm-border) bg-(--rm-bg-card)'

  const flex = document.createElement('div')
  flex.className = 'flex flex-col md:flex-row'

  const hasImage = Boolean(character.image)
  if (hasImage) {
    const img = document.createElement('img')
    img.src = character.image
    img.alt = character.name
    img.className = 'w-full md:w-80 h-64 md:h-80 object-cover flex-shrink-0'
    img.addEventListener('error', function () {
      this.outerHTML = '<div class="w-full md:w-80 h-80 flex items-center justify-center bg-(--rm-bg-card) text-(--rm-text-muted)">No image</div>'
    })
    flex.appendChild(img)
  } else {
    const placeholder = document.createElement('div')
    placeholder.className = 'w-full md:w-80 h-80 flex items-center justify-center bg-(--rm-bg-card) text-(--rm-text-muted) flex-shrink-0'
    placeholder.textContent = 'No image'
    flex.appendChild(placeholder)
  }

  const info = document.createElement('div')
  info.className = 'p-6 flex flex-col gap-3 flex-1'

  const name = document.createElement('h1')
  name.className = 'text-2xl font-bold text-(--rm-text-primary)'
  name.textContent = character.name
  info.appendChild(name)

  const statusRow = document.createElement('div')
  statusRow.className = 'flex items-center gap-2'
  const dot = document.createElement('span')
  dot.className = 'w-3 h-3 rounded-full inline-block'
  dot.style.backgroundColor = statusColor(character.status)
  statusRow.appendChild(dot)
  const statusText = document.createElement('span')
  statusText.className = 'text-(--rm-text-secondary)'
  statusText.textContent = `${character.status} - ${character.species}`
  statusRow.appendChild(statusText)
  info.appendChild(statusRow)

  const fields = [
    { label: 'Gender', value: character.gender },
    { label: 'Type', value: character.type || '—' },
  ]
  for (const f of fields) {
    const row = document.createElement('p')
    row.className = 'text-(--rm-text-secondary)'
    row.innerHTML = `<span class="text-(--rm-text-muted)">${f.label}:</span> ${f.value}`
    info.appendChild(row)
  }

  if (character.origin?.name) {
    const row = document.createElement('p')
    row.className = 'text-(--rm-text-secondary)'
    const originId = extractIdFromUrl(character.origin.url)
    if (originId) {
      row.innerHTML = `<span class="text-(--rm-text-muted)">Origin:</span> <a href="#" class="text-(--rm-accent-plasma) hover:text-(--rm-accent-portal) transition-colors no-underline cursor-pointer" data-route="location" data-id="${originId}">${character.origin.name}</a>`
      row.querySelector('a').addEventListener('click', handleNavClick)
    } else {
      row.innerHTML = `<span class="text-(--rm-text-muted)">Origin:</span> ${character.origin.name}`
    }
    info.appendChild(row)
  }

  if (character.location?.name) {
    const row = document.createElement('p')
    row.className = 'text-(--rm-text-secondary)'
    const locId = extractIdFromUrl(character.location.url)
    if (locId) {
      row.innerHTML = `<span class="text-(--rm-text-muted)">Location:</span> <a href="#" class="text-(--rm-accent-plasma) hover:text-(--rm-accent-portal) transition-colors no-underline cursor-pointer" data-route="location" data-id="${locId}">${character.location.name}</a>`
      row.querySelector('a').addEventListener('click', handleNavClick)
    } else {
      row.innerHTML = `<span class="text-(--rm-text-muted)">Location:</span> ${character.location.name}`
    }
    info.appendChild(row)
  }

  flex.appendChild(info)
  card.appendChild(flex)
  wrapper.appendChild(card)

  if (episodes.length > 0) {
    const sectionTitle = document.createElement('h2')
    sectionTitle.className = 'text-xl font-bold text-(--rm-text-primary) mt-8 mb-4'
    sectionTitle.textContent = `Episodes (${episodes.length})`
    wrapper.appendChild(sectionTitle)

    const grid = document.createElement('div')
    grid.className = 'grid gap-4'
    grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(220px, 1fr))'

    for (const ep of episodes) {
      const epCard = document.createElement('div')
      epCard.className = 'rounded-lg border border-(--rm-border) bg-(--rm-bg-card) p-5 cursor-pointer transition-colors hover:bg-(--rm-bg-secondary)'
      epCard.dataset.route = 'episode'
      epCard.dataset.id = ep.id
      epCard.addEventListener('click', handleNavClick)

      const code = document.createElement('p')
      code.className = 'text-xs font-mono font-bold text-(--rm-accent-purple)'
      code.textContent = ep.episode
      epCard.appendChild(code)

      const epName = document.createElement('p')
      epName.className = 'text-sm font-bold text-(--rm-text-primary) mt-1 truncate'
      epName.textContent = ep.name
      epCard.appendChild(epName)

      grid.appendChild(epCard)
    }

    wrapper.appendChild(grid)
  }

  content.appendChild(wrapper)
}

export async function renderCharacterDetail(container, id) {
  container.innerHTML = ''
  container.appendChild(header())

  const content = document.createElement('div')
  content.id = 'page-content'
  content.style.flex = '1'
  container.appendChild(content)

  content.innerHTML = '<div class="flex items-center justify-center min-h-screen"><span class="text-(--rm-text-muted) text-lg">Loading...</span></div>'

  try {
    localStore.load()

    let character, episodes

    if (id < 0) {
      character = localStore.created.find(c => c.id === id)
      if (!character) {
        throw new Error('Character not found')
      }
      episodes = []
    } else {
      const data = await getCharacterById(id)
      character = { ...data, ...(localStore.edited[id] || {}) }
      const episodeIds = data.episode.map(extractIdFromUrl)
      episodes = []
      if (episodeIds.length > 0) {
        episodes = await getEpisodesByIds(episodeIds)
      }
    }

    renderDetailContent(content, character, episodes)
  } catch (error) {
    content.innerHTML = `<p class="text-center py-16 text-(--rm-danger)">Error: ${error.message}</p>`
  }

  container.appendChild(footer())
}
