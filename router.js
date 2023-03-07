const express = require('express')
const router = express.Router()

const EventRoutes = require('./Routes/EventRoutes')
const UserRoutes = require('./Routes/UserRoutes')
const AuthRoutes = require('./Routes/AuthRoutes')

router.use('/events', EventRoutes)
router.use('/users', UserRoutes)
router.use('/auth', AuthRoutes)

module.exports = router