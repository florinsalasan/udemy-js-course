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
