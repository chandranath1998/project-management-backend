const express = require("express")
const mongoose = require("mongoose")
const route = require("./routes/route")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://Dreamerboy:Function-Up2022@cluster0.lwkqomf.mongodb.net/Project-Management" , {useNewUrlParser:true})

        .then(() => console.log("DB is connected"))
        .catch((err) => console.log(err)) 

app.use("/" , route)        

app.listen(5000, () => {
    console.log("express app is running on port", 5000)

})
