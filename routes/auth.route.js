const router = require("express").Router()
const {validate} = require("../services/validate.service")
const { registerationSchema } = require("../validations/auth.validate")
const authCtl = require("../controllers/user.control")

router.post("/register", validate(registerationSchema), authCtl.register)
router.post("/login", validate(registerationSchema), authCtl.login)
router.post("/logout", authCtl.logout)

module.exports = router