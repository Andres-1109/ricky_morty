export const localStore = {
  deleted: [],
  edited: {},
  created: [],
  nextLocalId: -1,

  load() {
    try {
      const deleted = localStorage.getItem('deleted-characters')
      if (deleted) this.deleted = JSON.parse(deleted)
      const edited = localStorage.getItem('edited-characters')
      if (edited) this.edited = JSON.parse(edited)
      const created = localStorage.getItem('created-characters')
      if (created) this.created = JSON.parse(created)
      const nextId = localStorage.getItem('next-local-id')
      if (nextId) this.nextLocalId = JSON.parse(nextId)
    } catch (error) {
      this.deleted = []
      this.edited = {}
      this.created = []
      this.nextLocalId = -1
    }
  },

  save() {
    localStorage.setItem('deleted-characters', JSON.stringify(this.deleted))
    localStorage.setItem('edited-characters', JSON.stringify(this.edited))
    localStorage.setItem('created-characters', JSON.stringify(this.created))
    localStorage.setItem('next-local-id', JSON.stringify(this.nextLocalId))
  },

  clear() {
    this.deleted = []
    this.edited = {}
    this.created = []
    this.nextLocalId = -1
    localStorage.removeItem('deleted-characters')
    localStorage.removeItem('edited-characters')
    localStorage.removeItem('created-characters')
    localStorage.removeItem('next-local-id')
  }
}
