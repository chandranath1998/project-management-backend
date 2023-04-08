const userModel = require("../models/userModel")

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')


exports.createUser = async(req,res)=>{
try {
    
        let {name, email, password,role} = req.body

        let pwd = await bcrypt.hash(password,10)

        let userData = {name:name,email:email,password:pwd , role:role}

        let saveData = await userModel.create(userData)


        return res.status(201).json({status:true,message:"user created successfully",data:saveData})
          
} catch (error) {

    res.status(500).send({status:false, message:error.message})
    
}
}

exports.login = async (req, res) => {
    try {

        let { userName, password } = req.body

        if (!userName || !password) return res.status(400).send({ status: false, message: "plz provide both UserName and password" })

        let findCredential = await userModel.findOne({ userName : userName})
        if (!findCredential) return res.status(400).send({ status: false, message: "plz provide valid email or password" })

        let checkPass = await bcrypt.compare(password, findCredential.password);
console.log(checkPass)

        if (!checkPass) return res.status(400).send({ status: false, message: "password is incorrect" });


        let token = jwt.sign({ email: findCredential.email }, "task-management", {
        })

        return res.status(201).send({status:true, token:token })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

exports.getuser = async(req,res) =>{
    try {
        let data = req.body
        let user = await userModel.find(data)
    
    return res.status(200).send({ status:true, data :user })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}
