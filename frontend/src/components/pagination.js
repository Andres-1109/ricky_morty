export function createPagination() {
  const pagination = document.createElement('div')
  pagination.className = 'flex justify-center items-center gap-4 mb-6'
  pagination.id = 'pagination'
  return pagination
}

export function renderPaginationButtons(pagination, { page, totalPages, isLoading, onPrev, onNext }) {
  pagination.innerHTML = ''

  const previousButton = document.createElement('button')
  previousButton.disabled = page <= 1 || isLoading
  previousButton.className =
    'inline-flex items-center gap-0 px-4 py-2 rounded-lg text-sm leading-none font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-(--rm-bg-secondary) text-(--rm-accent-plasma) border border-(--rm-border)'
  previousButton.innerHTML = '<span class="icon icon-sm -ml-2">chevron_left</span> Prev'
  previousButton.addEventListener('click', onPrev)

  const pageInfo = document.createElement('span')
  pageInfo.className = 'text-sm text-(--rm-text-muted)'
  pageInfo.textContent = `Page ${page} of ${totalPages}`

  const nextButton = document.createElement('button')
  nextButton.disabled = page >= totalPages || isLoading
  nextButton.className =
    'inline-flex items-center gap-0 px-4 py-2 rounded-lg text-sm leading-none font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-(--rm-bg-secondary) text-(--rm-accent-plasma) border border-(--rm-border)'
  nextButton.innerHTML = 'Next <span class="icon icon-sm -mr-2">chevron_right</span>'
  nextButton.addEventListener('click', onNext)

  pagination.append(previousButton, pageInfo, nextButton)
}