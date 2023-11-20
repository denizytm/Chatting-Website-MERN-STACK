
const router = require("express").Router()
const setImagesController = require("../Controllers/setImagesController")

router.post("/setBackgroundImage/:id",setImagesController.setBackgroundImage)
router.post("/setProfileImage/:id",setImagesController.setProfileImage)

module.exports = router

