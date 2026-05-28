import './style.css'
import Router from './router.js'
import { renderCharactersPage } from './pages/charactersPage.js'

const app = document.querySelector('#app')
const router = new Router(app)
window.__router = router

router.addRoute('/characters', (container) => renderCharactersPage(container, 1))
router.addRoute('/characters/page/:page', renderCharactersPage)

router.addRoute('/character/:id', (container, id) => {
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center min-h-screen bg-(--rm-bg-primary)">
      <p class="text-xl text-(--rm-text-muted)">
        Character ${id} page — coming soon
      </p>
      <a
        href="/characters"
        onclick="event.preventDefault(); window.__router.navigate('/characters')"
        class="mt-4 underline cursor-pointer text-(--rm-accent-plasma)"
      >
        Back to characters
      </a>
    </div>
  `
})

router.init()

export default router
