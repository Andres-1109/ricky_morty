import './style.css'
import Router from './router.js'
import { renderCharactersPage } from './pages/charactersPage.js'
import { renderLocationsPage } from './pages/locationsPage.js'
import { renderComingSoon } from './components/coming-soon.js'

const app = document.querySelector('#app')
const router = new Router(app)
window.__router = router

router.addRoute('/characters', (container) => renderCharactersPage(container, 1))
router.addRoute('/characters/page/:page', renderCharactersPage)

router.addRoute('/locations', (container) => renderLocationsPage(container, 1))
router.addRoute('/locations/page/:page', renderLocationsPage)

router.addRoute('/character/:id', (container, id) => {
  renderComingSoon(container, {
    label: 'Character',
    id,
    backPath: '/characters',
    backLabel: 'characters',
  })
})

router.addRoute('/location/:id', (container, id) => {
  renderComingSoon(container, {
    label: 'Location',
    id,
    backPath: '/locations',
    backLabel: 'locations',
  })
})

router.init()

export default router
