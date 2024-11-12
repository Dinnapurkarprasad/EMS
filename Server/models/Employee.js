import mongoose, { Schema } from "mongoose";

const employeeSchmema=new Schema({
   userId:{type:Schema.Types.ObjectId,ref:"User",require:true},
   DOJ:{type:Date},
   gender:{type:String},
   designation:{type:String},
   department:{type:Schema.Types.ObjectId,ref:"Department",require:true},
   salary:{type:Number,require:true},
   createdAt:{type:Date,default:Date.now},
   updatedAt:{type:Date,default:Date.now}

})

const Employee=mongoose.model("Employee",employeeSchmema)
export default Employee