'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function (movements) {
  containerMovements.innerHTML = ''

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      
      <div class="movements__value">${mov}</div>
    </div>
  `

    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
};

displayMovements(account1.movements);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// some simple array method practice

let arr = ['a', 'b', 'c', 'd', 'e'];

// slice creates a new array rather than modifying the original
console.log(arr.slice(2));
console.log(arr);
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
// shallow copy can choose between spread and this way in most cases, unless you need to chain methods
console.log(arr.slice());

// splice actually does change the original
console.log(arr.splice(2, 1)); // returns elements that it removes, second argument is the amount of elements removed
console.log(arr.splice(-1));
console.log(arr);

arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];

console.log(arr2.reverse())
console.log(arr2) // reverse mutates the original array

const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

console.log(letters.join(' - ')) //returns a string

// can always look it up on mdn docs

// at method allows negative indexing, can also use it on strings
const arr3 = [23, 11, 64]
console.log(arr3[0])
console.log(arr3.at(0))
console.log(arr3[arr3.length - 1])
console.log(arr3.slice(-1)[0])
console.log(arr3.at(-1))

// using forEach on the movements array

// old for of way
// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`)
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`)
  }
}


console.log(`----- forEach -----`)
// new forEach, calls a function on each loop, allows a defined function to be used as the callback
movements.forEach(function (movement, index, array) {
  // order of parameters in the callback function matters, always the current element, then index, then the array!!

  // keep in mind there is no way to break a forEach loop except for throwing an error
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`)
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`)
  }
})

// using forEach on a map

currencies.forEach(function (value, key, map) {
  // again order of parameters matters
  console.log(`${key}: ${value}`)
})

const currenciesUnique = new Set(['USD', 'GBP', 'USD', "EUR", "EUR"])
console.log(currenciesUnique)
currenciesUnique.forEach(function (value, key, map) {
  // the first two parameters in the forEach callback on a set are the same
  console.log(`${key}: ${value}`)
})