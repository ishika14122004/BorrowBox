const BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : "http://localhost:5000/api"

const getToken = () => {
  const user = localStorage.getItem("borrowbox_user")
  if (!user) return null
  return JSON.parse(user).token
}

export const getGigsAPI = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString()
  const res = await fetch(`${BASE_URL}/gigs?${params}`)
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export const createGigAPI = async (gigData) => {
  const res = await fetch(`${BASE_URL}/gigs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(gigData),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export const acceptGigAPI = async (id) => {
  const res = await fetch(`${BASE_URL}/gigs/${id}/accept`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export const getMyGigsAPI = async () => {
  const res = await fetch(`${BASE_URL}/gigs/mine`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}