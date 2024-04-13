const mongoose = require("mongoose")
const Schema = mongoose.Schema

const printsSchema = new Schema({
  teacher: { type: mongoose.Types.ObjectId, ref: "Teacher", required: true },
  copies: { type: Number, required: true },
  cost: { type: Number, required: true },
  pdf: { type: mongoose.Types.ObjectId, ref: "Pdfs", required: true }
}, {
  timestamps: true
})

const Prints = mongoose.model("Prints", printsSchema)
module.exports = Prints