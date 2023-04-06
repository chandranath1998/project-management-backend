const taskModel = require("../models/taskModel")

exports.createTask = async (req,res) => {
    try {
        let data = req.body
        // let {title,descrption,type,assigning,endTime} = data
    
        // if(!title){
        //     res.status(400).send({status:false,message:"please provide title"})
        // }
        
        // if(!descrption){
        //     res.status(400).send({status:false,message:"please provide descrption"})
        // }
    
        // if(!type){
        //     res.status(400).send({status:false,message:"please  select the type feature,enhancement, bug"})
        // }
        let taskData = await taskModel.create(data)
    
        res.status(201).send({status:true, data:taskData})
    } catch (error) {
        res.status(500).send({status:false, message:error.message})
    }
}