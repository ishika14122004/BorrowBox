const BASE_URL = "http://localhost:5000/api"

export const registerAPI = async (name, email, password, hostel) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, hostel }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export const loginAPI = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}