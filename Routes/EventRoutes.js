const express = require('express')
const router = express.Router()
const events = require("../Controllers/EventsController")

//GET REQUESTS
router.get("/", events.index)
router.get("/:id", events.show)

//POST REQUESTS
router.post("/", events.create)

//UPDATE REQUESTS
router.patch("/:id", events.update)

//DELETE REQUESTS
router.delete("/all", events.deleteAll)
router.delete("/:id", events.delete)

module.exports = router