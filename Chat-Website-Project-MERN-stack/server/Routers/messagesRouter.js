
const router = require("express").Router()
const {getMsg,sendMsg,deleteMsg,getLastMsg} = require("../Controllers/messagesController")

router.post('/getLastMsg',getLastMsg)
router.post("/getMsg",getMsg)
router.post("/sendMsg",sendMsg)
router.post('/deleteMsg',deleteMsg)

module.exports = router

