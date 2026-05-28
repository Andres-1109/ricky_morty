export default class Router {
  constructor(container) {
    this.container = container
    this.routes = []
    window.addEventListener('popstate', () => this.resolve())
  }

  addRoute(pattern, handler) {
    this.routes.push({ pattern, handler })
  }

  navigate(path) {
    history.pushState({}, '', path)
    this.resolve()
  }

  resolve() {
    const path = (window.location.pathname || '/').replace(/\/$/, '') || '/characters'
    for (const { pattern, handler } of this.routes) {
      const regex = new RegExp('^' + pattern.replace(/:id|:page/g, '(\\d+)') + '$')
      const match = path.match(regex)
      if (match) {
        handler(this.container, ...match.slice(1))
        return
      }
    }
    this.container.innerHTML =
      '<p class="text-center p-8 text-(--rm-text-muted)">Page not found</p>'
  }

  init() {
    this.resolve()
  }
}
