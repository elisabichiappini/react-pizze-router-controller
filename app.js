const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const pizzeRouter = require('./routers/pizze.js');
const path = require('path');

//middleware generici
app.use(express.static('public'));

//rotte/routers
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, './index.html');
    res.sendFile(filePath);
});
app.use('/pizze', pizzeRouter);

app.listen(port, () => {
    console.log(`Server attivo sulla porta http://localhost:${port}`);
})