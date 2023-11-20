
const router = require("express").Router()
const loginController = require("../Controllers/loginController")

router.post("/",loginController)

module.exports = router
