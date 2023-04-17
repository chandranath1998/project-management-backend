const express = require("express")
const router = express.Router()


const {createUser, login, getuser} = require("../controllers/userController")
const {createTask, getTask, updateStatus} = require("../controllers/taskController")
const {authentication} = require("../middleWares/auth")

router.post("/createUser", createUser)
router.post("/login", login)

router.get("/getuser",authentication, getuser)

router.post("/createTask/:userId",authentication, createTask)
router.get("/getTask/:userId", authentication,getTask)
router.put("/updateStatus/:userId", authentication,updateStatus)

module.exports = router