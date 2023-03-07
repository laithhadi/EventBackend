const express = require('express')
const router = express.Router()
const UsersController = require("../Controllers/UsersController")

//GET REQUESTS
router.get("/", UsersController.index)
router.get("/:id", UsersController.show)

//POST REQUESTS
router.post("/", UsersController.create)

//UPDATE REQUESTS
router.patch("/:id", UsersController.update)

//DELETE REQUESTS
router.delete("/all", UsersController.deleteAll)
router.delete("/:id", UsersController.delete)

module.exports = router