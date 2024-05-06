const router = require("express").Router()
const teacherCtl = require("../controllers/teacher.control")
const { validate, validateParamsId } = require("../services/validate.service")
const { addTeacherSchema , addPayment } = require("../validations/teacher.validate")
const { fileUpload } = require("../services/file-upload")

router.route("/")
  .post(fileUpload("teacher").single("image") ,  validate(addTeacherSchema), teacherCtl.addTeacher)
  .get(teacherCtl.getAllTeachers)

router.post("/payment" , validate(addPayment) , teacherCtl.addPayment)
router.route("/:id")
  .patch(fileUpload("teacher").single("image") , validateParamsId, teacherCtl.updateTeacher)
  .delete(validateParamsId, teacherCtl.deleteTeacher)


module.exports = router;
     
