const balance = document.getElementById('balance');
const moneyCredit = document.getElementById('money-credit');
const moneyDebit = document.getElementById('money-debit');
const list = document.getElementById('list');
const form = document.getElementById('add-form');
const reason = document.getElementById('reason');
const amount = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function displayTransaction(transaction){
    const type = transaction.amount > 0 ? '+' : '-';
    const transactionLI = document.createElement('li');
    transactionLI.classList.add(transaction.amount > 0 ? 'credit' : 'debit');
    transactionLI.innerHTML = `
        ${transaction.reason} <span>${transaction.amount}</span> <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">X</button>
    `;
    list.appendChild(transactionLI);
};

function updateBalance(){
    const transactionAmount = transactions.map(transaction =>transaction.amount);
    const totalBalance = transactionAmount.reduce( (acc, amount) => (acc += amount), 0);
    const creditBalance = transactionAmount
        .filter(amount => amount > 0)
        .reduce((acc, amount) => (acc += amount), 0);
    const debitBalance = transactionAmount
        .filter(amount => amount < 0)
        .reduce((acc, amount) => (acc += amount), 0);
    balance.innerText = `$${totalBalance}`;
    moneyCredit.innerText = `$${creditBalance}`;
    moneyDebit.innerText = `$${debitBalance}`;
};

function createID(){
    return Math.floor(Math.random() * 100000);
};

function addTranaction(e){
    e.preventDefault();
    if(reason.value.trim() === '' || amount.value.trim() === ''){
        alert('Please provide a valid reason and transaction amount.');
    } else{
        const transaction = {
            id: createID(),
            reason: reason.value,
            amount: +amount.value,
        }
        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        displayTransaction(transaction);
        updateBalance();
        reason.value = '';
        amount.value = '';
    };
};

function deleteTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    init();
}

function init(){
    list.innerHTML = '';
    transactions.forEach(displayTransaction);
    updateBalance();
};

form.addEventListener('submit', addTranaction);

init();