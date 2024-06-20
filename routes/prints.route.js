const router = require("express").Router()
const printsCtl = require("../controllers/prints.control")
const { authorization } = require("../services/auth")
const { validateParamsId } = require("../services/validate.service")
const { printsSchema } = require("../validations/prints.validate")

router.route("/")
  .post(printsCtl.addPrints)
  .get(printsCtl.getAllPrints)

router.post("/customer", printsCtl.addCustomerPrint)

router.route("/:id")
  .patch(validateParamsId, printsCtl.updatePrints)
  .put(authorization, validateParamsId, printsCtl.deletePrints)


module.exports = router;
