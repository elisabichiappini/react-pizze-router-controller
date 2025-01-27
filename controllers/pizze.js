//importo modulo file pizze
let menu = require('../db/menu.json');
const path = require('path');
const fs = require('fs');

const index = (req, res) => {

    res.format({
        html: () => {
            let html = `
            <h1>Menu delle pizze</h1>
            <ul>`;
            menu.forEach(pizza => {
                html += `
                <li>
                    <h2>${pizza.name}</h2>
                    <img src="/${pizza.image}" alt="img-${pizza.name}" width="100">
                    <p>
                        <strong>Ingredienti:</strong>${pizza.ingredients.map(i => `<span class="tag">${i.toLowerCase().replaceAll(' ', '-')}</span>`).join(' ')}
                    </p>
                </li>
                `;
            });
            html += `</ul>`;
            res.send(html);
        },
        json: () => {
            res.json({
                data: menu,
                count: menu.length
            })
        }
    })
};

//creaimo il controller show
const show = (req, res) => {
    const slugPizzaRichiesta = req.params.slug;
    const pizzaRichiesta = menu.find(pizza => pizza.slug === slugPizzaRichiesta);
    if (pizzaRichiesta) {
        res.json(pizzaRichiesta);
    } else {
        res.status(404).json({
            error: 'not-found',
            description: `Non esiste una pizza con slug ${slugPizzaRichiesta}`
        });
    }
};

// questo controller aggiunge una pizza duplicandone una a caso tra quelle presenti
const randomClone = (req, res) => {
    const indexDuplicare = Math.floor(Math.random() * menu.length);
    const pizzaDuplicare = menu[indexDuplicare];
    const filePath = path.join(__dirname, '../db/menu.json');
    //questo sarà il nuovo array
    const nuovePizze = [...menu, pizzaDuplicare];
    fs.writeFileSync(filePath, JSON.stringify(nuovePizze));
    menu = nuovePizze;
    res.redirect('/pizze');
};
//controller create

module.exports = {
    index, show, randomClone
}