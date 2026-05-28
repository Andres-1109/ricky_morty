export function createPagination() {
  const pagination = document.createElement('div')
  pagination.className = 'flex justify-center items-center gap-4 mb-6'
  pagination.id = 'pagination'
  return pagination
}

export function renderPaginationButtons(pagination, { page, totalPages, isLoading, onPrev, onNext }) {
  pagination.innerHTML = ''

  const previousButton = document.createElement('button')
  previousButton.textContent = '← Prev'
  previousButton.disabled = page <= 1 || isLoading
  previousButton.className =
    'px-4 py-2 rounded-lg text-sm font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-[var(--rm-bg-secondary)] text-[var(--rm-accent-plasma)] border border-[var(--rm-border)]'
  previousButton.addEventListener('click', onPrev)

  const pageInfo = document.createElement('span')
  pageInfo.className = 'text-sm text-[var(--rm-text-muted)]'
  pageInfo.textContent = `Page ${page} of ${totalPages}`

  const nextButton = document.createElement('button')
  nextButton.textContent = 'Next →'
  nextButton.disabled = page >= totalPages || isLoading
  nextButton.className =
    'px-4 py-2 rounded-lg text-sm font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-[var(--rm-bg-secondary)] text-[var(--rm-accent-plasma)] border border-[var(--rm-border)]'
  nextButton.addEventListener('click', onNext)

  pagination.append(previousButton, pageInfo, nextButton)
}
