//importo modulo file pizze
const {menu} = require('../menu.js');

const  index = (req, res) => {
    // Controllo che il menu sia un array
    if (!Array.isArray(menu)) {
        return res.status(500).send('Errore: il menu non è disponibile.');
    }
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

}

module.exports = {
    index, show
}