
const router = require("express").Router()
const setAvatarController = require("../Controllers/setAvatarController")

router.post("/:id",setAvatarController)

module.exports = router
