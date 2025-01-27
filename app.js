//importo modulo path, express e router
const path = require("path");
const express = require("express"); //CommonJS Modules
const app = express();
const pizzeRouter = require("./routers/pizze.js");


//middelware generici
app.use(express.static('./public'));

//rotte/routers
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, './index.html');
    res.sendFile(filePath);
});

app.use('/pizze', pizzeRouter);


//start server
app.listen(3000, () => {
    console.log('Server attivo sulla porta http://localhost:3000.');
});