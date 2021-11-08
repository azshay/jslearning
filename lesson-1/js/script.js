'use strict';

let money = +prompt('Ваш бюджет на месяц?', '');
let time = prompt('Введите дату в формате YYYY-MM-DD');

let appData = {
    budget: money,
    timeDate: time,

    expenses: {

    },

    optionalExpenses: {

    },

    income: [],

    savings: false
};

let firstAnswer = prompt('Введите обязательную статью расходов в этом месяце.');
let secondAnswer = prompt('Во сколько обойдется?');
appData.expenses.firstAnswer = secondAnswer;
firstAnswer = prompt('Введите обязательную статью расходов в этом месяце.');
secondAnswer = prompt('Во сколько обойдется?');
appData.expenses.firstAnswer = secondAnswer;

alert('Ваш бюджет на 1 день: ' + money / 30 + "$");