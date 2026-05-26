const exchanges = document.querySelectorAll('.exchange select');
const btn = document.querySelector('.convert-button');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const exchangeBtn = document.querySelector('#exchange-country');

for (select of exchanges) {
  for (currCode in countryList) {
    let newOption = document.createElement('option');
    newOption.innerText = currCode;
    newOption.value = currCode;
    select.append(newOption);
    if (select.name === 'from' && currCode === 'USD') {
      newOption.selected = 'selected';
    } else if (select.name === 'to' && currCode === 'INR') {
      newOption.selected = 'selected';
    }
  }
  select.addEventListener('change', (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector('img');
  img.src = newSrc;
};

btn.addEventListener('click', async (evt) => {
  evt.preventDefault();

  let amount = document.querySelector('.amount-input');
  let amountVal = amount.value;

  if (amountVal === '' || amountVal < 1) {
    amountVal = 1;
    amount.value = '1';
  }

  const apiKey = '9666028c99f5421353c4d903';
  const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurr.value}`;
  let msg = document.querySelector('.msg');
  msg.style.textAlign = 'center';
  msg.innerText = 'Getting exchange rate...';
  let response = await fetch(apiUrl);
  let data = await response.json();
  let rate = data.conversion_rates[toCurr.value];
  let finalAmount = amountVal * rate;
  msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});
let temp;
exchangeBtn.addEventListener('click', () => {
  temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;
  updateFlag(fromCurr);
  updateFlag(toCurr);
});
