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
      enum : ["pending","progress","completed"],
      default : "pending"
    } ,
    endTime : {
        type:Date,
        required:true,
    }
},{timestamps : true})

module.exports = mongoose.model("task" , taskSchema)