// importiamo modulo express
const express = require("express");
const router = express.Router();

const pizzeController = require('../controllers/pizze.js');
//router metodo che apre la rotta utilizzando il controller x ( qui siamo già in /pizze)
router.get('/', pizzeController.index);

//importante la posizione sotto il get /
router.get('/clone', pizzeController.randomClone );

//qui siamo in /pizze/:slug
router.get('/:slug', pizzeController.show);

module.exports = router;