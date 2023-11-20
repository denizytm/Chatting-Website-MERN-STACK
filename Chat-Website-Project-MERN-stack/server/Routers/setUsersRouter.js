const router = require('express').Router()
const {setUsers} = require('../Controllers/setUsersController')

router.post('/users/:id',setUsers)

module.exports = router