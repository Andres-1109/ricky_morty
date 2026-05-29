import './style.css'
import Router from './router.js'
import { renderCharactersPage } from './pages/charactersPage.js'
import { renderLocationsPage } from './pages/locationsPage.js'
import { renderEpisodesPage } from './pages/episodesPage.js'
import { renderComingSoon } from './components/coming-soon.js'

const router = new Router('#app')

router.get('/characters', (container) => renderCharactersPage(container, 1))
router.get('/characters/page/:page', renderCharactersPage)

router.get('/locations', (container) => renderLocationsPage(container, 1))
router.get('/locations/page/:page', renderLocationsPage)

router.get('/episodes', (container) => renderEpisodesPage(container, 1))
router.get('/episodes/page/:page', renderEpisodesPage)

router.get('/character/:id', (container, id) => {
  renderComingSoon(container, { label: 'Character', id, backLabel: 'characters' })
})

router.get('/location/:id', (container, id) => {
  renderComingSoon(container, { label: 'Location', id, backLabel: 'locations' })
})

router.get('/episode/:id', (container, id) => {
  renderComingSoon(container, { label: 'Episode', id, backLabel: 'episodes' })
})

router.start()
