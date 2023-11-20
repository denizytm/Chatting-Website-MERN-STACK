
const router = require("express").Router()
const getUsersController = require("../Controllers/getUsersController")

router.post("/user/:id",getUsersController.getUser)
router.post("/users/:id",getUsersController.getUsers)
router.post("/requests/:id",getUsersController.getFriendRequests)

module.exports = router
