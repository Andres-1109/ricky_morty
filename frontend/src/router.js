import { loginPage } from './pages/loginPage.js'
import { renderCharactersPage } from './pages/charactersPage.js'
import { renderLocationsPage } from './pages/locationsPage.js'
import { renderEpisodesPage } from './pages/episodesPage.js'
import { renderCharacterDetail } from './pages/characterDetailPage.js'
import { renderLocationDetail } from './pages/locationDetailPage.js'
import { renderEpisodeDetail } from './pages/episodeDetailPage.js'

const app = document.querySelector('#app')
let ignoreHashChange = false

function buildHash(name, args) {
  let hash = name
  if (args.length > 0) {
    hash += '/' + args.join('/')
  }
  return hash
}

export function show(name, ...args) {
  app.innerHTML = ''

  if (name === 'login') loginPage(app)
  else if (name === 'characters') renderCharactersPage(app, 1)
  else if (name === 'characters-page') renderCharactersPage(app, args[0])
  else if (name === 'locations') renderLocationsPage(app, 1)
  else if (name === 'locations-page') renderLocationsPage(app, args[0])
  else if (name === 'episodes') renderEpisodesPage(app, 1)
  else if (name === 'episodes-page') renderEpisodesPage(app, args[0])
  else if (name === 'character') renderCharacterDetail(app, args[0])
  else if (name === 'location') renderLocationDetail(app, args[0])
  else if (name === 'episode') renderEpisodeDetail(app, args[0])

  const hash = buildHash(name, args)
  if (window.location.hash !== '#' + hash) {
    ignoreHashChange = true
    window.location.hash = hash
  }
}

export function navigateFromHash() {
  const hash = window.location.hash.slice(1)
  if (!hash) return
  const parts = hash.split('/')
  const name = parts[0]
  const args = parts.slice(1).map(arg => ('' + arg).match(/^\d+$/) ? Number(arg) : arg)
  show(name, ...args)
}

window.addEventListener('hashchange', () => {
  if (ignoreHashChange) {
    ignoreHashChange = false
    return
  }
  navigateFromHash()
})
