import { createPagination, renderPaginationButtons } from '../components/pagination.js'

export function definePage(config) {
  const { fetchData, createLayout, renderLayout, renderItem, basePath } = config

  return async function page(container, page = 1) {
    container.innerHTML = ''
    const wrapper = document.createElement('div')
    wrapper.id = 'content-wrapper'
    wrapper.innerHTML = `
      ${createLayout().outerHTML}
      ${createPagination().outerHTML}
    `
    container.appendChild(wrapper)

    const loading = document.createElement('div')
    loading.id = 'page-loading'
    loading.className = 'flex items-center justify-center min-h-screen'
    loading.innerHTML = '<span class="text-(--rm-text-muted) text-lg">Loading...</span>'
    loading.classList.add('hidden')
    container.appendChild(loading)

    const error = document.createElement('div')
    error.id = 'page-error'
    error.className = 'flex items-center justify-center min-h-screen'
    error.innerHTML = '<span class="text-(--rm-danger) text-xl"></span>'
    error.classList.add('hidden')
    container.appendChild(error)

    const layout = container.querySelector('#grid, #list')
    const pagination = document.getElementById('pagination')

    let currentPage = 1
    let totalPages = 1
    let isLoading = false

    function updatePagination() {
      renderPaginationButtons(pagination, {
        page: currentPage,
        totalPages,
        isLoading,
        onPrev: () => loadPage(currentPage - 1),
        onNext: () => loadPage(currentPage + 1),
      })
    }

    async function loadPage(page) {
      if (isLoading) return
      isLoading = true

      wrapper.classList.add('hidden')
      error.classList.add('hidden')
      loading.classList.remove('hidden')

      try {
        const response = await fetchData(page)

        currentPage = page
        totalPages = response.info.pages
        renderLayout(layout, { items: response.results, renderItem: applyRender })
        history.replaceState({}, '', `${basePath}/page/${page}`)

        loading.classList.add('hidden')
        wrapper.classList.remove('hidden')
      } catch (err) {
        loading.classList.add('hidden')
        error.querySelector('span').textContent = err.message
        error.classList.remove('hidden')
        console.error(err)
      } finally {
        isLoading = false
        updatePagination()
      }
    }

    const applyRender = renderItem({ loadPage, container, getCurrentPage: () => currentPage })

    await loadPage(Number(page))
  }
}
