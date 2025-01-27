// importiamo modulo express
const express = require("express");
const router = express.Router();

const pizzeController = require('../controllers/pizze.js');

router.get('/', pizzeController.show);

module.exports = router;