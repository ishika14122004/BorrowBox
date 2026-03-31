import { useNavigate } from "react-router-dom"

const itemsData = {
  1: { title: "Scientific Calculator", owner: "Rahul K.", hostel: "Block A", rating: 4.8, reviews: 12, price: 30, per: "day", type: "borrow", icon: "calc", bg: "#F4B63E", category: "Electronics", description: "Casio FX-991ES Plus. Perfect for engineering exams. Works great, all buttons functional. Available most weekdays.", rules: ["Return in same condition", "No liquid near it", "Max 3 days per booking"], available: true },
  2: { title: "Guitar (Acoustic)", owner: "Priya S.", hostel: "Block C", rating: 4.9, reviews: 8, price: 100, per: "day", type: "borrow", icon: "guitar", bg: "#C9C4F5", category: "Instruments", description: "Yamaha F280 acoustic guitar. Great for beginners and intermediates. All strings intact, sounds amazing.", rules: ["Handle with care", "No outdoor use", "Return in bag"], available: true },
  3: { title: "Engineering Mathematics Vol 2", owner: "Amit P.", hostel: "Block B", rating: 4.7, reviews: 5, price: 180, per: "flat", type: "sell", icon: "book", bg: "#F4B63E", category: "Books", description: "RD Sharma Engineering Maths Vol 2. Lightly used, all pages intact. Great condition for second year students.", rules: ["Final sale, no returns", "Pay before pickup"], available: true },
  4: { title: "MacBook Charger", owner: "Sneha R.", hostel: "Block D", rating: 5.0, reviews: 20, price: 50, per: "day", type: "borrow", icon: "charger", bg: "#C9C4F5", category: "Electronics", description: "Original Apple MagSafe charger 60W. Works perfectly. Only for MacBook Air/Pro 2015-2019 models.", rules: ["Return by 10pm", "No yanking the cable"], available: false },
  5: { title: "Cricket Bat + Pads", owner: "Karan M.", hostel: "Block A", rating: 4.6, reviews: 15, price: 80, per: "day", type: "borrow", icon: "sports", bg: "#F4B63E", category: "Sports", description: "MRF cricket bat + full pad set. Great for inter-hostel matches. Bat is well-oiled and ready to use.", rules: ["Return same day", "Clean before returning", "No wet conditions"], available: true },
  6: { title: "Formal Shirt (L size)", owner: "Vikram T.", hostel: "Block B", rating: 4.5, reviews: 6, price: 40, per: "day", type: "borrow", icon: "shirt", bg: "#C9C4F5", category: "Clothes", description: "White formal shirt, L size. Freshly washed and ironed. Perfect for placements, seminars, or college events.", rules: ["Return washed", "No food stains", "Iron before return"], available: true },
  7: { title: "JBL Bluetooth Speaker", owner: "Anjali D.", hostel: "Block C", rating: 4.9, reviews: 18, price: 120, per: "day", type: "borrow", icon: "speaker", bg: "#F4B63E", category: "Electronics", description: "JBL Flip 5. Waterproof, 12 hour battery. Loud and clear sound. Great for room parties or study sessions.", rules: ["Return fully charged", "No outdoor trips without permission"], available: true },
  8: { title: "Data Structures Textbook", owner: "Rohan S.", hostel: "Block A", rating: 4.7, reviews: 9, price: 220, per: "flat", type: "sell", icon: "book", bg: "#C9C4F5", category: "Books", description: "Cormen CLRS 3rd edition. The bible of DSA. Minor pencil marks, fully readable. Must have for CS students.", rules: ["Final sale", "Pickup from hostel only"], available: true },
}

const slots = [
  { date: "Today", day: "Mon", available: true },
  { date: "Tomorrow", day: "Tue", available: false },
  { date: "Dec 18", day: "Wed", available: true },
  { date: "Dec 19", day: "Thu", available: true },
  { date: "Dec 20", day: "Fri", available: false },
  { date: "Dec 21", day: "Sat", available: true },
]

function ItemDetailPage() {
  const navigate = useNavigate()
  const id = parseInt(window.location.pathname.split("/").pop())
  const item = itemsData[id] || itemsData[1]
  const isYellow = item.bg === "#F4B63E"
  const bgLight = isYellow ? "#FFF8E8" : "#F0EFFD"

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F5F8" }}>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/home")}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#F4B63E" }}>
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="font-bold text-gray-800 text-lg">BorrowBox</span>
        </div>
        <button onClick={() => navigate("/listings")} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to listings
        </button>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left — Item visual */}
          <div>
            <div className="h-80 rounded-2xl flex items-center justify-center relative mb-4" style={{ backgroundColor: bgLight }}>
              <div className="w-40 h-40 rounded-full flex items-center justify-center" style={{ backgroundColor: isYellow ? "#F4B63E20" : "#C9C4F520" }}>
                <svg width="80" height="80" viewBox="0 0 52 52" fill="none">
                  {item.icon === "book" && <>
                    <rect x="8" y="6" width="28" height="40" rx="3" stroke={isYellow ? "#E2A72E" : "#8B85D4"} strokeWidth="2.5"/>
                    <rect x="8" y="6" width="6" height="40" rx="3" fill={isYellow ? "#E2A72E" : "#8B85D4"} opacity="0.4"/>
                    <line x1="18" y1="16" x2="30" y2="16" stroke={isYellow ? "#E2A72E" : "#8B85D4"} strokeWidth="2" strokeLinecap="round"/>
                    <line x1="18" y1="22" x2="30" y2="22" stroke={isYellow ? "#E2A72E" : "#8B85D4"} strokeWidth="2" strokeLinecap="round"/>
                    <line x1="18" y1="28" x2="26" y2="28" stroke={isYellow ? "#E2A72E" : "#8B85D4"} strokeWidth="2" strokeLinecap="round"/>
                  </>}
                  {item.icon === "calc" && <>
                    <rect x="8" y="4" width="36" height="44" rx="6" stroke={isYellow ? "#E2A72E" : "#8B85D4"} strokeWidth="2.5"/>
                    <rect x="14" y="10" width="24" height="10" rx="2" fill={isYellow ? "#E2A72E" : "#8B85D4"} opacity="0.3"/>
                    <rect x="14" y="28" width="8" height="8" rx="2" fill={isYellow ? "#E2A72E" : "#8B85D4"}/>
                    <rect x="22" y="28" width="8" height="8" rx="2" fill={isYellow ? "#E2A72E" : "#8B85D4"} opacity="0.5"/>
                    <rect x="30" y="28" width="8" height="8" rx="2" fill={isYellow ? "#E2A72E" : "#8B85D4"} opacity="0.3"/>
                  </>}
                  {item.icon === "speaker" && <>
                    <rect x="12" y="6" width="28" height="40" rx="8" stroke={isYellow ? "#E2A72E" : "#8B85D4"} strokeWidth="2.5"/>
                    <circle cx="26" cy="36" r="7" stroke={isYellow ? "#E2A72E" : "#8B85D4"} strokeWidth="2"/>
                    <circle cx="26" cy="36" r="3" fill={isYellow ? "#E2A72E" : "#8B85D4"} opacity="0.4"/>
                    <circle cx="26" cy="16" r="4" stroke={isYellow ? "#E2A72E" : "#8B85D4"} strokeWidth="2"/>
                  </>}
                  {item.icon === "guitar" && <>
                    <circle cx="20" cy="36" r="12" stroke={isYellow ? "#E2A72E" : "#8B85D4"} strokeWidth="2.5"/>
                    <circle cx="20" cy="36" r="5" fill={isYellow ? "#E2A72E" : "#8B85D4"} opacity="0.3"/>
                    <line x1="28" y1="24" x2="44" y2="8" stroke={isYellow ? "#E2A72E" : "#8B85D4"} strokeWidth="2.5" strokeLinecap="round"/>
                  </>}
                  {item.icon === "charger" && <>
                    <rect x="14" y="18" width="24" height="18" rx="4" stroke={isYellow ? "#E2A72E" : "#8B85D4"} strokeWidth="2.5"/>
                    <line x1="26" y1="36" x2="26" y2="46" stroke={isYellow ? "#E2A72E" : "#8B85D4"} strokeWidth="2.5" strokeLinecap="round"/>
                    <line x1="20" y1="18" x2="20" y2="12" stroke={isYellow ? "#E2A72E" : "#8B85D4"} strokeWidth="2.5" strokeLinecap="round"/>
                    <line x1="32" y1="18" x2="32" y2="12" stroke={isYellow ? "#E2A72E" : "#8B85D4"} strokeWidth="2.5" strokeLinecap="round"/>
                  </>}
                  {item.icon === "sports" && <>
                    <line x1="10" y1="42" x2="36" y2="10" stroke={isYellow ? "#E2A72E" : "#8B85D4"} strokeWidth="5" strokeLinecap="round"/>
                    <rect x="34" y="6" width="10" height="14" rx="3" stroke={isYellow ? "#E2A72E" : "#8B85D4"} strokeWidth="2.5" transform="rotate(15 34 6)"/>
                  </>}
                  {item.icon === "shirt" && <>
                    <path d="M16 6 L8 16 L14 18 L14 44 L38 44 L38 18 L44 16 L36 6 C34 10 18 10 16 6Z" stroke={isYellow ? "#E2A72E" : "#8B85D4"} strokeWidth="2.5" strokeLinejoin="round" fill={isYellow ? "#E2A72E" : "#8B85D4"} fillOpacity="0.1"/>
                  </>}
                </svg>
              </div>

              {/* Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-lg text-xs font-semibold"
                style={{ backgroundColor: item.type === "sell" ? "#F4B63E" : "#C9C4F5", color: item.type === "sell" ? "white" : "#534AB7" }}>
                {item.type === "sell" ? "For Sale" : "For Rent"}
              </div>
            </div>

            {/* Rules */}
            <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <h3 className="font-bold text-gray-800 mb-3 text-sm">Owner's Rules</h3>
              <div className="space-y-2">
                {item.rules.map((rule, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#F4B63E" }}></div>
                    <span className="text-sm text-gray-500">{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Details + Booking */}
          <div>
            <div className="mb-2">
              <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: "#F0EFFD", color: "#534AB7" }}>{item.category}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{item.title}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#F4B63E"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span className="text-sm font-bold text-gray-800">{item.rating}</span>
                <span className="text-sm text-gray-400">({item.reviews} reviews)</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-500">{item.hostel} · {item.owner}</span>
            </div>

            <p className="text-gray-500 leading-relaxed mb-6">{item.description}</p>

            {/* Price */}
            <div className="bg-white rounded-2xl p-5 mb-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-gray-800">₹{item.price}</span>
                <span className="text-gray-400 text-sm">{item.per === "flat" ? "flat price" : `per ${item.per}`}</span>
              </div>
              {item.type === "borrow" && (
                <p className="text-xs text-gray-400">Deposit may be required by owner</p>
              )}
            </div>

            {/* Slot picker — only for borrow */}
            {item.type === "borrow" && (
              <div className="bg-white rounded-2xl p-5 mb-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <h3 className="font-bold text-gray-800 mb-3 text-sm">Pick a date</h3>
                <div className="grid grid-cols-3 gap-2">
                  {slots.map((slot, i) => (
                    <button key={i}
                      className="py-2.5 rounded-xl text-center transition-all"
                      style={{
                        backgroundColor: slot.available ? "#FFF8E8" : "#F5F5F5",
                        border: slot.available ? "1.5px solid #F4B63E" : "1.5px solid #E5E5E5",
                        cursor: slot.available ? "pointer" : "not-allowed",
                      }}>
                      <p className="text-xs text-gray-400">{slot.day}</p>
                      <p className="text-xs font-semibold" style={{ color: slot.available ? "#E2A72E" : "#C0C0C0" }}>{slot.date}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <button
              className="w-full py-4 rounded-xl text-white font-bold text-base transition-opacity hover:opacity-90"
              style={{ backgroundColor: item.available ? "#F4B63E" : "#D1D1D1", cursor: item.available ? "pointer" : "not-allowed" }}
              disabled={!item.available}>
              {!item.available ? "Currently Unavailable" : item.type === "sell" ? "Buy Now — ₹" + item.price : "Confirm Booking →"}
            </button>

            <p className="text-center text-xs text-gray-400 mt-3">
              Payment handled securely via UPI after confirmation
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetailPage