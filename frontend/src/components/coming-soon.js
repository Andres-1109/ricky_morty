import { show } from '../router.js'
import { createHeader } from '../components/header.js'
import { createFooter } from '../components/footer.js'

export function renderComingSoon(container, { label, id, backLabel }) {
  container.innerHTML = ''

  container.appendChild(createHeader())

  const content = document.createElement('div')
  content.id = 'page-content'
  content.style.flex = '1'
  content.innerHTML = `
    <div class="flex flex-col items-center justify-center h-full bg-(--rm-bg-primary)">
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
  container.appendChild(content)

  container.appendChild(createFooter())

  const link = content.querySelector('#back-link')
  link.addEventListener('click', (e) => {
    e.preventDefault()
    show(backLabel)
  })
}
