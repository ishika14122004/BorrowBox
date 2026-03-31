import Booking from "../models/Booking.js"
import Item from "../models/Item.js"

export const createBooking = async (req, res) => {
  try {
    const { itemId, startDate, endDate } = req.body
    const item = await Item.findById(itemId)
    if (!item) return res.status(404).json({ message: "Item not found" })
    if (!item.available) return res.status(400).json({ message: "Item not available" })
    if (item.owner.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot book your own item" })
    }
    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 1
    const totalPrice = days * item.price

    const booking = await Booking.create({
      item: itemId,
      borrower: req.user._id,
      owner: item.owner,
      startDate: start,
      endDate: end,
      totalPrice,
    })

    await Item.findByIdAndUpdate(itemId, { available: false })
    const populated = await booking.populate([
      { path: "item", select: "title price per" },
      { path: "owner", select: "name hostel" },
    ])
    res.status(201).json(populated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ borrower: req.user._id })
      .populate("item", "title price per category")
      .populate("owner", "name hostel")
      .sort({ createdAt: -1 })
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getBookingsForMyItems = async (req, res) => {
  try {
    const bookings = await Booking.find({ owner: req.user._id })
      .populate("item", "title price per")
      .populate("borrower", "name hostel email")
      .sort({ createdAt: -1 })
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body
    const booking = await Booking.findById(req.params.id)
    if (!booking) return res.status(404).json({ message: "Booking not found" })
    if (booking.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" })
    }
    booking.status = status
    if (status === "completed" || status === "cancelled") {
      await Item.findByIdAndUpdate(booking.item, { available: true })
    }
    await booking.save()
    res.json(booking)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}