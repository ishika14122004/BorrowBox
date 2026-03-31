const BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : "http://localhost:5000/api"

const getToken = () => {
  const user = localStorage.getItem("borrowbox_user")
  if (!user) return null
  return JSON.parse(user).token
}

export const getItemsAPI = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString()
  const res = await fetch(`${BASE_URL}/items?${params}`)
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export const getItemByIdAPI = async (id) => {
  const res = await fetch(`${BASE_URL}/items/${id}`)
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export const createItemAPI = async (itemData) => {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(itemData),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export const getMyItemsAPI = async () => {
  const res = await fetch(`${BASE_URL}/items/mine`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}