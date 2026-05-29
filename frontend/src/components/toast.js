export function showToast(message) {
  const existing = document.getElementById('toast')
  if (existing) existing.remove()

  const toast = document.createElement('div')
  toast.id = 'toast'
  toast.className =
    'fixed top-4 right-4 z-40 px-5 py-3 rounded-lg text-sm font-bold shadow-lg translate-x-[calc(100%+1rem)] transition-transform duration-300 ease-out bg-(--rm-success) text-(--rm-bg-primary)'
  toast.textContent = message
  document.body.appendChild(toast)

  requestAnimationFrame(() => {
    toast.classList.remove('translate-x-[calc(100%+1rem)]')
    toast.classList.add('translate-x-0')
  })

  setTimeout(() => {
    toast.classList.remove('translate-x-0')
    toast.classList.add('translate-x-[calc(100%+1rem)]')
    setTimeout(() => toast.remove(), 300)
  }, 3000)
}
