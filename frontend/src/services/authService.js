const urlUsers = "http://localhost:3000/users"

export async function loginUser(email, password) {
    const res = await fetch(urlUsers)
    const data = await res.json()

    const user = data.find(u => u.email === email && u.password === password)

    return user || null
}