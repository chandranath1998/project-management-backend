const express = require("express")
const router = express.Router()


const {createUser, login, getuser} = require("../controllers/userController")
const {createTask} = require("../controllers/taskController")

router.post("/createUser", createUser)
router.post("/login", login)

router.get("/getuser", getuser)

router.post("/createTask", createTask)

module.exports = router