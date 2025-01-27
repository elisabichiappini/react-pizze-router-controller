//importo modulo file pizze
const menu = require('../db/menu.json');

const  index = (req, res) => {
   
    res.format({
        html: () => {
            let html = `
            <h1>Menu delle pizze</h1>
            <ul>`;
            menu.forEach(pizza => {
                html +=`
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
    const pizzaRichiesta = menu.find( pizza => pizza.slug === slugPizzaRichiesta);
    if(pizzaRichiesta) {
        res.json(pizzaRichiesta);
    } else {
        res.status(404).json({
            error: 'not-found',
            description: `Non esiste una pizza con slug ${slugPizzaRichiesta}`
        });
    }
}

module.exports = {
    index, show
}