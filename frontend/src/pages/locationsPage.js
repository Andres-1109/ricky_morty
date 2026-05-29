import { getLocations } from '../services/rickmorty.js'
import { createList, renderList } from '../components/list.js'
import { createRow } from '../components/row.js'
import { definePage } from '../utils/page.js'
import { navigate } from '../router.js'

export const renderLocationsPage = definePage({
  fetchData: getLocations,
  createLayout: createList,
  renderLayout: renderList,
  basePath: '/locations',
  renderItem: () => (item) =>
    createRow(item, { isAdmin: true, onNavigate: (entry) => navigate(`/location/${entry.id}`) }, (loc) =>
      `<div class="flex-1 min-w-0">
         <p class="font-bold text-(--rm-text-primary) truncate group-hover:text-(--rm-accent-plasma) transition-colors">${loc.name}</p>
       </div>`
    ),
})
