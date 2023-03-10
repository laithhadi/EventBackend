const express = require('express');
const router = express.Router();
const { isUserAuthenticated, isAdmin } = require("../Middlewares/UserAuthenticator");
const UsersController = require("../Controllers/UsersController");

// Authentication for all
router.use([isUserAuthenticated, isAdmin]);

//GET REQUESTS
router.get("/", UsersController.index);
router.get("/:id", UsersController.show);

//POST REQUESTS
router.post("/", UsersController.create);

//UPDATE REQUESTS
router.patch("/:id", UsersController.update);

//DELETE REQUESTS
router.delete("/all", UsersController.deleteAll);
router.delete("/:id", UsersController.delete);

module.exports = router;