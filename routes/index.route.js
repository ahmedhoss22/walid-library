const express = require("express");
const router = express.Router();
const teacherRoutes = require("./teacher.route")
const pdfRoutes = require("./pdf.route")
const printsRoutes = require("./prints.route")
const authRoutes = require("./auth.route")

router.use("/teacher", teacherRoutes)
router.use("/pdf", pdfRoutes)
router.use("/prints", printsRoutes)
router.use("/auth", authRoutes)

module.exports = router;
