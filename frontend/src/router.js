import { loginPage } from './pages/loginPage.js'
import { renderCharactersPage } from './pages/charactersPage.js'
import { renderLocationsPage } from './pages/locationsPage.js'
import { renderEpisodesPage } from './pages/episodesPage.js'
import { renderComingSoon } from './components/coming-soon.js'
import { createHeader } from './components/header.js'
import { createFooter } from './components/footer.js'

const app = document.querySelector('#app')

export function show(name, ...args) {
  app.innerHTML = ''

  if (name !== 'login') {
    app.appendChild(createHeader())
  }

  const content = document.createElement('div')
  content.id = 'page-content'
  app.appendChild(content)

  if (name === 'login') loginPage(content)
  else if (name === 'characters') renderCharactersPage(content, 1)
  else if (name === 'characters-page') renderCharactersPage(content, args[0])
  else if (name === 'locations') renderLocationsPage(content, 1)
  else if (name === 'locations-page') renderLocationsPage(content, args[0])
  else if (name === 'episodes') renderEpisodesPage(content, 1)
  else if (name === 'episodes-page') renderEpisodesPage(content, args[0])
  else if (name === 'character') renderComingSoon(content, { label: 'Character', id: args[0], backLabel: 'characters' })
  else if (name === 'location') renderComingSoon(content, { label: 'Location', id: args[0], backLabel: 'locations' })
  else if (name === 'episode') renderComingSoon(content, { label: 'Episode', id: args[0], backLabel: 'episodes' })

  app.appendChild(createFooter())
}
