const mongoose = require("mongoose")
const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description :{
        type:String,
        required : true
    },
    type : {
        type : String,
        required : true,
        enum : ["feature","enhancement", "bug"]
    },
    assigning : {
        type : mongoose.Schema.Types.ObjectId,
        required:true,
        ref : "user"
    }, 
    status: {
      type: String,
      enum : ["pending"," In progress","completed"],
      default : "pending"
    } ,
    endTime : { /// created at have to add 
        type:Date,
        required:true,
    },
    isDeleted :{
      type:Boolean,
      default:false
    }
},{timestamps : true})

module.exports = mongoose.model("task" , taskSchema)