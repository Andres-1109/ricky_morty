import { show } from '../router.js'

export function renderComingSoon(container, { label, id, backLabel }) {
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center min-h-screen bg-(--rm-bg-primary)">
      <p class="text-xl text-(--rm-text-muted)">
        ${label} ${id} page — coming soon
      </p>
      <button
        class="mt-4 underline cursor-pointer text-(--rm-accent-plasma) bg-transparent border-none"
        id="back-link"
      >
        Back to ${backLabel}
      </button>
    </div>
  `

  const link = container.querySelector('#back-link')
  link.addEventListener('click', (e) => {
    e.preventDefault()
    show(backLabel)
  })
}
