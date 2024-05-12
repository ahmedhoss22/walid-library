const asyncHandler = require("express-async-handler")
const Prints = require("../models/prints.model")
const Teacher = require("../models/teachers.model")
const Pdfs = require("../models/pdfs.model")

const PrintsCtl = {
  addPrints: asyncHandler(async (req, res) => {
    const data = req.body
    let pdf = await Pdfs.findById(data.pdf)

    let oneCopyCost = (pdf.pagesNo * pdf.paperCost) + pdf.coverCost
    let totalCost = oneCopyCost * data.copies

    //update Teacher Balance
    let teacher = await Teacher.findById(data.teacher)
    teacher.balance -= totalCost
    await teacher.save()

    let newPrints = new Prints({ ...req.body, cost: totalCost })
    await newPrints.save()

    res.send()
  }),
  addCustomerPrint: asyncHandler(async (req, res) => {
    const data = req.body

    let oneCopyCost = (data.pagesNo * data.paperCost) + data.coverCost
    let totalCost = oneCopyCost * data.copies

    let newPrints = new Prints({ ...req.body, cost: totalCost })
    await newPrints.save()

    res.send()
  }),

  getAllPrints: asyncHandler(async (req, res) => {
    let data = await Prints.find()
    res.send(data)
  }),
  updatePrints: asyncHandler(async (req, res) => {
    let print = await Prints.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(print)
  }),
  deletePrints: asyncHandler(async (req, res) => {
    let id = req.params.id
    await Prints.findByIdAndDelete(id)
    res.send()
  })
};

module.exports = PrintsCtl;
