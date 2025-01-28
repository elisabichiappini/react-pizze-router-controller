//importo modulo path, file system, file pizze e funzioni utils
const path = require("path");
const fs = require("fs");

const file = (req, res) => {
    const fileName = req.params.file;
    const filePath = path.join(__dirname, `../assets/${fileName}`);
    const extension = path.extname(filePath);
    if(extension !== '.pdf'){
        res.status(400).send(`File non pubblico perchè con estensione ${extension}`);
    }else {
        res.sendFile(filePath);
    }
}

//esporto moduli
module.exports = {
    file
}