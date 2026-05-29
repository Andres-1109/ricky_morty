import { loginUser } from "../services/authService"
import { authStore } from "../store/authStore"

 export function loginPage() {document.getElementById("app").innerHTML=`
<div class="min-h-screen flex items-center justify-center bg-[#0A1128]">
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

const buttonLogin = document.getElementById("btn-login")
buttonLogin.addEventListener("click", (e)=>{
    e.preventDefault()
    const email = document.getElementById("input-email").value.trim()
    const password = document.getElementById("input-password").value.trim()

    const user = loginUser(email,password)

    if(!user){
        document.getElementById("error-sg").classList.remove("hidden")
        return;
    }
    
    authStore.onLogin(user)

    if (user.role === "admin"){
        adminPage()
    } else {
        visitorPage()
    }
})
}


