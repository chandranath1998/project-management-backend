const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

exports.authentication = async (req,res,next) =>{
    let token = req.headers["authorization"]

    if(!token) {return res.status(400).send({status:false, message:"Please Provide Token Details"})}

    let bearer = token.split(" ") 
    let bearerToken = bearer[1]
   jwt.verify(bearerToken,"task-management" , function (err,decode){
    if(err) {
        return res.status(401).send({status:false,message:err.message})
    }
    req.decode = decode
    next()
   })
}

