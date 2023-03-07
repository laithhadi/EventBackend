const express = require('express')
const router = express.Router()
const EventRoutes = require('./Routes/EventRoutes')
const UserRoutes = require('./Routes/UserRoutes')

router.use('/events', EventRoutes)
router.use('/users', UserRoutes)

module.exports = router