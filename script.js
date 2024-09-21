const MENU = {
    "espresso": {
        "ingredients": {
            "water": 50,
            "coffee": 18,
        },
        "cost": 1.5,
    },
    "latte": {
        "ingredients": {
            "water": 200,
            "milk": 150,
            "coffee": 24,
        },
        "cost": 2.5,
    },
    "cappuccino": {
        "ingredients": {
            "water": 250,
            "milk": 100,
            "coffee": 24,
        },
        "cost": 3.0,
    }
};

let resources = {
    "water": 500,
    "milk": 500,
    "coffee": 500,
    "money": 0
};

let currentMoney = 0;

function updateMoneyDisplay() {
    document.getElementById('money-display').textContent = `$${currentMoney.toFixed(2)}`;
}

function insertCoins() {
    const twoEuro = parseInt(document.getElementById('two-euro').value) || 0;
    const oneEuro = parseInt(document.getElementById('one-euro').value) || 0;
    const fiftyCent = parseInt(document.getElementById('fifty-cent').value) || 0;
    const tenCent = parseInt(document.getElementById('ten-cent').value) || 0;

    currentMoney += twoEuro * 2 + oneEuro + fiftyCent * 0.5 + tenCent * 0.1;
    updateMoneyDisplay();
    document.getElementById('message').textContent = `Inserted $${currentMoney.toFixed(2)}`;
}

function makeCoffee(coffeeType) {
    const coffee = MENU[coffeeType];
    const cost = coffee.cost;

    if (currentMoney < cost) {
        document.getElementById('message').textContent = `Not enough money. You need $${cost.toFixed(2)}, but you only have $${currentMoney.toFixed(2)}.`;
        return;
    }

    for (const [ingredient, amount] of Object.entries(coffee.ingredients)) {
        if (resources[ingredient] < amount) {
            document.getElementById('message').textContent = `Sorry, not enough ${ingredient}.`;
            return;
        }
    }

    for (const [ingredient, amount] of Object.entries(coffee.ingredients)) {
        resources[ingredient] -= amount;
    }

    resources.money += cost;
    currentMoney -= cost;

    updateMoneyDisplay();
    document.getElementById('message').textContent = `Here's your ${coffeeType}. Enjoy!`;

    if (currentMoney > 0) {
        document.getElementById('message').textContent += ` Here's your change: $${currentMoney.toFixed(2)}`;
        currentMoney = 0;
        updateMoneyDisplay();
    }
}

function showReport() {
    const reportOutput = document.getElementById('report-output');
    reportOutput.innerHTML = `
        <p>Water: ${resources.water}ml</p>
        <p>Milk: ${resources.milk}ml</p>
        <p>Coffee: ${resources.coffee}g</p>
        <p>Money: $${resources.money.toFixed(2)}</p>
    `;
}

document.getElementById('insert-coins').addEventListener('click', insertCoins);
document.getElementById('espresso').addEventListener('click', () => makeCoffee('espresso'));
document.getElementById('latte').addEventListener('click', () => makeCoffee('latte'));
document.getElementById('cappuccino').addEventListener('click', () => makeCoffee('cappuccino'));
document.getElementById('show-report').addEventListener('click', showReport);
