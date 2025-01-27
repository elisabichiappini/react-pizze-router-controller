// importo modulo express, router e controller pizze
const express = require("express"); //CommonJS Modules
const router = express.Router();
const path = require('path');

// rotte partendo da /docs: abbiamo creato un params che è il nome del filename richiesto
router.get("/:file", (req, res) => {
    const fileName = req.params.file;
    const filePath = path.join(__dirname, `../assets/${fileName}`);
    const extension = path.extname(filePath);
    if(extension !== '.pdf'){
        res.status(400).send(`File non scaricabile perchè con estensione ${extension}`);
    }else {
        res.sendFile(filePath);
    }
});


module.exports = router;