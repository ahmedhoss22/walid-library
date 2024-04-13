const router = require("express").Router()
const printsCtl = require("../controllers/prints.control")
const { validate, validateParamsId } = require("../services/validate.service")
const { printsSchema } = require("../validations/prints.validate")

router.route("/")
  .post(validate(printsSchema), printsCtl.addPrints)
  .get(printsCtl.getAllPrintss)

router.route("/:id")
  .patch(validateParamsId, printsCtl.updatePrints)
  .delete(validateParamsId, printsCtl.deletePrints)


module.exports = router;
