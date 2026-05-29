export const authStore = {
    isLoged = false,
    user = null,

    onLogin(user) {
        this.isLoged = true
        this.user = user
        localStorage.setItem("user", JSON.stringify(user))
    },

    loadData(){
        const data = localStorage.JSON.parse(localStorage.getItem("user"))
        if(data !== null){
            this.isLoged = true
            this.user = data
        }
    },

    onLogout(){
        localStorage.removeItem("user")
        this.isLoged = false
        this.user = null
        loginPage()
    }
}