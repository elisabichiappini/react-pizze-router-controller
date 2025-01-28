// importo modulo express, router e controller pizze
const express = require("express"); //CommonJS Modules
const router = express.Router();
const path = require('path');

const docsController = require('../controllers/docs.js');

// rotte partendo da /docs: abbiamo creato un params che è il nome del filename richiesto
router.get("/:file", docsController.file('sendFile'));

// rotta per scaricare il file
router.get("/:file/download", docsController.file('download'));

module.exports = router;