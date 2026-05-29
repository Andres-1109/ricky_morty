import { loginPage } from './pages/loginPage.js'
import { renderCharactersPage } from './pages/charactersPage.js'
import { renderLocationsPage } from './pages/locationsPage.js'
import { renderEpisodesPage } from './pages/episodesPage.js'
import { renderComingSoon } from './components/coming-soon.js'

const app = document.querySelector('#app')

export function show(name, ...args) {
  if (name === 'login') loginPage(app)
  else if (name === 'characters') renderCharactersPage(app, 1)
  else if (name === 'characters-page') renderCharactersPage(app, args[0])
  else if (name === 'locations') renderLocationsPage(app, 1)
  else if (name === 'locations-page') renderLocationsPage(app, args[0])
  else if (name === 'episodes') renderEpisodesPage(app, 1)
  else if (name === 'episodes-page') renderEpisodesPage(app, args[0])
  else if (name === 'character') renderComingSoon(app, { label: 'Character', id: args[0], backLabel: 'characters' })
  else if (name === 'location') renderComingSoon(app, { label: 'Location', id: args[0], backLabel: 'locations' })
  else if (name === 'episode') renderComingSoon(app, { label: 'Episode', id: args[0], backLabel: 'episodes' })
}
