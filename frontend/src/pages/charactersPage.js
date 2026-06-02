import { getCharacters } from '../services/api.js'
import { pagination } from '../components/pagination.js'
import { header } from '../components/header.js'
import { footer } from '../components/footer.js'
import { show } from '../router.js'
import { authStore } from '../store/authStore.js'
import { openModal, showConfirm, openCreateModal } from '../components/modal.js'
import { localStore } from '../store/localStore.js'

let apiData = []
let currentPage = 1
let totalPages = 1

function showImageFallback() {
  this.outerHTML = '<div class="w-full h-56 flex items-center justify-center bg-(--rm-bg-card)">' +
    '<span class="text-base text-(--rm-text-muted)">Image unavailable</span>' +
  '</div>'
}

function createCard(character) {
  const card = document.createElement('article')
  card.className = 'group rounded-xl overflow-hidden border cursor-pointer transition-transform duration-200 hover:scale-[1.02] bg-(--rm-bg-card) border-(--rm-border)'

  const hasImage = Boolean(character.image)
  const imageHtml = hasImage
    ? `<img src="${character.image}" alt="${character.name}" class="w-full h-56 object-cover" loading="lazy" />`
    : '<div class="w-full h-56 flex items-center justify-center bg-(--rm-bg-card)"><span class="text-base text-(--rm-text-muted)">No image</span></div>'

  card.innerHTML = `
    ${imageHtml}
    <div class="p-3">
      <h2 class="text-base font-bold text-center text-(--rm-text-primary) group-hover:text-(--rm-accent-plasma) transition-colors duration-200">
        ${character.name}
      </h2>
      ${authStore.isLogged && authStore.user.role === 'admin' ? `
        <div class="flex gap-2 mt-3">
          <button data-action="edit" class="flex-1 py-2 rounded-lg text-sm font-bold cursor-pointer hover:opacity-80 transition-opacity
            bg-(--rm-warning) text-(--rm-bg-primary)">
            Edit
          </button>
          <button data-action="delete" class="flex-1 py-2 rounded-lg text-sm font-bold cursor-pointer hover:opacity-80 transition-opacity bg-(--rm-danger) text-white">
            Delete
          </button>
        </div>
      ` : ''}
    </div>
  `

  card.dataset.route = 'character'
  card.dataset.id = character.id

  if (hasImage) {
    const image = card.querySelector('img')
    image.addEventListener('error', showImageFallback)
  }

  return card
}

function render(content) {
  content.innerHTML = ''

  if (authStore.isLogged && authStore.user.role === 'admin') {
    const createBtn = document.createElement('button')
    createBtn.dataset.action = 'create'
    createBtn.textContent = '+ Create Character'
    createBtn.className = 'mx-auto mt-6 mb-2 px-6 py-3 rounded-lg text-sm font-bold cursor-pointer hover:opacity-80 transition-opacity bg-(--rm-accent-plasma) text-(--rm-bg-primary) hover:brightness-110 block'
    content.appendChild(createBtn)
  }

  const grid = document.createElement('div')
  grid.id = 'grid'
  grid.className = 'grid gap-6 max-w-7xl mx-auto px-4 my-6'
  grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(230px, 1fr))'

  for (const item of apiData) {
    if (localStore.deleted.includes(item.id)) continue

    const character = { ...item, ...(localStore.edited[item.id] || {}) }
    grid.appendChild(createCard(character))
  }

  for (const character of localStore.created) {
    grid.appendChild(createCard(character))
  }

  content.appendChild(grid)
  content.appendChild(pagination({
    page: currentPage,
    totalPages: totalPages,
    navigateTo: 'characters-page',
  }))
}

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
    apiData = data.results
    currentPage = page
    totalPages = data.info.pages
    localStore.load()
    render(content)
  } catch (error) {
    content.innerHTML = `<p class="text-center py-16 text-(--rm-danger)">Error: ${error.message}</p>`
  }

  container.appendChild(footer())

  function openEditForId(id, content) {
  let character
  if (id < 0) {
    character = localStore.created.find(c => c.id === id)
  } else {
    character = apiData.find(c => c.id === id)
  }
  if (!character) return
  const edited = localStore.edited[id] || {}
  const merged = { ...character, ...edited }
  openModal({
    id,
    name: merged.name,
    species: merged.species,
    status: merged.status,
    onSave: (charId, changes) => {
      if (charId < 0) {
        const idx = localStore.created.findIndex(c => c.id === charId)
        if (idx !== -1) {
          Object.assign(localStore.created[idx], changes)
        }
      } else {
        localStore.edited[charId] = { ...localStore.edited[charId], ...changes }
      }
      localStore.save()
      render(content)
    }
  })
}

content.addEventListener('click', (e) => {
    const action = e.target.dataset.action

    if (action === 'create') {
      openCreateModal({
        onSave: (data) => {
          const id = localStore.nextLocalId
          localStore.nextLocalId--
          const character = {
            id,
            name: data.name,
            species: data.species,
            status: data.status,
            gender: data.gender,
            image: data.image,
            type: '',
            origin: { name: 'Unknown', url: '' },
            location: { name: 'Unknown', url: '' },
            episode: [],
            url: '',
            created: new Date().toISOString()
          }
          localStore.created.push(character)
          localStore.save()
          render(content)
        }
      })
      return
    }

    const card = e.target.closest('[data-id]')
    if (!card) return

    const id = Number(card.dataset.id)

    if (action === 'edit') {
      openEditForId(id, content)
    } else if (action === 'delete') {
      if (id < 0) {
        localStore.created = localStore.created.filter(c => c.id !== id)
        localStore.save()
        render(content)
      } else {
        const character = apiData.find(c => c.id === id)
        showConfirm({
          title: 'Delete character',
          message: `Are you sure you want to delete ${character?.name || 'this character'}?`,
          onConfirm: () => {
            localStore.deleted.push(id)
            localStore.save()
            render(content)
          }
        })
      }
    } else {
      show('character', id)
    }
  })
}
