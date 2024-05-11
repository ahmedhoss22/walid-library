const router = require("express").Router()
const pdfCtl = require("../controllers/pdf.control")
const { validate, validateParamsId } = require("../services/validate.service")
const { fileUpload } = require("../services/file-upload")
const { pdfsSchema } = require("../validations/pdf.validate")

router.route("/")
  .post(fileUpload("pdf").single("file"), validate(pdfsSchema), pdfCtl.addPdfs)
  .get(pdfCtl.getAllPdfs)

router.route("/:id")
  .patch(fileUpload("pdf").single("file"), validateParamsId, pdfCtl.updatePdfs)
  .delete(validateParamsId, pdfCtl.deletePdfs)
  .get(validateParamsId, pdfCtl.getTeacherPdfs)


module.exports = router;

 