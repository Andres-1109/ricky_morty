import { show } from '../router.js'

function handlePaginate(e) {
  const button = e.currentTarget
  show(button.dataset.navigate, Number(button.dataset.page))
}

export function pagination({ page, totalPages, navigateTo }) {
  const container = document.createElement('div')
  container.className = 'flex justify-center items-center gap-4 mb-6'

  const previous = document.createElement('button')
  previous.disabled = page <= 1
  previous.className =
    'inline-flex items-center gap-0 px-4 py-2 rounded-lg text-sm leading-none font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-(--rm-bg-secondary) text-(--rm-accent-plasma) border border-(--rm-border)'
  previous.textContent = 'Prev'
  previous.dataset.navigate = navigateTo
  previous.dataset.page = page - 1
  previous.addEventListener('click', handlePaginate)

  const info = document.createElement('span')
  info.className = 'text-sm text-(--rm-text-muted)'
  info.textContent = `Page ${page} of ${totalPages}`

  const next = document.createElement('button')
  next.disabled = page >= totalPages
  next.className =
    'inline-flex items-center gap-0 px-4 py-2 rounded-lg text-sm leading-none font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-(--rm-bg-secondary) text-(--rm-accent-plasma) border border-(--rm-border)'
  next.textContent = 'Next'
  next.dataset.navigate = navigateTo
  next.dataset.page = page + 1
  next.addEventListener('click', handlePaginate)

  container.append(previous, info, next)
  return container
}
