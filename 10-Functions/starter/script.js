'use strict';

const flight = 'LM234'
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 23984321024
}

const checkIn = function (flightNum, passenger) {
  flightNum = 'LM999'
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 23984321024) {
    console.log('checked in')
  }
  else {
    console.log('wrong passport')
  }
}

checkIn(flight, jonas)

// console.log(flight)
// console.log(jonas)

//
// const flightNum = flight
// const passenger = jonas


const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000)
}

newPassport(jonas)
checkIn(flight, jonas)

// note js does not have pass by reference, only pass by value weird behaviour with objects though as those pass in their memory reference as a value ????

const oneWord = function (string) {
  return string.replace(/ /g, '').toLowerCase()
}

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ')
}

// higher-order function 
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`)
  console.log(`Transformed string: ${fn(str)}`)

  console.log(`Transformed by: ${fn.name}`)
}

transformer('JavaScript is the best!', upperFirstWord)
transformer('JavaScript is the best!', oneWord)

//using higher order functions allows for abstraction


const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`)
  }
}

const greeterHey = greet('Hey')
greeterHey('Flo')
greeterHey('Steve')

greet('Hello')('Flo')

const greeter = greeting => name => console.log(`${greeting} ${name}`)

greeter('Hola')('Flo')

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LM',
  bookings: [],
  book(flightNum, name) {
    console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`)

    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name })
  }
}

lufthansa.book(239, 'Flo Sal')
lufthansa.book(635, 'Joe Schmo')
console.log(lufthansa)

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],

}

const book = lufthansa.book

// the call method allows us to set the 'this' keyword manually to the first argument
book.call(eurowings, 23, 'Sarah Williams')
console.log(eurowings)

book.call(lufthansa, 23, 'Sarah Williams')
console.log(lufthansa)

// this will work with any airline object that has the same properties and functions

const flightData = [583, 'George Cooper']

book.apply(eurowings, flightData)
book.call(eurowings, ...flightData)

// binding creates a new function that makes the this keyword apply to whatever it is bound to.
const bookEw = book.bind(eurowings)

bookEw(23, 'Steve')

// can also path in arguments so that they can be preset, called partial application, where some arguments are predefined in a function
const bookEw23 = book.bind(eurowings, 23)

bookEw23('Bob')

// binding with event listeners

lufthansa.planes = 300
lufthansa.buyPlane = function () {
  console.log(this)

  this.planes++
  console.log(this.planes)
}

// need to bind to lufthansa, otherwise, the 'this' keyword points to the button with the '.buy' class which would not allow the function to work as intended.
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa))

// partial application
const addTax = (rate, value) => value + value * rate

console.log(addTax(0.1, 200))

const addVAT = addTax.bind(null, 0.23)

// addVAT = (value) => value + value * 0.23
console.log(addTax(0.23, 200))
console.log(addVAT(200))
console.log(addVAT(15))

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate
  }
}

const addVAT2 = addTaxRate(0.23)
console.log(addVAT2(200))
console.log(addVAT2(15))