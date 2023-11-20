
const router = require("express").Router()
const registerRouter = require("../registerRouter")
const loginRouter = require("../loginRouter")
const setAvatarRouter = require("../setAvatarRouter")
const getUsersRouter = require("../getUsersRouter")
const setUsersRouter = require('../setUsersRouter')
const messagesRouter = require("../messagesRouter")
const setImagesRouter = require("../setImagesRouter")
const logOutRouter = require("../logOutRouter")

router.use("/api/auth/register",registerRouter)
router.use("/api/auth/setAvatar",setAvatarRouter)
router.use("/api/auth/login",loginRouter)
router.use("/api/auth/logout",logOutRouter)
router.use("/api/auth/getUsers",getUsersRouter)
router.use("/api/auth/setUsers",setUsersRouter)
router.use("/api/messages",messagesRouter)
router.use("/api/auth/setImages",setImagesRouter)

module.exports = router
