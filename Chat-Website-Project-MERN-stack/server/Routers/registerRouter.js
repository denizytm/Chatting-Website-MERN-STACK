
const router = require("express").Router()
const registerController = require("../Controllers/registerController")

router.post("/",registerController)

module.exports = router