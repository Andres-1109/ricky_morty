import './style.css'
import { show } from './router.js'
import { authStore } from './store/authStore.js'

authStore.loadData()
show(authStore.isLoged ? 'characters' : 'login')
