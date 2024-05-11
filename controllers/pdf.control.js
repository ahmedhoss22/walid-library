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
  getAllPdfs: asyncHandler(async (req, res) => {
    let data = await Pdfs.find().populate({ path: "teacher", select: ["_id", "name"] });
    res.send(data)
  }),
  updatePdfs: asyncHandler(async (req, res) => {
    let pdf = await Pdfs.findByIdAndUpdate(req.params.id, req.body, { new: true })
    console.log(req.body);
    if (req.file) {
      pdf.src = `/images/pdf/` + req.file.filename
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

    data.forEach(pdf => {
      const oneCopyCost = (pdf.pagesNo * pdf.paperCost) + pdf.coverCost;
      // console.log(oneCopyCost);
      pdf.oneCopyCost = oneCopyCost;
    });

    const totalCost = data.reduce((total, pdf) => total + pdf.oneCopyCost, 0);
    data.totalCost = totalCost
    // console.log(totalCost);

    res.send(data)
  }),
};

module.exports = PdfsCtl;
