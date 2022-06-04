const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 },
// ];

// local storage returns as json string, turn into an array
const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

// let transactions = dummyTransactions;
let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  // add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">X</button>
  `;

  list.appendChild(item);
}
// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, amount) => (acc += amount), 0)
    .toFixed(2);
  const expense = (
    amounts
      .filter((amount) => amount < 0)
      .reduce((acc, amount) => (acc += amount), 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Add new transactions
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value, // turn into number
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = '';
    amount.value = '';
  }
}

// Generate random id
function generateId() {
  return Math.floor(Math.random() * 100000000);
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}

// Update local storage transactions to set the info turn into JSON object
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = ''; // clear out
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);
