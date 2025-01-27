const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const pizzeRouter = require('./routers/pizze.js');


//middleware generici
app.use(express.static('public'));

//rotte/routers
app.get('/', (req, res) => {
    res.send(`<h1>Benvenuto in pizze</h1>`);
});
app.use('/pizze', pizzeRouter);

app.listen(port, () => {
    console.log(`Server attivo sulla porta http://localhost:${port}`);
})