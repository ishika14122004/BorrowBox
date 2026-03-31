const BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : "http://localhost:5000/api"

const getToken = () => {
  const user = localStorage.getItem("borrowbox_user")
  if (!user) return null
  return JSON.parse(user).token
}

export const createBookingAPI = async (itemId, startDate, endDate) => {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ itemId, startDate, endDate }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export const getMyBookingsAPI = async () => {
  const res = await fetch(`${BASE_URL}/bookings/mine`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}