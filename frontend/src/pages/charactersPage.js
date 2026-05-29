import { definePage } from '../utils/page.js'
import { getCharacters } from '../services/rickmorty.js'
import { createGrid, renderGrid } from '../components/grid.js'
import { createCard } from '../components/card.js'
import { createModal, openModal } from '../components/modal.js'
// import { showToast } from '../components/toast.js'
import { navigate } from '../router.js'

export const renderCharactersPage = definePage({
  fetchData: getCharacters,
  createLayout: createGrid,
  renderLayout: renderGrid,
  basePath: '/characters',
  renderItem: ({ loadPage, container, getCurrentPage }) => {
    const modal = createModal()
    container.appendChild(modal)

    return (item) =>
      createCard(item, {
        isAdmin: true,
        onNavigate: () => navigate(`/character/${item.id}`),
        onEdit: () => {
          openModal({
            id: item.id,
            name: item.name,
            species: item.species,
            status: item.status,
            onSave: () => {
              // showToast(`Personaje #${item.id} actualizado correctamente`)
            },
          })
        },
      })
  },
})
