const express = require('express')
const router = express.Router()
const users = require("../Controllers/UsersController")

//GET REQUESTS
router.get("/", users.index)
router.get("/:id", users.show)

//POST REQUESTS
router.post("/", users.create)

//UPDATE REQUESTS
router.patch("/:id", users.update)

//DELETE REQUESTS
router.delete("/all", users.delete)
router.delete("/:id", users.delete)

module.exports = router