
const router = require("express").Router()
const backgroundImageController = require("../Controllers/backgroundImageController")

router.post("/",backgroundImageController)

module.exports = router

