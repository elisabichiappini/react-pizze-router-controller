const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const pizzeController = require('./controllers/pizze.js');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`<h1>Benvenuto in pizze</h1>`);
});

app.get('/pizze', pizzeController.show);

app.listen(port, () => {
    console.log(`Server attivo sulla porta http://localhost:${port}`);
})