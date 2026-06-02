import './style.css'
import { show, navigateFromHash } from './router.js'
import { authStore } from './store/authStore.js'

authStore.loadData()

if (window.location.hash) {
  navigateFromHash()
} else {
  show(authStore.isLogged ? 'characters' : 'login')
}
