export const authStore = {
    isLogged: false,
    user: null,

    onLogin(user) {
        this.isLogged = true
        this.user = user
        localStorage.setItem("user", JSON.stringify(user))
    },

    loadData(){
        const data = JSON.parse(localStorage.getItem("user"))
        if(data !== null){
            this.isLogged = true
            this.user = data
        }
    },

    async onLogout(){
        localStorage.removeItem("user")
        this.isLogged = false
        this.user = null
        const { show } = await import('../router.js')
        show('login')
    }
}