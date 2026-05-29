import { loginUser } from "../services/authService"
import { authStore } from "../store/authStore"
import { show } from "../router.js"

export async function loginPage(container) {
    container.innerHTML = `
<div class="flex-1 flex items-center justify-center bg-[#0A1128]">
  <div class="bg-[#111D3A] p-8 rounded-xl shadow border border-[#1B3A5C] w-96 flex flex-col gap-4">
    <h2 class="text-2xl font-bold text-[#C0F0D8]">Iniciar sesión</h2>

    <input id="input-email" type="email" placeholder="Email"
      class="p-3 bg-[#0D1F3C] border border-[#1B3A5C] text-[#C0F0D8] placeholder-[#4A6A80] rounded-lg outline-none
             focus:border-[#39FF8A] focus:ring-1 focus:ring-[rgba(57,255,138,0.25)] transition-colors"/>

    <input id="input-password" type="password" placeholder="Contraseña"
      class="p-3 bg-[#0D1F3C] border border-[#1B3A5C] text-[#C0F0D8] placeholder-[#4A6A80] rounded-lg outline-none
             focus:border-[#39FF8A] focus:ring-1 focus:ring-[rgba(57,255,138,0.25)] transition-colors"/>

    <p id="error-msg" class="text-[#E84E4E] text-sm hidden">
      Email o contraseña incorrectos
    </p>

    <button id="btn-login"
      class="bg-[#39FF8A] text-[#0A1128] p-3 rounded-lg font-semibold
             hover:brightness-110 active:brightness-95 transition-all">
      Entrar
    </button>
  </div>
</div>
`

    const buttonLogin = container.querySelector("#btn-login")
    const errorMsg = container.querySelector("#error-msg")

    buttonLogin.addEventListener("click", async (e) => {
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
    })
}
