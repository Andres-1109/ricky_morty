let onSaveCallback = null
let currentCharacterId = null

function getOrCreateEditModal() {
  let modal = document.getElementById('edit-modal')
  if (!modal) {
    modal = createModal()
    document.body.appendChild(modal)
  }
  return modal
}

function handleModalClick(e) {
  if (e.target === e.currentTarget || e.target.id === 'modal-backdrop') {
    closeModal()
  }
}

function handleFormSubmit(e) {
  e.preventDefault()
  handleSubmit()
}

export function createModal() {
  const modal = document.createElement('div')
  modal.id = 'edit-modal'
  modal.className = 'fixed inset-0 z-50 hidden flex items-center justify-center'

  modal.innerHTML = `
    <div id="modal-backdrop" class="absolute inset-0 bg-black/60"></div>
    <div class="relative bg-(--rm-bg-card) border border-(--rm-border) rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
      <h2 id="modal-title" class="text-lg font-bold text-(--rm-text-primary) mb-4">Edit Character</h2>
      <form id="edit-form" class="space-y-4">
        <div>
          <label class="block text-sm text-(--rm-text-secondary) mb-1.5" for="edit-name">Name</label>
          <input
            id="edit-name"
            type="text"
            required
            class="w-full px-3 py-2.5 rounded-lg bg-(--rm-bg-primary) border border-(--rm-border) text-(--rm-text-primary) outline-none transition-colors focus:border-(--rm-accent-plasma)"
          />
          <p id="edit-name-error" class="text-xs text-(--rm-danger) mt-1 hidden">Required</p>
        </div>
        <div>
          <label class="block text-sm text-(--rm-text-secondary) mb-1.5" for="edit-species">Species</label>
          <input
            id="edit-species"
            type="text"
            required
            class="w-full px-3 py-2.5 rounded-lg bg-(--rm-bg-primary) border border-(--rm-border) text-(--rm-text-primary) outline-none transition-colors focus:border-(--rm-accent-plasma)"
          />
          <p id="edit-species-error" class="text-xs text-(--rm-danger) mt-1 hidden">Required</p>
        </div>
        <div>
          <label class="block text-sm text-(--rm-text-secondary) mb-1.5" for="edit-status">Status</label>
          <div class="relative">
            <select
              id="edit-status"
              class="w-full px-3 py-2.5 pr-10 rounded-lg bg-(--rm-bg-primary) border border-(--rm-border) text-(--rm-text-primary) outline-none transition-colors focus:border-(--rm-accent-plasma) appearance-none cursor-pointer"
            >
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="unknown">unknown</option>
            </select>
          </div>
        </div>
        <div class="flex gap-3 pt-2">
          <button
            id="modal-cancel"
            type="button"
            class="flex-1 px-4 py-2.5 rounded-lg text-sm font-bold cursor-pointer hover:opacity-80 transition-opacity bg-(--rm-bg-secondary) text-(--rm-text-primary) border border-(--rm-border) hover:bg-(--rm-border) hover:text-white"
          >
            Cancel
          </button>
          <button
            id="modal-save"
            type="submit"
            class="flex-1 px-4 py-2.5 rounded-lg text-sm font-bold cursor-pointer hover:opacity-80 transition-opacity bg-(--rm-accent-plasma) text-(--rm-bg-primary) hover:brightness-110"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  `

  modal.addEventListener('click', handleModalClick)
  document.addEventListener('keydown', handleEscape)

  const form = modal.querySelector('#edit-form')
  form.addEventListener('submit', handleFormSubmit)
  modal.querySelector('#modal-cancel').addEventListener('click', closeModal)
  modal.querySelector('#edit-name').addEventListener('input', clearFieldError)
  modal.querySelector('#edit-species').addEventListener('input', clearFieldError)

  return modal
}

function handleEscape(e) {
  if (e.key === 'Escape' && document.getElementById('edit-modal')?.classList.contains('hidden') === false) {
    closeModal()
  }
}

function clearFieldError(e) {
  const errorEl = document.getElementById(`${e.target.id}-error`)
  if (errorEl) {
    errorEl.classList.add('hidden')
    e.target.classList.remove('border-(--rm-danger)')
  }
}

function handleSubmit() {
  const name = document.getElementById('edit-name').value.trim()
  const species = document.getElementById('edit-species').value.trim()
  const status = document.getElementById('edit-status').value

  let valid = true

  if (!name) {
    showFieldError('edit-name')
    valid = false
  }
  if (!species) {
    showFieldError('edit-species')
    valid = false
  }

  if (!valid) return

  if (onSaveCallback && currentCharacterId) {
    onSaveCallback(currentCharacterId, { name, species, status })
  }

  closeModal()
}

function showFieldError(id) {
  const input = document.getElementById(id)
  const error = document.getElementById(`${id}-error`)
  if (input) input.classList.add('border-(--rm-danger)')
  if (error) error.classList.remove('hidden')
}

export function openModal({ id, name, species, status, onSave }) {
  currentCharacterId = id
  onSaveCallback = onSave

  const modal = getOrCreateEditModal()

  document.getElementById('edit-name').value = name
  document.getElementById('edit-species').value = species
  document.getElementById('edit-status').value = status

  document.getElementById('edit-name-error')?.classList.add('hidden')
  document.getElementById('edit-species-error')?.classList.add('hidden')
  document.getElementById('edit-name')?.classList.remove('border-(--rm-danger)')
  document.getElementById('edit-species')?.classList.remove('border-(--rm-danger)')

  modal.classList.remove('hidden')
}

export function closeModal() {
  const modal = document.getElementById('edit-modal')
  if (modal) modal.classList.add('hidden')
  currentCharacterId = null
  onSaveCallback = null
}

export function showConfirm({ title, message, onConfirm }) {
  const existing = document.getElementById('confirm-modal')
  if (existing) existing.remove()

  const modal = document.createElement('div')
  modal.id = 'confirm-modal'
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center'

  modal.innerHTML = `
    <div id="confirm-backdrop" class="absolute inset-0 bg-black/60"></div>
    <div class="relative bg-(--rm-bg-card) border border-(--rm-border) rounded-xl p-6 w-full max-w-sm mx-4 shadow-2xl">
      <h2 class="text-lg font-bold text-(--rm-text-primary) mb-2">${title}</h2>
      <p class="text-(--rm-text-secondary) mb-6">${message}</p>
      <div class="flex gap-3">
        <button id="confirm-cancel" class="flex-1 px-4 py-2.5 rounded-lg text-sm font-bold cursor-pointer hover:opacity-80 transition-opacity bg-(--rm-bg-secondary) text-(--rm-text-primary) border border-(--rm-border) hover:bg-(--rm-border) hover:text-white">
          Cancel
        </button>
        <button id="confirm-ok" class="flex-1 px-4 py-2.5 rounded-lg text-sm font-bold cursor-pointer hover:opacity-80 transition-opacity bg-(--rm-danger) text-white hover:brightness-110">
          Delete
        </button>
      </div>
    </div>
  `

  document.body.appendChild(modal)

  function close() {
    modal.remove()
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.id === 'confirm-backdrop') {
      close()
    }
  })

  document.getElementById('confirm-cancel').addEventListener('click', close)
  document.getElementById('confirm-ok').addEventListener('click', () => {
    onConfirm()
    close()
  })
}

export function openCreateModal({ onSave }) {
  const existing = document.getElementById('create-modal')
  if (existing) existing.remove()

  const modal = document.createElement('div')
  modal.id = 'create-modal'
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center'

  modal.innerHTML = `
    <div id="create-backdrop" class="absolute inset-0 bg-black/60"></div>
    <div class="relative bg-(--rm-bg-card) border border-(--rm-border) rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
      <h2 class="text-lg font-bold text-(--rm-text-primary) mb-4">Create Character</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm text-(--rm-text-secondary) mb-1.5" for="create-name">Name</label>
          <input id="create-name" type="text" required
            class="w-full px-3 py-2.5 rounded-lg bg-(--rm-bg-primary) border border-(--rm-border) text-(--rm-text-primary) outline-none transition-colors focus:border-(--rm-accent-plasma)"
          />
          <p id="create-name-error" class="text-xs text-(--rm-danger) mt-1 hidden">Required</p>
        </div>
        <div>
          <label class="block text-sm text-(--rm-text-secondary) mb-1.5" for="create-species">Species</label>
          <input id="create-species" type="text" required
            class="w-full px-3 py-2.5 rounded-lg bg-(--rm-bg-primary) border border-(--rm-border) text-(--rm-text-primary) outline-none transition-colors focus:border-(--rm-accent-plasma)"
          />
          <p id="create-species-error" class="text-xs text-(--rm-danger) mt-1 hidden">Required</p>
        </div>
        <div>
          <label class="block text-sm text-(--rm-text-secondary) mb-1.5" for="create-status">Status</label>
          <select id="create-status"
            class="w-full px-3 py-2.5 pr-10 rounded-lg bg-(--rm-bg-primary) border border-(--rm-border) text-(--rm-text-primary) outline-none transition-colors focus:border-(--rm-accent-plasma) appearance-none cursor-pointer"
          >
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">unknown</option>
          </select>
        </div>
        <div>
          <label class="block text-sm text-(--rm-text-secondary) mb-1.5" for="create-gender">Gender</label>
          <select id="create-gender"
            class="w-full px-3 py-2.5 pr-10 rounded-lg bg-(--rm-bg-primary) border border-(--rm-border) text-(--rm-text-primary) outline-none transition-colors focus:border-(--rm-accent-plasma) appearance-none cursor-pointer"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">unknown</option>
          </select>
        </div>
        <div>
          <label class="block text-sm text-(--rm-text-secondary) mb-1.5" for="create-image">Image URL</label>
          <input id="create-image" type="url" placeholder="https://example.com/avatar.png"
            class="w-full px-3 py-2.5 rounded-lg bg-(--rm-bg-primary) border border-(--rm-border) text-(--rm-text-primary) placeholder-(--rm-text-muted) outline-none transition-colors focus:border-(--rm-accent-plasma)"
          />
        </div>
        <div class="flex gap-3 pt-2">
          <button id="create-cancel" type="button"
            class="flex-1 px-4 py-2.5 rounded-lg text-sm font-bold cursor-pointer hover:opacity-80 transition-opacity bg-(--rm-bg-secondary) text-(--rm-text-primary) border border-(--rm-border) hover:bg-(--rm-border) hover:text-white"
          >
            Cancel
          </button>
          <button id="create-save" type="submit"
            class="flex-1 px-4 py-2.5 rounded-lg text-sm font-bold cursor-pointer hover:opacity-80 transition-opacity bg-(--rm-accent-plasma) text-(--rm-bg-primary) hover:brightness-110"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  `

  document.body.appendChild(modal)

  function close() {
    modal.remove()
  }

  function clearErrors() {
    document.getElementById('create-name-error').classList.add('hidden')
    document.getElementById('create-species-error').classList.add('hidden')
    document.getElementById('create-name').classList.remove('border-(--rm-danger)')
    document.getElementById('create-species').classList.remove('border-(--rm-danger)')
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.id === 'create-backdrop') {
      close()
    }
  })

  document.getElementById('create-cancel').addEventListener('click', close)
  document.getElementById('create-name').addEventListener('input', clearErrors)
  document.getElementById('create-species').addEventListener('input', clearErrors)

  document.getElementById('create-save').addEventListener('click', () => {
    const name = document.getElementById('create-name').value.trim()
    const species = document.getElementById('create-species').value.trim()
    const status = document.getElementById('create-status').value
    const gender = document.getElementById('create-gender').value
    const image = document.getElementById('create-image').value.trim()

    let valid = true
    if (!name) {
      document.getElementById('create-name').classList.add('border-(--rm-danger)')
      document.getElementById('create-name-error').classList.remove('hidden')
      valid = false
    }
    if (!species) {
      document.getElementById('create-species').classList.add('border-(--rm-danger)')
      document.getElementById('create-species-error').classList.remove('hidden')
      valid = false
    }
    if (!valid) return

    onSave({ name, species, status, gender, image })
    close()
  })
}
