import { show } from '../router.js'
import { header } from '../components/header.js'
import { footer } from '../components/footer.js'

function handleBackClick(e) {
  e.preventDefault()
  const link = e.currentTarget
  show(link.dataset.back)
}

export function renderComingSoon(container, { label, id, backLabel }) {
  container.innerHTML = ''

  container.appendChild(header())

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
        data-back="${backLabel}"
      >
        Back to ${backLabel}
      </button>
    </div>
  `
  container.appendChild(content)

  container.appendChild(footer())

  const link = content.querySelector('#back-link')
  link.addEventListener('click', handleBackClick)
}
