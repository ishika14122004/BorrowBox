import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import itemRoutes from "./routes/itemRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"
import gigRoutes from "./routes/gigRoutes.js"

dotenv.config()
connectDB()

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}))

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/items", itemRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/gigs", gigRoutes)

app.get("/", (req, res) => {
  res.json({ message: "BorrowBox API is running!" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
