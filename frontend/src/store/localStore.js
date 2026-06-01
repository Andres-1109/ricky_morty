export const localStore = {
  deleted: [],
  edited: {},

  cargar() {
    try {
      const deleted = localStorage.getItem('deleted-characters')
      if (deleted) this.deleted = JSON.parse(deleted)
      const edited = localStorage.getItem('edited-characters')
      if (edited) this.edited = JSON.parse(edited)
    } catch (error) {
      this.deleted = []
      this.edited = {}
    }
  },

  guardar() {
    localStorage.setItem('deleted-characters', JSON.stringify(this.deleted))
    localStorage.setItem('edited-characters', JSON.stringify(this.edited))
  },

  limpiar() {
    this.deleted = []
    this.edited = {}
    localStorage.removeItem('deleted-characters')
    localStorage.removeItem('edited-characters')
  }
}
