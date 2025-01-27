//funzione randomItem
const randomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

//funzione randomfrom interval
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
  
//esportazione moduli funzioni
module.exports = {
    randomItem,
    randomIntFromInterval
}