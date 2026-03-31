import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { getMyItemsAPI } from "../api/items"
import { getMyBookingsAPI } from "../api/bookings"
import { getMyGigsAPI } from "../api/gigs"

const statusStyle = {
  available: { bg: "#E8F8F0", color: "#1A7A4A", label: "Available" },
  booked: { bg: "#FFF8E8", color: "#E2A72E", label: "Booked" },
  confirmed: { bg: "#E8F8F0", color: "#1A7A4A", label: "Confirmed" },
  pending: { bg: "#FFF8E8", color: "#E2A72E", label: "Pending" },
  completed: { bg: "#E8F8F0", color: "#1A7A4A", label: "Completed" },
  "in-progress": { bg: "#F0EFFD", color: "#534AB7", label: "In Progress" },
  open: { bg: "#FFF8E8", color: "#E2A72E", label: "Open" },
  cancelled: { bg: "#FFE8E8", color: "#C0392B", label: "Cancelled" },
}

function DashboardPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [myItems, setMyItems] = useState([])
  const [myBookings, setMyBookings] = useState([])
  const [myGigs, setMyGigs] = useState({ posted: [], accepted: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return navigate("/")
    fetchAll()
  }, [user])

  const fetchAll = async () => {
    try {
      setLoading(true)
      const [items, bookings, gigs] = await Promise.all([
        getMyItemsAPI(),
        getMyBookingsAPI(),
        getMyGigsAPI(),
      ])
      setMyItems(items)
      setMyBookings(bookings)
      setMyGigs(gigs)
    } catch (error) {
      console.error("Dashboard fetch error:", error)
    } finally {
      setLoading(false)
    }
  }

  const allMyTasks = [
    ...(myGigs.posted || []).map(g => ({ ...g, by: "You posted" })),
    ...(myGigs.accepted || []).map(g => ({ ...g, by: "You accepted" })),
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F5F8" }}>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/home")}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#F4B63E" }}>
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="font-bold text-gray-800 text-lg">BorrowBox</span>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate("/listings")}
            className="text-sm px-4 py-2 rounded-xl font-medium border"
            style={{ borderColor: "#E5E5E5", color: "#6B6B6B" }}>
            Browse
          </button>
          <button onClick={() => navigate("/ask-help")}
            className="text-sm px-4 py-2 rounded-xl font-medium border"
            style={{ borderColor: "#C9C4F5", color: "#534AB7" }}>
            Ask for Help
          </button>
          <button onClick={() => { logout(); navigate("/") }}
            className="text-sm px-4 py-2 rounded-xl font-medium border"
            style={{ borderColor: "#FFE8E8", color: "#C0392B" }}>
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-8">

        {/* Profile header */}
        <div className="bg-white rounded-2xl p-6 mb-6 flex items-center gap-5"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
            style={{ backgroundColor: "#F4B63E" }}>
            {user?.name?.charAt(0).toUpperCase() || "S"}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">{user?.name || "Student"}</h2>
            <p className="text-sm text-gray-400">
              {user?.email} · {user?.hostel || "Hostel not set"}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#F4B63E">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="text-xs text-gray-400">College verified</span>
            </div>
          </div>
          <div className="flex gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-800">{myItems.length}</p>
              <p className="text-xs text-gray-400">My listings</p>
            </div>
            <div className="w-px" style={{ backgroundColor: "#E5E5E5" }}></div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{myBookings.length}</p>
              <p className="text-xs text-gray-400">My bookings</p>
            </div>
            <div className="w-px" style={{ backgroundColor: "#E5E5E5" }}></div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{allMyTasks.length}</p>
              <p className="text-xs text-gray-400">My tasks</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-2xl h-48 animate-pulse"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}/>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* My Listings */}
            <div className="bg-white rounded-2xl p-5"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">My Listings</h3>
                <button onClick={() => navigate("/list-item")}
                  className="text-xs font-medium" style={{ color: "#F4B63E" }}>
                  + Add
                </button>
              </div>
              {myItems.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-sm text-gray-400">No listings yet</p>
                  <button onClick={() => navigate("/list-item")}
                    className="mt-2 text-xs font-medium" style={{ color: "#F4B63E" }}>
                    List your first item →
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {myItems.slice(0, 4).map((item) => {
                    const s = statusStyle[item.available ? "available" : "booked"]
                    return (
                      <div key={item._id}
                        className="flex items-center justify-between p-3 rounded-xl"
                        style={{ backgroundColor: "#F8F5F8" }}>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                          <p className="text-xs text-gray-400">
                            ₹{item.price}/{item.per} · {item.category}
                          </p>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full"
                          style={{ backgroundColor: s.bg, color: s.color }}>
                          {s.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* My Bookings */}
            <div className="bg-white rounded-2xl p-5"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">My Bookings</h3>
                <button onClick={() => navigate("/listings")}
                  className="text-xs font-medium" style={{ color: "#F4B63E" }}>
                  Browse more
                </button>
              </div>
              {myBookings.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-sm text-gray-400">No bookings yet</p>
                  <button onClick={() => navigate("/listings")}
                    className="mt-2 text-xs font-medium" style={{ color: "#F4B63E" }}>
                    Browse items →
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {myBookings.slice(0, 4).map((b) => {
                    const s = statusStyle[b.status] || statusStyle.pending
                    return (
                      <div key={b._id}
                        className="flex items-center justify-between p-3 rounded-xl"
                        style={{ backgroundColor: "#F8F5F8" }}>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {b.item?.title || "Item"}
                          </p>
                          <p className="text-xs text-gray-400">
                            {b.owner?.name} · ₹{b.totalPrice}
                          </p>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full"
                          style={{ backgroundColor: s.bg, color: s.color }}>
                          {s.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* My Tasks */}
            <div className="bg-white rounded-2xl p-5"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">My Tasks</h3>
                <button onClick={() => navigate("/ask-help")}
                  className="text-xs font-medium" style={{ color: "#F4B63E" }}>
                  View all
                </button>
              </div>
              {allMyTasks.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-sm text-gray-400">No tasks yet</p>
                  <button onClick={() => navigate("/ask-help")}
                    className="mt-2 text-xs font-medium" style={{ color: "#F4B63E" }}>
                    Post or accept a task →
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {allMyTasks.slice(0, 4).map((t) => {
                    const s = statusStyle[t.status] || statusStyle.open
                    return (
                      <div key={t._id}
                        className="flex items-center justify-between p-3 rounded-xl"
                        style={{ backgroundColor: "#F8F5F8" }}>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{t.title}</p>
                          <p className="text-xs text-gray-400">{t.by} · ₹{t.budget}</p>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full"
                          style={{ backgroundColor: s.bg, color: s.color }}>
                          {s.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

          </div>
        )}

        {/* Quick actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: "List an Item", color: "#FFF8E8", action: () => navigate("/list-item") },
            { label: "Browse Items", color: "#F0EFFD", action: () => navigate("/listings") },
            { label: "Post a Task", color: "#FFF8E8", action: () => navigate("/ask-help") },
            { label: "Accept a Task", color: "#F0EFFD", action: () => navigate("/ask-help") },
          ].map((q, i) => (
            <button key={i} onClick={q.action}
              className="bg-white rounded-2xl p-4 text-left transition-all hover:shadow-md flex items-center gap-3"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div className="w-10 h-10 rounded-xl flex-shrink-0"
                style={{ backgroundColor: q.color }}/>
              <span className="text-sm font-semibold text-gray-700">{q.label}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}

export default DashboardPage