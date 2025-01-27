// importo modulo express, router e controller pizze
const express = require("express"); //CommonJS Modules
const router = express.Router();
const pizzeControllers = require("../controllers/pizze.js");

// rotte partendo da /pizze
router.get("/", pizzeControllers.index);

router.get("/clone", pizzeControllers.randomClone);

router.get("/frank", pizzeControllers.frank);

router.get("/:slug", pizzeControllers.show);


module.exports = router;