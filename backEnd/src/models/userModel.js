const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    } ,
    email : {
        type : String,
        unique:true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        enum :["Manager" , "User"]
    }
},{timestamps : true})

module.exports = mongoose.model("user", userSchema)