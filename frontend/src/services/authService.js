const urlUsers = "http://localhost:3000/users"

function findUser(data, email, password) {
  for (const user of data) {
    if (user.email === email && user.password === password) {
      return user
    }
  }
  return null
}

export async function loginUser(email, password) {
    const res = await fetch(urlUsers)
    const data = await res.json()

    const user = findUser(data, email, password)

    return user || null
}
