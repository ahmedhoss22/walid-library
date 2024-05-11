const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Teacher = mongoose.model("Teacher", new Schema({
  name: { type: String, required: true, trim: true },
  image: { type: String, trim: true, default: "/images/teacher/default.png" },
  balance: { type: Number, default: 0 },
  pdf: { type: mongoose.Types.ObjectId, ref: "Pdfs" },
  type: { type: String, enum: ["deposite", "loan"] },
  transactions: [
    {
      amount: { type: Number, required: true },
      beforeBalance: { type: Number, required: true },
      afterBalance: { type: Number, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ]
}))
module.exports = Teacher    