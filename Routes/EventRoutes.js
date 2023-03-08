const express = require('express');
const router = express.Router();
const { isUserAuthenticated } = require("../Middlewares/UserAuthenticator");
const EventsController = require("../Controllers/EventsController");

// Authentication for all routes
router.use(isUserAuthenticated);

//GET REQUESTS
router.get("/",  EventsController.index);
router.get("/:id", EventsController.show);

//POST REQUESTS
router.post("/", EventsController.create);

//UPDATE REQUESTS
router.patch("/:id", EventsController.update);

//DELETE REQUESTS
router.delete("/all", EventsController.deleteAll);
router.delete("/:id", EventsController.delete);

module.exports = router;