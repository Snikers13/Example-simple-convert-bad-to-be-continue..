'use strict';
const ul = document.getElementById ('myUl');
const ul1 = document.getElementById ('myUl2');


function roundTwoDecimals (amount) {
	return Math.round(amount * 100) / 100;
}

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

(async () => {
  const data = await fetch('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11');
  let date = new Date();
  ul.innerHTML = 'Currency on buy ' + date.toLocaleString();
  ul1.innerHTML = 'Currency on sale ' + date.toLocaleString();
  let jsonData = await data.json(); 
	for (let i of jsonData) {
  	//Покупка
  		let newLiBuy = document.createElement('li');
		newLiBuy.textContent = (i.buy + ' ' + i.ccy + ' ');
		ul.appendChild (newLiBuy);

  	//продажа
		let newLiSale = document.createElement('li');
		newLiSale.textContent = (i.sale + ' ' + i.ccy + ' ');
		ul1.appendChild (newLiSale);
 
	}
	document.getElementsByClassName('btn')[0].addEventListener('click', () => {
		let inp = document.getElementsByClassName ('myInput')[0];
		if (!isNumeric(inp.value)) {
			let err = setInterval( () => {
				inp.style.backgroundColor = '#FEEBE6';
				result.textContent = '';
					if (isNumeric(inp.value)) {
						clearInterval(err);
						inp.style.backgroundColor = 'white';
					}
			},0)

		} else {
			let result = document.getElementById ('result');
			const e = document.getElementById("s1");
			switch (e.options[e.selectedIndex].text) {

				case 'USD': result.textContent = 'Result of sale ' + inp.value + ' USD in UAH is: ' + inp.value * roundTwoDecimals(jsonData[jsonData.length - 4].sale);
				break;

				case 'EUR': result.textContent = 'Result of sale ' + inp.value + ' EUR in UAH is: ' + inp.value * roundTwoDecimals(jsonData[jsonData.length - 3].sale);
				break;

				case 'RUR': result.textContent = 'Result of sale ' + inp.value + ' RUR in UAH is: ' + inp.value * roundTwoDecimals(jsonData[jsonData.length - 2].sale);
				break;

				case 'BTC': result.textContent = 'Result of sale ' + inp.value + ' BTC in UAH is: ' + inp.value * roundTwoDecimals(jsonData[jsonData.length - 1].sale);
				break;
			}

		}
		inp.value = '';
		
	})

	document.getElementsByClassName('btn')[1].addEventListener('click', () => {
		let inp = document.getElementsByClassName ('myInput')[1];
		if (!isNumeric(inp.value)) {
			let err = setInterval( () => {
				inp.style.backgroundColor = '#FEEBE6';
				result.textContent = '';
					if (isNumeric(inp.value)) {
						clearInterval(err);
						inp.style.backgroundColor = 'white';
					}
			},0)

		} else {
			let result = document.getElementById ('result2');
			const e = document.getElementById("s1");
			switch (e.options[e.selectedIndex].text) {

				case 'USD': result.innerHTML = 'Result of buy ' + inp.value + ' USD is: ' + inp.value / roundTwoDecimals(jsonData[jsonData.length - 4].sale);
				break;

				case 'EUR': result.innerHTML = 'Result of buy ' + inp.value + ' EUR is: ' + inp.value / roundTwoDecimals(jsonData[jsonData.length - 3].sale);
				break;

				case 'RUR': result.innerHTML = 'Result of buy ' + inp.value + ' RUR is: ' + inp.value / roundTwoDecimals(jsonData[jsonData.length - 2].sale);
				break;

				case 'BTC': result.innerHTML = 'Result of buy ' + inp.value + ' BTC is: ' + inp.value / roundTwoDecimals(jsonData[jsonData.length - 1].sale);
				break;
			}

		}
		inp.value = '';
		
	});

})();
