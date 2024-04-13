const mongoose =require("mongoose")
const Schema= mongoose.Schema

const Teacher= mongoose.model("Teacher",new Schema({
  name:{type:String , required : true , trim:true},  
  balance:{type:Number , default :0},  
}))
module.exports = Teacher