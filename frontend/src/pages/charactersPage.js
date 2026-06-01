import { getCharacters } from '../services/rickmorty.js'
import { pagination } from '../components/pagination.js'
import { header } from '../components/header.js'
import { footer } from '../components/footer.js'
import { show } from '../router.js'
import { authStore } from '../store/authStore.js'
import { openModal, showConfirm } from '../components/modal.js'
import { localStore } from '../store/localStore.js'

let datosDeApi = []
let paginaActual = 1
let totalPaginas = 1

function showImageFallback() {
  this.outerHTML = '<div class="w-full h-56 flex items-center justify-center bg-(--rm-bg-card)">' +
    '<span class="text-base text-(--rm-text-muted)">Imagen no disponible</span>' +
  '</div>'
}

function renderizar(content) {
  content.innerHTML = ''

  const grid = document.createElement('div')
  grid.id = 'grid'
  grid.className = 'grid gap-6 max-w-7xl mx-auto px-4 my-6'
  grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(230px, 1fr))'

  for (const character of datosDeApi) {
    if (localStore.deleted.includes(character.id)) continue

    const personaje = { ...character, ...(localStore.edited[character.id] || {}) }

    const card = document.createElement('article')
    card.className = 'group rounded-xl overflow-hidden border cursor-pointer transition-transform duration-200 hover:scale-[1.02] bg-(--rm-bg-card) border-(--rm-border)'
    card.innerHTML = `
      <img
        src="${personaje.image}"
        alt="${personaje.name}"
        class="w-full h-56 object-cover"
        loading="lazy"
      />
      <div class="p-3">
        <h2 class="text-base font-bold text-center text-(--rm-text-primary) group-hover:text-(--rm-accent-plasma) transition-colors duration-200">
          ${personaje.name}
        </h2>
        ${authStore.isLoged && authStore.user.role === 'admin' ? `
          <div class="flex gap-2 mt-3">
            <button data-action="edit" class="flex-1 py-2 rounded-lg text-sm font-bold cursor-pointer hover:opacity-80 transition-opacity
              bg-(--rm-warning) text-(--rm-bg-primary)">
              Editar
            </button>
            <button data-action="delete" class="flex-1 py-2 rounded-lg text-sm font-bold cursor-pointer hover:opacity-80 transition-opacity bg-(--rm-danger) text-white">
              Eliminar
            </button>
          </div>
        ` : ''}
      </div>
    `

    card.dataset.route = 'character'
    card.dataset.id = personaje.id

    const image = card.querySelector('img')
    image.addEventListener('error', showImageFallback)

    grid.appendChild(card)
  }

  content.appendChild(grid)
  content.appendChild(pagination({
    page: paginaActual,
    totalPages: totalPaginas,
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
    datosDeApi = data.results
    paginaActual = page
    totalPaginas = data.info.pages
    localStore.cargar()
    renderizar(content)
  } catch (error) {
    content.innerHTML = `<p class="text-center py-16 text-(--rm-danger)">Error: ${error.message}</p>`
  }

  container.appendChild(footer())

  content.addEventListener('click', (e) => {
    const card = e.target.closest('[data-id]')
    if (!card) return

    const action = e.target.dataset.action
    const id = Number(card.dataset.id)

    if (action === 'edit') {
      const original = datosDeApi.find(c => c.id === id)
      if (!original) return
      const editado = localStore.edited[id] || {}
      openModal({
        id,
        name: editado.name || original.name,
        species: editado.species || original.species,
        status: editado.status || original.status,
        onSave: (charId, changes) => {
          localStore.edited[charId] = { ...localStore.edited[charId], ...changes }
          localStore.guardar()
          renderizar(content)
        }
      })
    } else if (action === 'delete') {
      const character = datosDeApi.find(c => c.id === id)
      showConfirm({
        title: 'Eliminar personaje',
        message: `¿Estás seguro de eliminar a ${character?.name || 'este personaje'}?`,
        onConfirm: () => {
          localStore.deleted.push(id)
          localStore.guardar()
          renderizar(content)
        }
      })
    } else {
      show('character', id)
    }
  })
}
