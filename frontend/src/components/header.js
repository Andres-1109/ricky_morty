import { show } from '../router.js'
import { authStore } from '../store/authStore.js'

export function createHeader() {
  const header = document.createElement('header')
  header.className = 'bg-(--rm-bg-secondary) border-b border-(--rm-accent-portal) shadow-lg'
  header.innerHTML = `
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-4 cursor-pointer" id="header-logo">
        <img
          src="https://rickandmortyapi.com/icons/icon-512x512.png"
          alt="Rick and Morty"
          class="w-14 h-14 rounded-full border-2 border-(--rm-accent-portal)"
        />
        <h1 class="text-3xl font-bold text-(--rm-accent-portal)">Rick & Morty</h1>
      </div>

      <nav>
        <ul class="flex items-center gap-8 text-(--rm-text-primary) font-semibold">
          <li><a href="#" class="hover:text-(--rm-accent-portal) transition duration-300" data-nav="characters">Character</a></li>
          <li><a href="#" class="hover:text-(--rm-accent-portal) transition duration-300" data-nav="locations">Location</a></li>
          <li><a href="#" class="hover:text-(--rm-accent-portal) transition duration-300" data-nav="episodes">Episode</a></li>
        </ul>
      </nav>

      <div class="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search character..."
          class="w-64 px-4 py-2 rounded-lg bg-(--rm-bg-primary) text-(--rm-text-primary) border border-(--rm-border) placeholder-(--rm-text-muted) focus:outline-none focus:border-(--rm-accent-portal)"
        />
        <button
          id="btn-logout"
          class="bg-(--rm-danger) hover:opacity-80 px-5 py-2 rounded-lg text-white font-semibold transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  `

  header.querySelector('#header-logo').addEventListener('click', () => show('characters'))

  header.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      show(link.dataset.nav)
    })
  })

  header.querySelector('#btn-logout').addEventListener('click', () => {
    authStore.onLogout()
  })

  return header
}
