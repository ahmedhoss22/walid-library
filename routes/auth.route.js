const router = require("express").Router()
const {validate} = require("../services/validate.service")
const { registerationSchema } = require("../validations/auth.validate")
const authCtl = require("../controllers/user.control")
const { checkOnline } = require("../services/auth")

router.post("/register", validate(registerationSchema), authCtl.register)
router.post("/login", validate(registerationSchema), authCtl.login)
router.post("/logout", authCtl.logout)
router.post("/online", checkOnline)

module.exports = router