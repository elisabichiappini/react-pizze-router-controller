// importiamo modulo express
const express = require("express");
const router = express.Router();

const pizzeController = require('../controllers/pizze.js');
//router metodo che apre la rotta utilizzando il controller x ( qui siamo già in /pizze)
router.get('/', pizzeController.index);
//qui siamo in /pizze/:slug
router.get('/:slug', pizzeController.show);

module.exports = router;