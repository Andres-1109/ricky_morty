import { loginUser } from "../services/authService"
import { authStore } from "../store/authStore"
import { show } from "../router.js"

export async function loginPage(container) {
    container.innerHTML = `
<div class="flex-1 flex items-center justify-center bg-(--rm-bg-primary)">
  <div class="bg-(--rm-bg-card) p-8 rounded-xl shadow border border-(--rm-border) w-96 flex flex-col gap-4">
    <h2 class="text-2xl font-bold text-(--rm-text-primary)">Iniciar sesión</h2>

    <input id="input-email" type="email" placeholder="Email"
      class="p-3 bg-(--rm-bg-primary) border border-(--rm-border) text-(--rm-text-primary) placeholder-(--rm-text-muted) rounded-lg outline-none
             focus:border-(--rm-accent-plasma) focus:ring-1 focus:ring-(--rm-accent-plasma)/25 transition-colors"/>

    <input id="input-password" type="password" placeholder="Contraseña"
      class="p-3 bg-(--rm-bg-primary) border border-(--rm-border) text-(--rm-text-primary) placeholder-(--rm-text-muted) rounded-lg outline-none
             focus:border-(--rm-accent-plasma) focus:ring-1 focus:ring-(--rm-accent-plasma)/25 transition-colors"/>

    <p id="error-msg" class="text-(--rm-danger) text-sm hidden">
      Email o contraseña incorrectos
    </p>

    <button id="btn-login"
      class="bg-(--rm-accent-plasma) text-(--rm-bg-primary) p-3 rounded-lg font-semibold
             hover:brightness-110 active:brightness-95 transition-all">
      Entrar
    </button>
  </div>
</div>
`

    const buttonLogin = container.querySelector("#btn-login")
    const errorMsg = container.querySelector("#error-msg")

    async function handleLoginClick(e) {
        e.preventDefault()
        errorMsg.classList.add("hidden")

        const email = container.querySelector("#input-email").value.trim()
        const password = container.querySelector("#input-password").value.trim()

        const user = await loginUser(email, password)

        if (!user) {
            errorMsg.classList.remove("hidden")
            return
        }

        authStore.onLogin(user)
        show("characters")
    }

    buttonLogin.addEventListener("click", handleLoginClick)
}
