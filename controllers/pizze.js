//importo modulo path, file system, file pizze e funzioni utils
const path = require("path");
const fs = require("fs");
let pizze = require("../db/pizze.json");
const { randomItem, randomIntFromInterval } = require('../utils.js');

//metodo index controller
const index = (req, res) => {
    //content negotiation
    res.format({
        html: () => {
            //logica html
            let html = '<h1>Menu delle pizze</h1><ul>';
            pizze.forEach(p => {
                html += `<li>
                    <div>
                        <h3>${p.name}</h3>
                        <img width="200" src=${`/${p.image}`} />
                        <p><strong>Ingredienti</strong>: ${p.ingredients.map(t => `<span class="tag">${t}</span>`).join(', ')}</p>
                    </div>
                </li>`
            });
            html += '</ul>';
            res.send(html);
        },
        json: () => {
            //logica json
            res.json({
                data: pizze,
                count: pizze.length
            });
        }
    });
};

//metodo show controller
const show = (req, res) => {
    const slugPizzaRichiesta = req.params.slug;
    const pizzaRichiesta = pizze.find(pizza => pizza.slug === slugPizzaRichiesta);
    res.format({
        html: () => {
            if (pizzaRichiesta) {
                const p = pizzaRichiesta;
                res.send(`
                    <div>
                        <h3>${p.name}</h3>
                        <img width="200" src=${`/${p.image}`} />
                        <p><strong>Ingredienti</strong>: ${p.ingredients.map(t => `<span class="tag">${t}</span>`).join(', ')}</p>
                    </div>
                `);
            } else {
                res.status(404).send(`<h1>Pizza non trovata</h1>`);
            }
        },
        json: () => {
            if (pizzaRichiesta) {
                res.json({
                    ...pizzaRichiesta,
                    image_url: `http://${req.headers.host}/${pizzaRichiesta.image}`
                });
            } else {
                res.status(404).json({
                    error: 'Not Found',
                    description: `Non esiste una pizza con slug ${slugPizzaRichiesta}`
                });
            }
        }
    })
};

//metodo update controller
const updatePizze = (nuovePizze) => {
    const filePath = path.join(__dirname, '../db/pizze.json');
    fs.writeFileSync(filePath, JSON.stringify(nuovePizze));
    pizze = nuovePizze;
}

//metodo random clone controller
const randomClone = (req, res) => {
    const pizzaDaDuplicare = randomItem(pizze);
    updatePizze([...pizze, pizzaDaDuplicare]);
    res.redirect('/pizze');
};

//metodo frank controller, crea una nuova pizza scegliendo un nome, ingredienti, immagine tra quelli già presenti, slug = "frankstein"
const frank = (req, res) => {
    const names = pizze.map(p => p.name);
    const images = pizze.map(p => p.image);
    const ingredients = [];
    pizze.forEach(p => {
        p.ingredients.forEach(i => {
            if (!ingredients.includes(i)) {
                ingredients.push(i);
            }
        });
    });
    const numIngredienti = randomIntFromInterval(2, ingredients.length);
    const pizzaFrank = {
        name: randomItem(names),
        image: randomItem(images),
        ingredients: [],
        slug: 'frank'
    };
    while (pizzaFrank.ingredients.length < numIngredienti) {
        const randomIngredient = randomItem(ingredients);
        if (!pizzaFrank.ingredients.includes(randomIngredient)) {
            pizzaFrank.ingredients.push(randomIngredient);
        }
    }
    updatePizze([...pizze, pizzaFrank]);
    res.redirect('/pizze');
}

//esporto moduli
module.exports = {
    index,
    show,
    randomClone,
    frank
}