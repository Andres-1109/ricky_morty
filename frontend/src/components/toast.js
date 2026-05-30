/* function slideIn() {
  this.classList.remove('translate-x-[calc(100%+1rem)]')
  this.classList.add('translate-x-0')
}

function slideOut() {
  this.classList.remove('translate-x-0')
  this.classList.add('translate-x-[calc(100%+1rem)]')
}

function removeElement() {
  this.remove()
}

export function showToast(message) {
  const existing = document.getElementById('toast')
  if (existing) existing.remove()

  const toast = document.createElement('div')
  toast.id = 'toast'
  toast.className =
    'fixed top-4 right-4 z-40 px-5 py-3 rounded-lg text-sm font-bold shadow-lg translate-x-[calc(100%+1rem)] transition-transform duration-300 ease-out bg-(--rm-success) text-(--rm-bg-primary)'
  toast.textContent = message
  document.body.appendChild(toast)

  requestAnimationFrame(slideIn.bind(toast))

  setTimeout(slideOut.bind(toast), 3000)
  setTimeout(removeElement.bind(toast), 3300)
}
 */

// future implementation