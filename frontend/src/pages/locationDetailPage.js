import { getLocationById, getCharactersByIds } from '../services/rickmorty.js'
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
  this.outerHTML = '<div class="w-16 h-16 rounded-full flex items-center justify-center bg-(--rm-bg-card) text-(--rm-text-muted) text-xs">N/A</div>'
}

export async function renderLocationDetail(container, id) {
  container.innerHTML = ''
  container.appendChild(header())

  const content = document.createElement('div')
  content.id = 'page-content'
  content.style.flex = '1'
  container.appendChild(content)

  content.innerHTML = '<div class="flex items-center justify-center min-h-screen"><span class="text-(--rm-text-muted) text-lg">Loading...</span></div>'

  try {
    const location = await getLocationById(id)

    const residentIds = location.residents.map(extractIdFromUrl)
    let residents = []
    if (residentIds.length > 0) {
      residents = await getCharactersByIds(residentIds)
    }

    content.innerHTML = ''

    const wrapper = document.createElement('div')
    wrapper.className = 'max-w-5xl mx-auto px-4 py-6 w-full'

    const back = document.createElement('button')
    back.className = 'text-(--rm-accent-plasma) hover:text-(--rm-accent-portal) transition-colors cursor-pointer bg-transparent border-none text-sm mb-4'
    back.textContent = '← Back to Locations'
    back.addEventListener('click', () => show('locations'))
    wrapper.appendChild(back)

    const card = document.createElement('div')
    card.className = 'rounded-xl border border-(--rm-border) bg-(--rm-bg-card) p-6'

    const name = document.createElement('h1')
    name.className = 'text-2xl font-bold text-(--rm-text-primary) mb-4'
    name.textContent = location.name
    card.appendChild(name)

    const fields = [
      { label: 'Type', value: location.type },
      { label: 'Dimension', value: location.dimension },
    ]
    for (const f of fields) {
      const row = document.createElement('p')
      row.className = 'text-(--rm-text-secondary) mb-1'
      row.innerHTML = `<span class="text-(--rm-text-muted)">${f.label}:</span> ${f.value}`
      card.appendChild(row)
    }

    wrapper.appendChild(card)

    if (residents.length > 0) {
      const sectionTitle = document.createElement('h2')
      sectionTitle.className = 'text-xl font-bold text-(--rm-text-primary) mt-8 mb-4'
      sectionTitle.textContent = `Residents (${residents.length})`
      wrapper.appendChild(sectionTitle)

      const grid = document.createElement('div')
      grid.className = 'grid gap-4'
      grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(220px, 1fr))'

      for (const resident of residents) {
        const resCard = document.createElement('div')
        resCard.className = 'rounded-lg border border-(--rm-border) bg-(--rm-bg-card) p-4 cursor-pointer transition-colors hover:bg-(--rm-bg-secondary) flex items-center gap-4'
        resCard.dataset.route = 'character'
        resCard.dataset.id = resident.id
        resCard.addEventListener('click', handleNavClick)

        const img = document.createElement('img')
        img.src = resident.image
        img.alt = resident.name
        img.className = 'w-14 h-14 rounded-full object-cover flex-shrink-0'
        img.addEventListener('error', showImageFallback)
        resCard.appendChild(img)

        const resName = document.createElement('p')
        resName.className = 'text-sm font-bold text-(--rm-text-primary) truncate'
        resName.textContent = resident.name
        resCard.appendChild(resName)

        grid.appendChild(resCard)
      }

      wrapper.appendChild(grid)
    }

    content.appendChild(wrapper)
  } catch (error) {
    content.innerHTML = `<p class="text-center py-16 text-(--rm-danger)">Error: ${error.message}</p>`
  }

  container.appendChild(footer())
}
