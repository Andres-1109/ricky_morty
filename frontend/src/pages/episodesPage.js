import { getEpisodes } from '../services/rickmorty.js'
import { createList, renderList } from '../components/list.js'
import { createRow } from '../components/row.js'
import { definePage } from '../utils/page.js'
import { navigate } from '../router.js'

export const renderEpisodesPage = definePage({
  fetchData: getEpisodes,
  createLayout: createList,
  renderLayout: renderList,
  basePath: '/episodes',
  renderItem: () => (item) =>
    createRow(item, { isAdmin: true, onNavigate: (entry) => navigate(`/episode/${entry.id}`) }, (ep) =>
      `<span class="text-xs font-mono font-bold text-(--rm-accent-purple) shrink-0 w-16">${ep.episode}</span>
       <div class="flex-1 min-w-0">
         <p class="font-bold text-(--rm-text-primary) truncate group-hover:text-(--rm-accent-plasma) transition-colors">${ep.name}</p>
       </div>`
    ),
})
