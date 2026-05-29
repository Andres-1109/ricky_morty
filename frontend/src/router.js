class Router {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector)
    this.routes = []
    window.addEventListener('popstate', () => this.#resolve())
  }

  get(pattern, handler) {
    this.routes.push({ pattern, handler })
  }

  start() {
    this.#resolve()
  }

  #resolve() {
    let path = window.location.pathname || '/'
    if (path.endsWith('/')) path = path.slice(0, -1)
    if (!path) path = '/characters'

    const segments = path.split('/').filter(Boolean)

    for (const { pattern, handler } of this.routes) {
      const parts = pattern.split('/').filter(Boolean)
      if (segments.length !== parts.length) continue

      const params = []
      let match = true

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i]
        if (part.startsWith(':')) {
          params.push(segments[i])
        } else if (part !== segments[i]) {
          match = false
          break
        }
      }

      if (match) {
        handler(this.container, ...params)
        return
      }
    }

    this.container.innerHTML =
      '<p class="text-center p-8 text-(--rm-text-muted)">Page not found</p>'
  }
}

export function navigate(path) {
  history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export default Router
