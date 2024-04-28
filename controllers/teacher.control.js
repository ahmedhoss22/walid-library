const asyncHandler = require("express-async-handler")
const Teacher = require("../models/teachers.model")

const TeacherCtl = {
  addTeacher: asyncHandler(async (req, res) => {
    if (req?.file) {
      req.body.image = "/images/teacher/" + req.file.filename
    }
    let newTeacher = new Teacher(req.body)
    await newTeacher.save()
    res.send()
  }),
  getAllTeachers: asyncHandler(async (req, res) => {
    let data = await Teacher.find()
    res.send(data)
  }),
  updateTeacher: asyncHandler(async (req, res) => {
    let teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true })
    console.log(teacher);
    res.send(teacher)
  }),
  deleteTeacher: asyncHandler(async (req, res) => {
    let id = req.params.id
    await Teacher.findByIdAndDelete(id)
    res.send()
  }),
  addPayment: asyncHandler(async (req, res) => {
    let teacher = await Teacher.findById(req.body.teacher)
    teacher.balance += req.body.payment
    await teacher.save()
    res.send(teacher)
  })
};

module.exports = TeacherCtl;
