const coin = document.querySelector('#coin-selection');
const crypto = document.querySelector('#crypto-selection');
const form = document.querySelector('#formulario');
const infodiv = document.querySelector('#coin-info');
const monedainput = document.querySelector('#Moneda')



form.addEventListener('submit', async e => {
    e.preventDefault();
    infodiv.classList.toggle('center');
infodiv.innerHTML = `
<div class="loader"></div>
`
    const coinSelected = [...coin.children].find(option => option.selected).value;
    const cryptoSelected = [...crypto.children].find(option => option.selected).value;
    const monedainputvalue = monedainput.value;
    const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected}`
    const reponse = await (await fetch(URL,{method:'GET'})).json();
    const price = reponse.DISPLAY[cryptoSelected][coinSelected].PRICE;
    const high = reponse.DISPLAY[cryptoSelected][coinSelected].HIGH24HOUR;
    const low = reponse.DISPLAY[cryptoSelected][coinSelected].LOW24HOUR;
    const changePercentage = reponse.DISPLAY[cryptoSelected][coinSelected].CHANGEPCT24HOUR;
    infodiv.classList.toggle('center');
    if (!monedainputvalue) {
        infodiv.innerHTML = `
    <p>El precio actual es: <span class="coin-value">${price}</span></p>
    <p>El precio mas alto es: <span class="coin-value">${high}</span></p>
    <p>El precio mas bajo es: <span class="coin-value">${low}</span></p>
    <p>Diferencia 24h: <span class="coin-value">${changePercentage}</span></p>
    `
    } else {
        const priceRaw = reponse.RAW[cryptoSelected][coinSelected].PRICE;
        const Result =(monedainputvalue / priceRaw).toFixed(4);
        infodiv.innerHTML = `
    <p>El precio actual es: <span class="coin-value">${price}</span></p>
    <p>El precio mas alto es: <span class="coin-value">${high}</span></p>
    <p>El precio mas bajo es: <span class="coin-value">${low}</span></p>
    <p>Diferencia 24h: <span class="coin-value">${changePercentage}</span></p>
    <p>Puedes Comprar <span class="coin-value">${Result} ${cryptoSelected}</span></p>
    `
    }
    
});