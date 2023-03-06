const express = require('express')
const router = express.Router()

const eventsRouter = require('./Routes/EventRoutes')
const usersRouter = require('./Routes/UserRoutes')

router.use('/events', eventsRouter)
router.use('/users', usersRouter)

module.exports = router