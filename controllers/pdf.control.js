const asyncHandler = require("express-async-handler")
const Pdfs = require("../models/pdfs.model")

const PdfsCtl = {
  addPdfs: asyncHandler(async (req, res) => {
    let newPdfs = new Pdfs(req.body)

    if (!req.file) {
      res.status(400).send({ message: "File is required !!" })
    }

    newPdfs.src = `/images/pdf/` + req.file.filename
    await newPdfs.save()
    res.send()
  }),
  getAllPdfss: asyncHandler(async (req, res) => {
    let data = await Pdfs.find()
    res.send(data)
  }),
  updatePdfs: asyncHandler(async (req, res) => {
    let pdf = await Pdfs.findByIdAndUpdate(req.params.id, req.body, { new: true })
    console.log(req.body);
    if (req.file) {
      pdf.src = `/uploads/` + req.file.filename
      await pdf.save()
    }

    res.send(pdf)
  }),
  deletePdfs: asyncHandler(async (req, res) => {
    let id = req.params.id
    await Pdfs.findByIdAndDelete(id)
    res.send()
  }),
  getTeacherPdfs: asyncHandler(async (req, res) => {
    let data = await Pdfs.find({ teacher: req.params.id })
    res.send(data)
  }),
};

module.exports = PdfsCtl;
