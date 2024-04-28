const mongoose =require("mongoose")
const Schema= mongoose.Schema

const Teacher= mongoose.model("Teacher",new Schema({
  name:{type:String , required : true , trim:true},  
  image:{type:String , trim:true , default :"/images/teacher/default.png"},  
  balance:{type:Number , default :0},  
}))
module.exports = Teacher