import Item from "../models/Item.js"

export const getItems = async (req, res) => {
  try {
    const { category, type, search } = req.query
    let filter = {}
    if (category && category !== "All") filter.category = category
    if (type && type !== "All") filter.type = type
    if (search) filter.title = { $regex: search, $options: "i" }
    const items = await Item.find(filter).populate("owner", "name hostel rating")
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("owner", "name hostel rating email")
    if (!item) return res.status(404).json({ message: "Item not found" })
    res.json(item)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createItem = async (req, res) => {
  try {
    const { title, description, category, type, price, per, hostel, rules } = req.body
    if (!title || !description || !category || !type || !price) {
      return res.status(400).json({ message: "Please fill all required fields" })
    }
    const item = await Item.create({
      title, description, category, type,
      price, per, hostel, rules,
      owner: req.user._id,
    })
    const populated = await item.populate("owner", "name hostel rating")
    res.status(201).json(populated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    if (!item) return res.status(404).json({ message: "Item not found" })
    if (item.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" })
    }
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    if (!item) return res.status(404).json({ message: "Item not found" })
    if (item.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" })
    }
    await item.deleteOne()
    res.json({ message: "Item deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ owner: req.user._id })
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}