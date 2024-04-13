const router = require("express").Router()
const pdfCtl = require("../controllers/pdf.control")
const { validate, validateParamsId } = require("../services/validate.service")
const { fileUpload } = require("../services/file-upload")
const { pdfsSchema } = require("../validations/pdf.validate")

router.route("/")
  .post(fileUpload.single("file"), validate(pdfsSchema), pdfCtl.addPdfs)
  .get(pdfCtl.getAllPdfss)

router.route("/:id")
  .patch(fileUpload.single("file"), validateParamsId, pdfCtl.updatePdfs)
  .delete(validateParamsId, pdfCtl.deletePdfs)


module.exports = router;

