const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PdfsSchema = new Schema({
  src: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  pagesNo: { type: Number, required: true },
  paperCost: { type: Number, required: true },
  coverCost: { type: Number, required: true },
  oneCopyCost: { type: Number },
  teacher: { type: mongoose.Types.ObjectId, ref: "Teacher", required: true },
  type: { type: String, required: true, trim: true }, // شرح - مراجعىة
  printType: { type: String, required: true, trim: true }, // بشر- حلزوني اخرى
  year: { type: Number, required: true, trim: true },
  grade: { type: String, required: true, trim: true },
  semister: { type: String, required: true, trim: true, enum: ["الأول", "الثاني"] },
  paperPrint: { type: String, enum: ["وش", "وش و ظهر"], required: true, trim: true },
})

const Pdfs = mongoose.model("Pdfs", PdfsSchema)
module.exports = Pdfs