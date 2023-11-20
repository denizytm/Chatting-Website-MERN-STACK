
const router = require("express").Router()
const logOutController = require("../Controllers/logOutController")

router.post("/:id",logOutController)

module.exports = router
