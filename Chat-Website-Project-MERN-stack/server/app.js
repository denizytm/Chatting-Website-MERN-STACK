
const express = require("express")
const app = express()
require('dotenv').config()
const router = require("./Routers/RouterManager/routeManager")
const cors = require("cors")
require("./Database/MongoDB")
const User = require("./Database/Models/User")
const mongoose = require("mongoose")
const initializeSocket = require("./Socket/socket")

//MIDDLEWARE

app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb' , extended :false}));
app.use(cors())

//ROUTER

app.use(router)

const server = app.listen(process.env.PORT)

const io = initializeSocket(server,process.env.REACT_URL)


