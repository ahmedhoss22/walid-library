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
    const { teacher, payment } = req.body;
    let teacherDoc = await Teacher.findById(teacher);
    if (!teacherDoc) {
      return res.status(404).send("Teacher not found");
    }
    
    const beforeBalance = teacherDoc.balance;
    teacherDoc.balance += payment;
    const afterBalance = teacherDoc.balance;
  
    teacherDoc.transactions.push({
      amount: payment,
      beforeBalance,
      afterBalance
    });
  
    await teacherDoc.save();
  
    res.send(teacherDoc);
  })
};

module.exports = TeacherCtl;
