"use strict"

let hasDriversLicense = false;
const passTest = true;

// if (passTest) hasDriverLicense = true // strict mode logs an error if we leave this uncommented for not being a declared variable
if (hasDriversLicense) console.log('I can drive')

// LECTURE PRACTICE will be similar to fundamentals pt1

// Functions practice:
function describeCountry(country, population, capitalCity) {
  const firstLetter = country.slice(0, 1).toUpperCase();
  const remainingLetters = country.slice(1).toLowerCase();
  const countryCapitalized = firstLetter + remainingLetters;

  const firstLetterCap = capitalCity.slice(0, 1).toUpperCase();
  const remainingLettersCap = capitalCity.slice(1).toLowerCase();
  const countryCapitalCapitalized = firstLetterCap + remainingLettersCap;

  return `${countryCapitalized} has a population of ${population} million people and its capital city is ${countryCapitalCapitalized}.`

}

const canadaDescribed = describeCountry('canada', 38, 'ottawa')
const finlandDescribed = describeCountry('finland', 6, 'Helsinki')
const mexicoDescribed = describeCountry('mexico', 128.9, 'mexico city')

console.log(canadaDescribed, finlandDescribed, mexicoDescribed)

// function declarations vs expressions practice

// function declaration:
function percentageOfWorld1(population) {
  return ((population / 7900) * 100).toFixed(2)
}

// function expression:
const percentageOfWorld2 = function (population) {
  return ((population / 7900) * 100).toFixed(2)
}

// According to freecodecamp a quick summary of when to use one over the other is based on the scope that we want a function to have. A declaration should be used when we want it to have global scope and available throughout the file, expressions limit the scope of the function and maintain a light global scope and clean syntax.
// Other differences can include: expressions can be anonymous and do not need a function name; declarations are hoisted and available throughout the file even if they're not written at the start.

const canadaPercentage = percentageOfWorld1(38)
const finlandPercentage = percentageOfWorld1(6)
const mexicoPercentage = percentageOfWorld1(128.9)

const canadaPercentage2 = percentageOfWorld2(38)
const finlandPercentage2 = percentageOfWorld2(6)
const mexicoPercentage2 = percentageOfWorld2(128.9)

console.log(canadaPercentage, finlandPercentage, mexicoPercentage,
  canadaPercentage2, finlandPercentage2, mexicoPercentage2)

// arrow functions

const percentageOfWorld3 = (population) => {
  return ((population / 7900) * 100).toFixed(2)
}

const canadaPercentage3 = percentageOfWorld3(38)
const finlandPercentage3 = percentageOfWorld3(6)
const mexicoPercentage3 = percentageOfWorld3(128.9)
console.log(canadaPercentage3, finlandPercentage3, mexicoPercentage3)

// functions calling other functions

const describePopulation = (country, population) => {
  let percentage = percentageOfWorld1(population)
  // percentage.toFixed(1)

  const firstLetter = country.slice(0, 1).toUpperCase();
  const remainingLetters = country.slice(1).toLowerCase();
  const countryCapitalized = firstLetter + remainingLetters;

  return `${countryCapitalized} has ${population} million people, which is about ${percentage}% of the world population.`
}

const canadaPopDesc = describePopulation('canada', 38)
const finlandPopDesc = describePopulation('finland', 6)
const mexPopDesc = describePopulation('mexico', 128.9)

console.log(canadaPopDesc, finlandPopDesc, mexPopDesc)

// Intro to Arrays
const populations = [38, 6, 128.9, 1441]
console.log(populations.length === 4)
let percentages = []
for (let i = 0; i < populations.length; i++) {
  percentages.push(percentageOfWorld1(populations[i]))
}
console.log(percentages)

// Basic array operations (methods)
// starting instuctions
let neighbours = ['ukraine', 'moldova', 'bulgaria', 'serbia', 'hungary']
// add neighbour
neighbours.push('utopia')
neighbours.pop()
neighbours.includes('Germany') ? console.log('') : console.log('Probably not a central European country :D')
neighbours[neighbours.indexOf('bulgaria')] = 'new Greek Kingdom'


// Intro to objects:

let myCountry = {
  'country': 'Canada',
  'capital': 'Ottawa',
  'language': 'English',
  'population': 38,
  'neighbours': ['usa', 'greenland', 'st pierre', 'miquelon'],
  describe: function () {
    console.log(`${this.country} has ${this.population} million ${this.language}-speaking people, ${this.length} neighbouring countries, and a capital called ${this.capital}`)
  },
  checkIsland: this.neighbours === 0 ? true : false,
}
console.log(myCountry)

// Dot vs Bracket notation

// console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries, and a capital called ${myCountry.capital}`)
myCountry.population += 2;
// console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries, and a capital called ${myCountry.capital}`)
myCountry['population'] -= 2;
// console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries, and a capital called ${myCountry.capital}`)

// Object methods
// add a method to the myCountry object, it will log a string using the 'this' keyword

myCountry.describe()
console.log(myCountry.checkIsland)

// for loop practice: 

for (let i = 1; i < 51; i++) {
  console.log(`Voter number ${i} is currently voting`)
}

// looping arrays, breaking, and continuing

let percentages2 = [];

for (let i = 0; i < populations.length; i++) {
  percentages2.push(percentageOfWorld1(populations[i]))
}
console.log(percentages, percentages2)
// to properly compare arrays, compare length and each item is equal, equality between objects is based on comparing memory reference and not value.

// Looping backwards and loops in loops

let listofNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']]

for (let i = 0; i < listofNeighbours.length; i++) {
  for (let j = 0; j < listofNeighbours[i].length; j++) {
    console.log('Neighbour:', listofNeighbours[i][j])
  }
}

// while loops

let i = 0
let percentages3 = []
while (i < populations.length) {
  percentages3.push(percentageOfWorld1(populations[i]))
  i++;
}
console.log(percentages3)